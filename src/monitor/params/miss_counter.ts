import axios from "axios";
import {CryptoTools} from "../../crypto/crypto_tools";
import {Param} from "./param";
import {Configuration} from "../../type/configuration";
import {Alerter} from "../../alerter/alerter";

export class MissCounter implements Param {
    private staticEndpoints: { kujira: string; ojo: string } = {
        'kujira': '/oracle/validators/%valoper%/miss',
        'ojo': '/ojo/oracle/v1/validators/%valoper%/miss',
    }

    private name: string;
    private cryptoTools: CryptoTools;
    private configuration: Configuration;
    private alerters: Alerter[];

    constructor(name: string, configuration: Configuration, alerters: Alerter[]) {
        this.name = name;
        this.cryptoTools = new CryptoTools();
        this.alerters = alerters;
        this.configuration = configuration;
    }

    async check(): Promise<void> {
        let previousMissCounter = await this.fetchMissCounter(
            this.configuration.node_rest,
            this.configuration.valoper_address
        );
        let previousTimestamp = new Date().getTime();
        let lastMissCounter = previousMissCounter;
        let lastAlertedPeriod = 0;
        let startReseter = false;
        while (true) {
            console.log('Running miss counter check...');
            let currentMissCounter = await this.fetchMissCounter(
                this.configuration.node_rest,
                this.configuration.valoper_address
            );

            // Check if the miss counter exceeds the tolerance
            let missDifference = currentMissCounter - previousMissCounter;
            if (missDifference >= this.configuration.miss_tolerance) {
                console.log('Missing too many price updates...');
                let timeDifference = new Date().getTime() - lastAlertedPeriod;
                if (timeDifference / 1000 > this.configuration.alert_sleep_duration) {
                    // loop alerters and alert
                    for (let alerter of this.alerters) {
                        await alerter.alert(`🚨 ${this.name} Price tracker monitor alert!\n You are missing too many blocks. Miss counter exceeded: ${missDifference}`);
                    }
                    lastAlertedPeriod = new Date().getTime();
                    previousMissCounter = currentMissCounter;
                } else {
                    console.log('[Miss Counter] Alert message sent too recently. Skipping.');
                }
            }

            let currentTimestamp = new Date().getTime();

            // Refresh the missing period if we are missing blocks within the period
            if (currentMissCounter > lastMissCounter) {
                console.log(`[Miss Counter] Missing counter has increased, current missed: ${currentMissCounter - previousMissCounter}. Refreshing previous incident timestamp.`);
                previousTimestamp = new Date().getTime();
                startReseter = true;
            }

            let timeDifference = currentTimestamp - previousTimestamp;
            if (startReseter && timeDifference / 1000 > this.configuration.miss_tolerance_period) {
                console.log(`[Miss Counter] No more misses happened since last one. Last missed: ${currentMissCounter - previousMissCounter}. Reset monitoring flags`)
                // Reset the miss counter if the tolerance period has passed
                previousMissCounter = currentMissCounter;
                previousTimestamp = currentTimestamp;
                startReseter = false;
            }

            lastMissCounter = currentMissCounter;

            if (process.env.APP_ENV === 'test') {
                break;
            }

            // Sleep for the specified duration
            await new Promise((resolve) => setTimeout(resolve, this.configuration.sleep_duration * 1000));
        }
    }

    async fetchMissCounter(nodeRest: string, valoperAddress: string): Promise<number> {
        const endpoint = this.getEndpointUrl(valoperAddress);
        try {
            const response = await axios.get(nodeRest + endpoint);

            return response.data.miss_counter;
        } catch (error: any) {
            throw new Error('Error fetching miss counter', error);
        }
    }

    private getEndpointUrl(valoperAddress: string): string
    {
        const chain = this.cryptoTools.getChainFromBech32Address(valoperAddress);

        for (const [key, value] of Object.entries(this.staticEndpoints)) {
            if (chain?.startsWith(key)) {
                return value.replace('%valoper%', valoperAddress);
            }
        }

        throw new Error('No endpoint found for chain: ' + (chain ?? 'unknown'));
    }
}