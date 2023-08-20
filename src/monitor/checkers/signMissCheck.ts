import {MonitorCheck} from "./monitorCheck";
import {BlockAlertConfiguration} from "../../type/blockAlertConfiguration";
import {Alerter} from "../../Alerter/alerter";
import {ClientInterface} from "../../client/clientInterface";

export class SignMissCheck implements MonitorCheck {
    private readonly alerter: Alerter;
    constructor (
        private readonly name: string,
        private readonly chainName: string,
        private readonly client: ClientInterface,
        private readonly blockAlertConfiguration: BlockAlertConfiguration,
        private readonly alertChannels: any
    ) {
        this.alerter = new Alerter(
            this.name,
            'SigningMissCheck',
            this.alertChannels,
            this.blockAlertConfiguration.alert_sleep_duration_minutes
        )

    }

    check(): Promise<void> {
        throw new Error('Method not implemented.');
    }

}