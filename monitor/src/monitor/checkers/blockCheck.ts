import {MonitorCheck} from "./monitorCheck";
import {Alerter} from "../../Alerter/alerter";
import {RpcClient} from "../../client/rpcClient";
import {Chain, ChainDirectory} from "@tedcryptoorg/cosmos-directory";
import {ApiMonitor, BlockAlertConfiguration} from "../../type/api/ApiMonitor";
import {pingMonitor} from "../../services/monitorsManager";

const chainDirectory = new ChainDirectory(false);

export class BlockCheck implements MonitorCheck {
    private readonly alerter: Alerter
    private readonly configuration: BlockAlertConfiguration

    constructor (
        private readonly name: string,
        private readonly chainName: string,
        private readonly monitor: ApiMonitor,
        private readonly rpcClient: RpcClient,
        private readonly alertChannels: any
    ) {
        this.configuration = JSON.parse(this.monitor.configuration_object) as BlockAlertConfiguration
        console.debug(`🔨️[${this.name}][${this.chainName}] Creating block check...`, this.configuration);

        this.alerter = new Alerter(
            this.name,
            'BlockCheck',
            this.alertChannels,
            this.configuration.alert_sleep_duration_minutes
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
                    const message = `Node is syncing... Current height: ${currentBlockHeight}, known block height: ${knownBlockHeight}`
                    await pingMonitor(this.monitor.id as number, {status: false, last_error: message})
                    await this.alerter.alert(`🚨 ${this.name} ${message}`)
                } else {
                    missedBlocks++;
                    if (missedBlocks >= this.configuration.miss_tolerance) {
                        const message = `Missed too many blocks. Miss counter: ${missedBlocks}. Miss tolerance: ${this.configuration.miss_tolerance}`
                        console.log(`🔴️[${this.name}][BlockCheck] ${message}`)
                        await pingMonitor(this.monitor.id as number, {status: false, last_error: message})
                        await this.alerter.alert(`🚨 ${this.name} ${message}`)
                    }
                }

                console.log(`🟡️[${this.name}][BlockCheck] Block(s) missed: ${missedBlocks}`)
            } else {
                if (missedBlocks > 0) {
                    const currentTimestamp = new Date().getTime()

                    const timeDifferentInSeconds = (currentTimestamp - previousTimestamp) / 1000
                    const secondsLeftToReset = this.configuration.miss_tolerance_period_seconds - timeDifferentInSeconds
                    if (secondsLeftToReset <= 0) {
                        const message = `No more misses happened since last one. Last missed: ${missedBlocks}. Reset monitoring flags`
                        await pingMonitor(this.monitor.id as number, {status: true, last_error: message})
                        console.log(`🟢️[${this.name}][BlockCheck] ${message}`)
                        // Reset the miss counter if the tolerance period has passed
                        previousTimestamp = currentTimestamp
                        missedBlocks = 0
                    } else {
                        const message = `No more misses happened since last one. Last missed: ${missedBlocks}. Reset in ${secondsLeftToReset} seconds.`
                        await pingMonitor(this.monitor.id as number, {status: false, last_error: null})
                        console.debug(`🟡️[${this.name}][BlockCheck] ${message}`)
                    }
                } else {
                    await pingMonitor(this.monitor.id as number, {status: true, last_error: null})
                }

                lastBlockHeight = currentBlockHeight;
            }

            console.log(`🕗️[${this.name}][BlockCheck] Waiting ${this.configuration.sleep_duration_seconds} seconds before checking again...`)
            await new Promise((resolve) => setTimeout(resolve, this.configuration.sleep_duration_seconds * 1000))
        }
    }

    async getChain(chainName: string): Promise<Chain> {
        return (await chainDirectory.getChainData(chainName)).chain;
    }

}