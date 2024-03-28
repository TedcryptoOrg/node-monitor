import Event from "../../../Domain/Event/Event";
import EventHandler from "../../../Domain/Event/EventHandler";
import RunCheckFailed from "../../Monitor/RunCheckFailed";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../Domain/DependencyInjection/types";
import ApiClient from "../../../Domain/ApiClient";

@injectable()
export default class RunCheckFailedHandler implements EventHandler {
    constructor(
        @inject(TYPES.ApiClient) private apiClient: ApiClient
    ) {
    }

    async handle(event: RunCheckFailed): Promise<void> {
        await this.apiClient.pingMonitor(
            event.monitor.id,
            {last_error: `Attempt ${event.attempt} ${event.error.message}`, status: false}
        )
    }

    supports(event: Event): boolean {
        return event instanceof RunCheckFailed;
    }
}
