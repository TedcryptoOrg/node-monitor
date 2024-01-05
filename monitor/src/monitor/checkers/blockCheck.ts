import {MonitorCheck} from "./monitorCheck";
import {Alerter} from "../../Alerter/alerter";
import {RpcClient} from "../../client/rpcClient";
import {Chain, ChainDirectory} from "@tedcryptoorg/cosmos-directory";
import {BlockAlertConfiguration} from "../../type/api/ApiMonitor";

const chainDirectory = new ChainDirectory(false);

export class BlockCheck implements MonitorCheck {
    private readonly alerter: Alerter

    constructor (
        private readonly name: string,
        private readonly chainName: string,
        private readonly rpcClient: RpcClient,
        private readonly blockAlertConfiguration: BlockAlertConfiguration,
        private readonly alertChannels: any
    ) {
        console.debug(`🔨️[${this.name}][${this.chainName}] Creating block check...`, blockAlertConfiguration);

        this.alerter = new Alerter(
            this.name,
            'BlockCheck',
            this.alertChannels,
            this.blockAlertConfiguration.alert_sleep_duration_minutes
        )
    }

    async check(): Promise<void> {
        let missedBlocks = 0
        let previousTimestamp = new Date().getTime()
        let lastBlockHeight = 0

        while (true) {
            console.log(`🏃️[${this.name}][BlockCheck] Running check...`)

            const currentBlockHeight = Number(await this.rpcClient.getBlockHeight());
            console.log(`🟡️[${this.name}][BlockCheck] Height: ${currentBlockHeight}`)

            if (lastBlockHeight >= currentBlockHeight) {
                console.log(`🟠️[${this.name}][BlockCheck] Block is not increasing`);
                previousTimestamp = new Date().getTime();

                const isSyncing = await this.rpcClient.isSyncing();
                if (isSyncing) {
                    console.log(`🟠️[${this.name}][BlockCheck] Node is syncing...`)
                    const knownBlockHeight = Number((await this.getChain(this.chainName)).params.current_block_height)
                    await this.alerter.alert(`🚨 ${this.name} monitor alert!\n Node is syncing... Current height: ${currentBlockHeight}, known block height: ${knownBlockHeight}`)
                } else {
                    missedBlocks++;
                    if (missedBlocks >= this.blockAlertConfiguration.miss_tolerance) {
                        console.log(`🔴️[${this.name}][BlockCheck] Block(s) missed: ${missedBlocks}`)
                        await this.alerter.alert(`🚨 ${this.name} monitor alert!\n You are missing blocks. Missed blocks: ${missedBlocks}`)
                    }
                }

                console.log(`🟡️[${this.name}][BlockCheck] Block(s) missed: ${missedBlocks}`)
            } else {
                if (missedBlocks > 0) {
                    const currentTimestamp = new Date().getTime()

                    const timeDifferentInSeconds = (currentTimestamp - previousTimestamp) / 1000
                    const secondsLeftToReset = this.blockAlertConfiguration.miss_tolerance_period_seconds - timeDifferentInSeconds
                    console.debug(`🟡️[${this.name}][BlockCheck] No more misses happened since last one. Last missed: ${missedBlocks}. Reset in ${secondsLeftToReset} seconds.`)
                    if (secondsLeftToReset <= 0) {
                        console.log(`🟢️[${this.name}][BlockCheck] No more misses happened since last one. Last missed: ${missedBlocks}. Reset monitoring flags`)
                        // Reset the miss counter if the tolerance period has passed
                        previousTimestamp = currentTimestamp
                        missedBlocks = 0
                    }
                }

                lastBlockHeight = currentBlockHeight;
            }

            console.log(`🕗️[${this.name}][BlockCheck] Waiting ${this.blockAlertConfiguration.sleep_duration_seconds} seconds before checking again...`)
            await new Promise((resolve) => setTimeout(resolve, this.blockAlertConfiguration.sleep_duration_seconds * 1000))
        }
    }

    async getChain(chainName: string): Promise<Chain> {
        return (await chainDirectory.getChainData(chainName)).chain;
    }

}