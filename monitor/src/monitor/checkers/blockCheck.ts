import {MonitorCheck} from "./monitorCheck";
import {Alerter} from "../../Alerter/alerter";
import {Chain, ChainDirectory} from "@tedcryptoorg/cosmos-directory";
import {ApiMonitor, BlockAlertConfiguration} from "../../type/api/ApiMonitor";
import {pingMonitor} from "../../services/monitorsManager";
import {buildClient} from "../../services/clientManager";
import {ServiceTypeEnum} from "../../type/api/ServiceTypeEnum";
import {RpcClient} from "../../client/rpcClient";

const chainDirectory = new ChainDirectory(false);

export class BlockCheck implements MonitorCheck {
    private readonly alerter: Alerter
    private readonly configuration: BlockAlertConfiguration
    private client: RpcClient
    private isOkay: boolean = false
    private isFirstRun: boolean = true
    private lastTimePing: number = 0
    private pingInterval: number = 60

    constructor (
        private readonly name: string,
        private readonly chainName: string,
        private readonly monitor: ApiMonitor,
        private readonly alertChannels: any
    ) {
        this.configuration = JSON.parse(this.monitor.configuration_object) as BlockAlertConfiguration
        console.debug(`🔨️[${this.name}][${this.chainName}] Creating block check...`, this.configuration);
        if (!this.monitor.server) {
            throw new Error(`[${this.name}][BlockCheck] Server is not defined. Cannot run check`)
        }
        if (!this.monitor.server.services || this.monitor.server.services.length === 0) {
            throw new Error(`[${this.name}][BlockCheck] Server services are not defined. Cannot run check`)
        }

        this.client = buildClient(this.monitor.server.services, ServiceTypeEnum.RPC) as RpcClient;

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

        if (this.monitor.server?.id) {
            throw new Error(`[${this.name}][BlockCheck] Server id unknown. Cannot run check`)
        }

        while (true) {
            console.log(`🏃️[${this.name}][BlockCheck] Running check...`)

            const currentBlockHeight = Number(await this.client.getBlockHeight());
            console.log(`🟡️[${this.name}][BlockCheck] Height: ${currentBlockHeight}`)

            if (lastBlockHeight >= currentBlockHeight) {
                console.log(`🟠️[${this.name}][BlockCheck] Block is not increasing`);
                previousTimestamp = new Date().getTime();

                const isSyncing = await this.client.isSyncing();
                if (isSyncing) {
                    console.log(`🟠️[${this.name}][BlockCheck] Node is syncing...`)
                    let message = `Node is syncing... Current height: ${currentBlockHeight}`
                    try {
                        const knownBlockHeight = Number((await this.getChain(this.chainName)).params.current_block_height)
                        message += `, known block height: ${knownBlockHeight}`
                    } catch (error) {
                        console.error(error)
                    }

                    await this.fail(message);
                } else {
                    missedBlocks++;
                    if (missedBlocks >= this.configuration.miss_tolerance) {
                        const message = `Missing too many blocks. Miss counter exceeded: ${missedBlocks}`
                        await this.fail(message);
                    } else {
                        console.log(`🟡️[${this.name}][BlockCheck] Block(s) missed: ${missedBlocks}`)
                    }
                }
            } else {
                if (missedBlocks > 0) {
                    const currentTimestamp = new Date().getTime()

                    const timeDifferentInSeconds = (currentTimestamp - previousTimestamp) / 1000
                    const secondsLeftToReset = this.configuration.miss_tolerance_period_seconds - timeDifferentInSeconds
                    if (secondsLeftToReset <= 0) {
                        const message = `No more misses happened since last one. Last missed: ${missedBlocks}. Reset monitoring flags`
                        await this.success(message);

                        // Reset the miss counter if the tolerance period has passed
                        previousTimestamp = currentTimestamp
                        missedBlocks = 0
                    } else {
                        const message = `No more misses happened since last one. Last missed: ${missedBlocks}. Reset in ${secondsLeftToReset} seconds.`
                        await this.warning(message);
                    }
                } else {
                    await this.success('No misses!');
                }

                lastBlockHeight = currentBlockHeight;
            }

            this.isFirstRun = false

            console.log(`🕗️[${this.name}][BlockCheck] Waiting ${this.configuration.sleep_duration_seconds} seconds before checking again...`)
            await new Promise((resolve) => setTimeout(resolve, this.configuration.sleep_duration_seconds * 1000))
        }
    }

    async fail(message: string): Promise<void>
    {
        console.log(`🔴️[${this.name}][BlockCheck] ${message}`)
        await pingMonitor(this.monitor.id as number, {status: false, last_error: message})
        await this.alerter.alert(`🚨 ${this.name} ${message}`)

        this.isOkay = false;
    }

    async warning(message: string): Promise<void>
    {
        if (this.isPingTime()) {
            await pingMonitor(this.monitor.id as number, {status: true, last_error: message})
        }

        console.debug(`🟡️[${this.name}][BlockCheck] ${message}`)
    }

    async success(message: string): Promise<void>
    {
        if (!this.isOkay) {
            await pingMonitor(this.monitor.id as number, {status: true, last_error: null})
            if (!this.isFirstRun) {
                await this.alerter.alert(`🟢️[${this.name}][BlockCheck] ${message}!`);
            }
        }

        this.isOkay = true
    }

    isPingTime(): boolean
    {
        const currentTime = new Date().getTime();
        if (currentTime - this.lastTimePing >= this.pingInterval * 1000) {
            this.lastTimePing = currentTime;
            return true;
        }

        return false;
    }

    async getChain(chainName: string): Promise<Chain> {
        return (await chainDirectory.getChainData(chainName)).chain;
    }

}