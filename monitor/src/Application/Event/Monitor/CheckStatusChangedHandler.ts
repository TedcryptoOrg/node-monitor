import Event from "../../../Domain/Event/Event";
import EventHandler from "../../../Domain/Event/EventHandler";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../Domain/DependencyInjection/types";
import ApiClient from "../../../Domain/ApiClient";
import CheckStatusChanged from "../../Monitor/CheckStatusChanged";
import {CheckStatus} from "../../../Domain/Checker/CheckStatusEnum";

@injectable()
export default class CheckStatusChangedHandler implements EventHandler {
    constructor(
        @inject(TYPES.ApiClient) private apiClient: ApiClient
    ) {
    }

    async handle(event: CheckStatusChanged): Promise<void> {
        await this.apiClient.pingMonitor(
            event.monitor.id,
            {
                last_error: this.getErrorMessage(event),
                status: this.isWorking(event)
            }
        )
    }

    supports(event: Event): boolean {
        return event instanceof CheckStatusChanged;
    }

    private getErrorMessage(event: CheckStatusChanged): string|null {
        if (event.checkResult.status === CheckStatus.OK)  {
            return null
        }

        return `Status changed from ${event.lastStatus.toString()} to ${event.checkResult.status.toString()}. Message: ${event.checkResult.message}`
    }

    private isWorking(event: CheckStatusChanged): boolean {
        return event.checkResult.status !== CheckStatus.ERROR
    }
}
