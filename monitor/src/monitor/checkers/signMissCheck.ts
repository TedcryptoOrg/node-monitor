import {MonitorCheck} from "./monitorCheck";
import {Alerter} from "../../Alerter/alerter";
import {ClientInterface} from "../../client/clientInterface";
import {getValConsAddressFromPubKey} from "../../util/validatorTools";
import {Chain} from "@tedcryptoorg/cosmos-directory";
import {ApiMonitor, SignMissCheckConfiguration} from "../../type/api/ApiMonitor";
import {pingMonitor} from "../../services/monitorsManager";
import {ApiService} from "../../type/api/ApiService";
import {buildClient} from "../../services/clientManager";
import {ServiceTypeEnum} from "../../type/api/ServiceTypeEnum";

export class SignMissCheck implements MonitorCheck {
    private readonly alerter: Alerter
    private readonly configuration: SignMissCheckConfiguration
    private isOkay: boolean = false
    private isFirstRun: boolean = true
    private lastTimePing: number = 0
    private readonly pingInterval: number = 60
    private client: ClientInterface

    constructor (
        private readonly name: string,
        private readonly chain: Chain,
        private readonly monitor: ApiMonitor,
        private readonly services: ApiService[],
        private readonly alertChannels: any
    ) {
        this.configuration = JSON.parse(this.monitor.configuration_object) as SignMissCheckConfiguration
        console.debug(`🔨️[${this.name}][${this.chain.name}] Creating sign miss check...`, this.configuration);

        this.client = buildClient(this.services, ServiceTypeEnum.REST)
        this.alerter = new Alerter(
            this.name,
            'SigningMissCheck',
            this.alertChannels,
            this.configuration.alert_sleep_duration_minutes
        )
    }

    async check(): Promise<void> {
        const validatorConsAddress = await this.getValidatorConsAddress();
        let previousMissCounter = await this.fetchMissCounter(validatorConsAddress)
        let previousTimestamp = new Date().getTime()
        let lastMissCounter = previousMissCounter
        while (true) {
            console.log(`🏃️[${this.name}] Running miss sign counter check...`)
            const currentMissCounter = await this.fetchMissCounter(validatorConsAddress)

            // Refresh the missing period if we are missing blocks within the period
            const missDifference = currentMissCounter - previousMissCounter
            if (currentMissCounter > lastMissCounter) {
                console.log(`🟡️[${this.name}][Sign Miss Counter] Counter has increased, current missed in this missing period: ${missDifference}. Refreshing previous incident timestamp.`)
                previousTimestamp = new Date().getTime()

                // Check if the miss counter exceeds the tolerance
                if (missDifference >= this.configuration.miss_tolerance) {
                    const message = `Missed too many signing blocks. Miss counter: ${missDifference}. Miss tolerance: ${this.configuration.miss_tolerance}`
                    await this.fail(message)
                }
            } else if (missDifference > 0) {
                const currentTimestamp = new Date().getTime()

                const timeDifferentInSeconds = (currentTimestamp - previousTimestamp) / 1000
                const secondsLeftToReset = this.configuration.miss_tolerance_period_seconds - timeDifferentInSeconds
                if (secondsLeftToReset <= 0) {
                    const message = `No more misses happened since last one. Last missed: ${missDifference}. Reset monitoring flags`
                    await this.success(message);

                    // Reset the miss counter if the tolerance period has passed
                    previousMissCounter = currentMissCounter
                    previousTimestamp = currentTimestamp
                } else {
                    const message = `No more misses happened since last one. Last missed: ${missDifference}. Reset in ${secondsLeftToReset} seconds.`
                    await this.warning(message);
                }
            } else {
                await this.success('No misses!')
            }

            lastMissCounter = currentMissCounter

            this.isFirstRun = false
            console.log(`🕗️[${this.name}][Sign Miss Counter] Waiting ${this.configuration.sleep_duration_seconds} seconds before checking again...`)
            await new Promise((resolve) => setTimeout(resolve, this.configuration.sleep_duration_seconds * 1000))
        }
    }

    private async fail(message: string): Promise<void>
    {
        console.log(`🔴[${this.name}][Sign Miss Counter] ${message}`)

        await pingMonitor(this.monitor.id as number, {status: false, last_error: message})
        await this.alerter.alert(`[${this.name}] 🚨 ${message}`)

        this.isOkay = false
    }

    private async warning(message: string): Promise<void>
    {
        console.log(`🟡️[${this.name}][Sign Miss Counter] ${message}`)
        if (this.isPingTime()) {
            await pingMonitor(this.monitor.id as number, {status: true, last_error: message})
        }

        this.isOkay = true
    }

    private async success(message: string) {
        console.log(`🟢️[${this.name}][Sign Miss Counter] ${message}`)
        if (!this.isOkay) {
            await pingMonitor(this.monitor.id as number, {status: true, last_error: null})
            if (!this.isFirstRun) {
                await this.alerter.resolve(`🟢️[${this.name}][Sign Miss Counter] ${message}`)
            }
        }

        this.isOkay = true
    }

    private async fetchMissCounter (validatorConsAddress: string): Promise<number> {
        const signingInfo = (await this.client.getValidatorSigningInfo(validatorConsAddress)).val_signing_info;

        return Number(signingInfo.missed_blocks_counter);
    }

    private async getValidatorConsAddress (): Promise<string> {
        const validator = (await this.client.getValidatorInfo(this.configuration.valoper_address)).validator

        return getValConsAddressFromPubKey(
            this.chain.bech32_prefix,
            validator.consensus_pubkey.type,
            validator.consensus_pubkey.value
        )
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


}