import {MonitorCheck} from "./monitorCheck";
import {ClientInterface} from "../../client/clientInterface";
import {getValConsAddressFromPubKey} from "../../Application/Shared/validatorTools";
import {ApiMonitor, SignMissCheckConfiguration} from "../../type/api/ApiMonitor";
import {ApiService} from "../../type/api/ApiService";
import {buildClient} from "../../services/clientManager";
import {ServiceTypeEnum} from "../../type/api/ServiceTypeEnum";
import {AlertChannel} from "../../AlertChannel/alertChannel";
import {Chain} from "@tedcryptoorg/cosmos-directory";

export class SignMissCheck extends MonitorCheck {
    private client: ClientInterface

    constructor (
        monitor: ApiMonitor,
        alertChannels: AlertChannel[],
        private readonly services: ApiService[],
        private readonly chain: Chain,
    ) {
        super(monitor,alertChannels);
        this.client = buildClient(this.services, ServiceTypeEnum.REST)
    }

    async check(): Promise<void> {
        const configuration = this.configuration as SignMissCheckConfiguration
        const validatorConsAddress = await this.getValidatorConsAddress(configuration.valoper_address);
        let previousMissCounter = await this.fetchMissCounter(validatorConsAddress)
        let previousTimestamp = new Date().getTime()
        let lastMissCounter = previousMissCounter
        while (true) {
            console.log(`🏃️${this.getMessagePrefix()} Running miss sign counter check...`)
            const currentMissCounter = await this.fetchMissCounter(validatorConsAddress)

            // Refresh the missing period if we are missing blocks within the period
            const missDifference = currentMissCounter - previousMissCounter
            if (currentMissCounter > lastMissCounter) {
                console.log(`🟡${this.getMessagePrefix()} Counter has increased, current missed in this missing period: ${missDifference}. Refreshing previous incident timestamp.`)
                previousTimestamp = new Date().getTime()

                // Check if the miss counter exceeds the tolerance
                if (missDifference >= configuration.miss_tolerance) {
                    const message = `Missed too many signing blocks. Miss counter: ${missDifference}. Miss tolerance: ${configuration.miss_tolerance}`
                    await this.fail(message)
                }
            } else if (missDifference > 0) {
                const currentTimestamp = new Date().getTime()

                const timeDifferentInSeconds = (currentTimestamp - previousTimestamp) / 1000
                const secondsLeftToReset = configuration.miss_tolerance_period_seconds - timeDifferentInSeconds
                if (secondsLeftToReset <= 0) {
                    const message = `No more misses happened since last one. Last missed: ${missDifference}. Reset monitoring flags`
                    await this.success(message);

                    // Reset the miss counter if the tolerance period has passed
                    previousMissCounter = currentMissCounter
                    previousTimestamp = currentTimestamp
                } else {
                    const message = `No more misses happened since last one. Last missed: ${missDifference}. Reset in ${secondsLeftToReset.toFixed(0)} seconds.`
                    await this.warning(message);
                }
            } else {
                await this.success('No misses!')
            }

            lastMissCounter = currentMissCounter

            console.log(`🕗️${this.getMessagePrefix()} Waiting ${configuration.sleep_duration_seconds} seconds before checking again...`)
            await new Promise((resolve) => setTimeout(resolve, configuration.sleep_duration_seconds * 1000))
        }
    }

    private async fetchMissCounter (validatorConsAddress: string): Promise<number> {
        const signingInfo = (await this.client.getValidatorSigningInfo(validatorConsAddress)).val_signing_info;

        return Number(signingInfo.missed_blocks_counter);
    }

    private async getValidatorConsAddress(valoperAddress: string): Promise<string> {
        const validator = (await this.client.getValidatorInfo(valoperAddress)).validator

        return getValConsAddressFromPubKey(
            this.chain.bech32_prefix,
            validator.consensus_pubkey.type,
            validator.consensus_pubkey.value
        )
    }
}
