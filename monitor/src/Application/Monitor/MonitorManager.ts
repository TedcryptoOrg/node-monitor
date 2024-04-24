import {inject, injectable} from "inversify";
import Monitor from "../../Domain/Monitor/Monitor";
import RunCheckFailed from "./RunCheckFailed";
import {sleep} from "../Shared/sleep";
import {TYPES} from "../../Domain/DependencyInjection/types";
import {EventDispatcher} from "../../Domain/Event/EventDispatcher";
import Checker from "../../Domain/Checker/Checker";
import ApiClient from "../../Domain/ApiClient";
import {WebSocketServer} from "../../Domain/Server/WebSocketServer";
import MonitorCheckerFactory from "./MonitorCheckerFactory";
import {CheckStatus} from "../../Domain/Checker/CheckStatusEnum";
import Logger from "../Logger/Logger";

type WebSocketMessage = {
    event: "configuration_enabled" | "configuration_disabled" | "monitor_updated" | "monitor_disabled" | "monitor_enabled",
    id: number
}

@injectable()
export default class MonitorManager {
    private maxAttempts: number | undefined = undefined
    private monitorsByConfiguration: Map<number, number[]> = new Map<number, number[]>()
    private monitors: { [key: string]: Monitor } = {}
    private checkers: { [key: string]: Checker } = {}

    constructor(
        @inject(TYPES.MonitorCheckerFactory) private readonly monitorCheckerFactory: MonitorCheckerFactory,
        @inject(TYPES.ApiClient) private readonly apiClient: ApiClient,
        @inject(TYPES.EventDispatcher) private readonly eventDispatcher: EventDispatcher,
        @inject(TYPES.WebSocketServer) private readonly websocketServer: WebSocketServer,
        @inject(TYPES.Logger) private readonly logger: Logger
    ) {
        this.websocketServer.on('connection', ws => {
            ws.on('message', async (message: Buffer) => {
                try {
                    const messageJson = JSON.parse(message.toString()) as WebSocketMessage;
                    this.logger.debug(`[WebServer Socket] Received event ${messageJson.event}`, {websocket_message: message.toString()})

                    if (['configuration_disabled', 'configuration_enabled'].includes(messageJson.event)) {
                        this.handleConfigurationEvent(messageJson.id, messageJson.event as "configuration_enabled" | "configuration_disabled")
                    } else if (['monitor_updated', 'monitor_disabled', 'monitor_enabled'].includes(messageJson.event)) {
                        await this.handleMonitorEvent(messageJson.id, messageJson.event as "monitor_updated" | "monitor_disabled" | "monitor_enabled")
                    }
                } catch (error) {
                    this.logger.error('Failed to parse configuration:', {error: error});
                }
            });
        });
    }

    public setMaxAttempts(maxAttempts: number): void {
        this.maxAttempts = maxAttempts;
    }

    public pushMonitor(monitor: Monitor): void {
        if (this.monitors.hasOwnProperty(monitor.id)) {
            this.logger.warn(`Monitor ${monitor.getFullName()} already exists in the manager.`)
            return
        }

        if (this.monitorsByConfiguration.has(monitor.configuration.id)) {
            this.monitorsByConfiguration.get(monitor.configuration.id)?.push(monitor.id)
        } else {
            this.monitorsByConfiguration.set(
                monitor.configuration.id,
                [monitor.id]
            )
        }

        this.monitors[monitor.id] = monitor;
        this.checkers[monitor.id] = this.monitorCheckerFactory.create(monitor);
    }

    public run(): void {
        this.logger.log('Running checks...');
        Object.values(this.monitors).forEach(async (monitor: Monitor) => {
            this.runCheck(monitor);
        });
    }

    public runOnce(): void {
        Object.values(this.monitors).forEach(async (monitor: Monitor) => {
            this.checkers[monitor.id].stop(); // we let checker know we want to stop after first run
            this.runCheck(monitor);
        });
    }

    public getStatus(monitor: Monitor): CheckStatus {
        return this.checkers[monitor.id].getStatus();
    }

    public updateCheck(monitor: Monitor): void {
        this.checkers[monitor.id].updateMonitor(monitor as Monitor);
    }

    public stopCheck(monitor: Monitor): void {
        this.logger.debug(`Stopping check for ${monitor.getFullName()}`, {monitorId: monitor})
        this.checkers[monitor.id].stop();
    }

    public startCheck(monitor: Monitor): void {
        if (!this.checkers[monitor.id]) {
            throw new Error(`Monitor ${monitor.getFullName()} does not exist in the manager. Have you forgot to push it?`);
        }

        this.checkers[monitor.id].start();
        this.runCheck(monitor);
    }

    private async runCheck(monitor: Monitor, attempt: number = 1): Promise<void> {
        if (this.maxAttempts && this.maxAttempts < attempt) {
            this.logger.error(`Max attempts reached for ${monitor.getFullName()}. Skipping check.`, {monitorId: monitor.id})
            return;
        }
        if (!monitor.configuration.isEnabled) {
            this.logger.error(`${monitor.configuration.name} is disabled. Skipping check.`, {monitorId: monitor.id})
            return
        }
        if (!monitor.isEnabled) {
            this.logger.error(`${monitor.getFullName()} is disabled. Skipping check.`, {monitorId: monitor.id})
            return
        }
        let timeoutId = undefined;
        try {
            if (attempt > 1) {
                timeoutId = setTimeout(() => {
                    this.logger.log(`After ${attempt} fails, counter has been reset to 0.`, {monitorId: monitor.id})
                    attempt = 0;
                }, 60000)
            }

            await this.checkers[monitor.id].check()
        } catch (error: any) {
            this.logger.error(error.message, {monitorId: monitor.id, error: error})

            clearTimeout(timeoutId)
            this.checkers[monitor.id].setStatus(CheckStatus.ERROR)

            await this.eventDispatcher.dispatch(new RunCheckFailed(monitor, attempt, error))

            this.logger.debug(`${monitor.getFullName()}[Attempt: ${attempt}] Retrying in ${(attempt ** 2)} seconds`, {monitorId: monitor.id})
            await sleep(1000 * attempt ** 2)
            await this.runCheck(monitor, attempt + 1)
        }
    }

    private handleConfigurationEvent(configurationId: number, event: "configuration_enabled" | "configuration_disabled"): void {
        if (!this.monitorsByConfiguration.has(configurationId)) {
            return
        }

        this.monitorsByConfiguration.get(configurationId)?.forEach(monitorId => {
            if (event === 'configuration_enabled') {
                this.startCheck(this.monitors[monitorId])
            } else {
                this.stopCheck(this.monitors[monitorId])
            }
        })
    }

    private async handleMonitorEvent(id: number, event: "monitor_updated" | "monitor_disabled" | "monitor_enabled") {
        const monitor = await this.apiClient.getMonitor(id);

        if (!this.monitors.hasOwnProperty(monitor.id)) {
            this.pushMonitor(monitor)
        }

        switch (event) {
            case 'monitor_updated':
                this.updateCheck(monitor);
                break;
            case 'monitor_disabled':
                this.stopCheck(monitor);
                break;
            case 'monitor_enabled':
                this.startCheck(monitor);
                break;
            default:
                this.logger.error(`Unknown event ${event}`, {monitorId: monitor.id, configurationId: monitor.configuration.id})
        }
    }
}
