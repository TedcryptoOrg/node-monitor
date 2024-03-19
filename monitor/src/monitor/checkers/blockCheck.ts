import {MonitorCheck} from "./monitorCheck";
import {Chain, ChainDirectory} from "@tedcryptoorg/cosmos-directory";
import {BlockAlertConfiguration} from "../../type/api/ApiMonitor";
import {buildClient} from "../../services/clientManager";
import {ServiceTypeEnum} from "../../type/api/ServiceTypeEnum";
import {RpcClient} from "../../client/rpcClient";
import {NoRecoverableException} from "../exception/noRecoverableException";

const chainDirectory = new ChainDirectory(false);

export class BlockCheck extends MonitorCheck {
    private client: RpcClient|undefined

    async check(): Promise<void> {
        let missedBlocks = 0
        let previousTimestamp = new Date().getTime()
        let lastBlockHeight = 0
        const configuration = this.configuration as BlockAlertConfiguration

        if (!this.monitor.server) {
            throw new NoRecoverableException(`${this.getMessagePrefix()} Server is not defined. Cannot run check`)
        }
        if (!this.monitor.server.services || this.monitor.server.services.length === 0) {
            console.log(this.monitor)
            throw new NoRecoverableException(`${this.getMessagePrefix()}  Server services are not defined. Cannot run check`)
        }

        this.client = buildClient(this.monitor.server.services, ServiceTypeEnum.RPC) as RpcClient;

        while (true) {
            console.log(`🏃️${this.getMessagePrefix()} Running check...`)

            const currentBlockHeight = Number(await this.client.getBlockHeight());
            console.log(`🟡️${this.getMessagePrefix()} Height: ${currentBlockHeight}`)

            if (lastBlockHeight >= currentBlockHeight) {
                console.log(`🟠️${this.getMessagePrefix()} Block is not increasing`);
                previousTimestamp = new Date().getTime();

                const isSyncing = await this.client.isSyncing();
                if (isSyncing) {
                    console.log(`🟠️${this.getMessagePrefix()} Node is syncing...`)
                    let message = `Node is syncing... Current height: ${currentBlockHeight}`
                    try {
                        const knownBlockHeight = Number((await this.getChain(this.monitor.configuration.chain)).params.current_block_height)
                        message += `, known block height: ${knownBlockHeight}`
                    } catch (error) {
                        console.error(error)
                    }

                    await this.fail(message);
                } else {
                    missedBlocks++;
                    if (missedBlocks >= configuration.miss_tolerance) {
                        const message = `Missing too many blocks. Miss counter exceeded: ${missedBlocks}`
                        await this.fail(message);
                    } else {
                        console.log(`🟡️${this.getMessagePrefix()} Block(s) missed: ${missedBlocks}`)
                    }
                }
            } else {
                if (missedBlocks > 0) {
                    const currentTimestamp = new Date().getTime()

                    const timeDifferentInSeconds = (currentTimestamp - previousTimestamp) / 1000
                    const secondsLeftToReset = configuration.miss_tolerance_period_seconds - timeDifferentInSeconds
                    if (secondsLeftToReset <= 0) {
                        const message = `No more misses happened since last one. Last missed: ${missedBlocks}. Reset monitoring flags`
                        await this.success(message);

                        // Reset the miss counter if the tolerance period has passed
                        previousTimestamp = currentTimestamp
                        missedBlocks = 0
                    } else {
                        const message = `No more misses happened since last one. Last missed: ${missedBlocks}. Reset in ${secondsLeftToReset.toFixed(0)} seconds.`
                        await this.warning(message);
                    }
                } else {
                    await this.success('No misses!');
                }

                lastBlockHeight = currentBlockHeight;
            }

            console.log(`🕗️${this.getMessagePrefix()} Waiting ${configuration.sleep_duration_seconds} seconds before checking again...`)
            await new Promise((resolve) => setTimeout(resolve, configuration.sleep_duration_seconds * 1000))
        }
    }

    async getChain(chainName: string): Promise<Chain> {
        return (await chainDirectory.getChainData(chainName)).chain;
    }
}