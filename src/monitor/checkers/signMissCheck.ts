import {MonitorCheck} from "./monitorCheck";
import {Alerter} from "../../Alerter/alerter";
import {ClientInterface} from "../../client/clientInterface";
import {getValConsAddressFromPubKey} from "../../util/validatorTools";
import {Chain} from "@tedcryptoorg/cosmos-directory";
import {SignMissCheckConfiguration} from "../../type/config/signMissCheckConfiguration";

export class SignMissCheck implements MonitorCheck {
    private readonly alerter: Alerter;
    constructor (
        private readonly name: string,
        private readonly chain: Chain,
        private readonly configuration: SignMissCheckConfiguration,
        private readonly client: ClientInterface,
        private readonly alertChannels: any
    ) {
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
            console.log(`[${this.name}] Running miss sign counter check...`)
            const currentMissCounter = await this.fetchMissCounter(validatorConsAddress)

            // Refresh the missing period if we are missing blocks within the period
            const missDifference = currentMissCounter - previousMissCounter
            if (currentMissCounter > lastMissCounter) {
                console.log(`[${this.name}][Sign Miss Counter] Counter has increased, current missed in this missing period: ${missDifference}. Refreshing previous incident timestamp.`)
                previousTimestamp = new Date().getTime()

                // Check if the miss counter exceeds the tolerance
                if (missDifference >= this.configuration.miss_tolerance) {
                    console.log(`[${this.name}][Sign Miss Counter] Missing too many signing blocks...`, missDifference)

                    await this.alerter.alert(`[${this.name}] 🚨 Price tracker monitor alert!\n You are missing signing on to many blocks. Miss counter exceeded: ${missDifference}`)
                }
            } else if (missDifference > 0) {
                const currentTimestamp = new Date().getTime()

                const timeDifferentInSeconds = (currentTimestamp - previousTimestamp) / 1000
                const secondsLeftToReset = this.configuration.miss_tolerance_period_seconds - timeDifferentInSeconds
                console.debug(`[${this.name}][Sign Miss Counter] No more misses happened since last one. Last missed: ${missDifference}. Reset in ${secondsLeftToReset} seconds.`)
                if (secondsLeftToReset <= 0) {
                    console.log(`[${this.name}][Sign Miss Counter] No more misses happened since last one. Last missed: ${missDifference}. Reset monitoring flags`)
                    // Reset the miss counter if the tolerance period has passed
                    previousMissCounter = currentMissCounter
                    previousTimestamp = currentTimestamp
                }
            }

            lastMissCounter = currentMissCounter

            if (process.env.APP_ENV === 'test') {
                break
            }

            // Sleep for the specified duration
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

}