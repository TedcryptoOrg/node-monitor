import {MonitorCheck} from "./monitorCheck";
import {Alerter} from "../../Alerter/alerter";
import {ClientInterface} from "../../client/clientInterface";
import {getValConsAddressFromPubKey} from "../../util/validatorTools";
import {Chain} from "@tedcryptoorg/cosmos-directory";
import {ApiMonitor, SignMissCheckConfiguration} from "../../type/api/ApiMonitor";
import {pingMonitor} from "../../services/monitorsManager";

export class SignMissCheck implements MonitorCheck {
    private readonly alerter: Alerter;
    private readonly configuration: SignMissCheckConfiguration
    private isOkay: boolean = false;
    private lastTimePing: number = 0;
    private readonly pingInterval: number = 60;

    constructor (
        private readonly name: string,
        private readonly chain: Chain,
        private readonly monitor: ApiMonitor,
        private readonly client: ClientInterface,
        private readonly alertChannels: any
    ) {
        this.configuration = JSON.parse(this.monitor.configuration_object) as SignMissCheckConfiguration
        console.debug(`🔨️[${this.name}][${this.chain.name}] Creating sign miss check...`, this.configuration);

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
                    console.log(`[${this.name}][Sign Miss Counter] ${message}`)
                    await pingMonitor(this.monitor.id as number, {status: false, last_error: message})
                    await this.alerter.alert(`[${this.name}] 🚨 ${message}`)
                }
            } else if (missDifference > 0) {
                const currentTimestamp = new Date().getTime()

                const timeDifferentInSeconds = (currentTimestamp - previousTimestamp) / 1000
                const secondsLeftToReset = this.configuration.miss_tolerance_period_seconds - timeDifferentInSeconds
                if (secondsLeftToReset <= 0) {
                    const message = `No more misses happened since last one. Last missed: ${missDifference}. Reset monitoring flags`
                    console.log(`🟢️[${this.name}][Sign Miss Counter] ${message}`)
                    if (!this.isOkay) {
                        await pingMonitor(this.monitor.id as number, {status: true, last_error: message})
                        this.isOkay = true;
                    }

                    // Reset the miss counter if the tolerance period has passed
                    previousMissCounter = currentMissCounter
                    previousTimestamp = currentTimestamp
                } else {
                    const message = `No more misses happened since last one. Last missed: ${missDifference}. Reset in ${secondsLeftToReset} seconds.`
                    console.log(`🟡️[${this.name}][Sign Miss Counter] ${message}`)
                    if (this.isPingTime()) {
                        await pingMonitor(this.monitor.id as number, {status: false, last_error: message})
                    }
                }
            } else {
                if (!this.isOkay) {
                    await pingMonitor(this.monitor.id as number, {status: true, last_error: null})
                    this.isOkay = true;
                }
                console.log(`🟢️[${this.name}][Sign Miss Counter] No misses!`)
            }

            lastMissCounter = currentMissCounter

            console.log(`🕗️[${this.name}][Sign Miss Counter] Waiting ${this.configuration.sleep_duration_seconds} seconds before checking again...`)
            await new Promise((resolve) => setTimeout(resolve, this.configuration.sleep_duration_seconds * 1000))
        }
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