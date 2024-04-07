import Alerter from "../../Domain/Alerter/Alerter";
import {injectable, multiInject} from "inversify";
import {TYPES} from "../../Domain/DependencyInjection/types";
import {AlertChannel} from "../../Domain/Alerter/AlertChannel";
import Monitor from "../../Domain/Monitor/Monitor";

@injectable()
export default class AppAlerter implements Alerter {
    private lastAlertedAt = new Map<number, Date>

    constructor(
        @multiInject(TYPES.AlertChannel) private readonly channels: AlertChannel[] = new Array<AlertChannel>()
    ) {
    }

    async alert(monitor: Monitor, message: string): Promise<void> {
        if (this.lastAlertedAt.has(monitor.id)) {
            const lastAlertedAt = this.lastAlertedAt.get(monitor.id);
            if (lastAlertedAt && new Date().getTime() - lastAlertedAt.getTime() < monitor.alertSleepDurationMinutes * 60 * 1000) {
                console.log(`[${monitor.name}] Alert message sent too recently. Skipping.`);
                return;
            }
        }

        this.sendMessage(monitor, message)
        this.lastAlertedAt.set(monitor.id, new Date());
    }

    async resolve(monitor: Monitor, message: string): Promise<void> {
        this.lastAlertedAt.delete(monitor.id)
        this.sendMessage(monitor, message)
    }

    private async sendMessage (monitor: Monitor, message: string): Promise<void> {
        for (const alerter of this.channels) {
            try {
                await alerter.alert(message)
            } catch (error) {
                console.error(`[${monitor.name}] Failed to alert`, error)
            }
        }
    }
}