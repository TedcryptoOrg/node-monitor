import {inject, injectable} from "inversify";
import Monitor from "../../Domain/Monitor/Monitor";
import RunCheckFailed from "./RunCheckFailed";
import {sleep} from "../Shared/sleep";
import {TYPES} from "../../Domain/DependencyInjection/types";
import {EventDispatcher} from "../../Domain/Event/EventDispatcher";
import Checker from "../../Domain/Checker/Checker";
import DiskSpaceCheckMonitor from "../../Domain/Monitor/DiskSpaceCheckMonitor";
import ApiClient from "../../Domain/ApiClient";
import {WebSocketServer} from "../../Domain/Server/WebSocketServer";
import MonitorCheckerFactory from "./MonitorCheckerFactory";
import {CheckStatus} from "../../Domain/Checker/CheckStatusEnum";

type WebSocketMessage = {
    event: "monitor_updated"|"monitor_disabled"|"monitor_enabled",
    id: number
}

@injectable()
export default class MonitorManager {
    private maxAttempts: number = 5
    private monitorsByConfiguration: Map<number, number[]> = new Map<number, number[]>()
    private monitors: { [key: string]: Monitor } = {}
    private checkers: { [key: string]: Checker } = {}

    constructor(
        @inject(TYPES.MonitorCheckerFactory) private readonly monitorCheckerFactory: MonitorCheckerFactory,
        @inject(TYPES.ApiClient) private readonly apiClient: ApiClient,
        @inject(TYPES.EventDispatcher) private readonly eventDispatcher: EventDispatcher,
        @inject(TYPES.WebSocketServer) private readonly websocketServer: WebSocketServer
    ) {
        this.websocketServer.on('connection', ws => {
            ws.on('message', async (message: Buffer) => {
                try {
                    const messageJson = JSON.parse(message.toString()) as WebSocketMessage;
                    const monitor = await this.apiClient.getMonitor(messageJson.id);
                    console.debug(`${monitor.getFullName()}[WebServer Socket] Received event ${messageJson.event}`)
                    switch (messageJson.event) {
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
                            console.error(`Unknown event ${messageJson.event}`)
                    }
                } catch (error) {
                    console.error('Failed to parse configuration:', error);
                }
            });
        });
    }

    public setMaxAttempts(maxAttempts: number): void {
        this.maxAttempts = maxAttempts;
    }

    public pushMonitor(monitor: Monitor): void {
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
        this.checkers[monitor.id].updateMonitor(monitor as DiskSpaceCheckMonitor);
    }

    public stopCheck(monitor: Monitor): void {
        console.debug(`Stopping check for ${monitor.getFullName()}`)
        this.checkers[monitor.id].stop();
    }

    public startCheck(monitor: Monitor): void {
        if (this.checkers[monitor.id]) {
            this.checkers[monitor.id].start();
            return;
        }

        this.runCheck(monitor)
    }

    private async runCheck(monitor: Monitor, attempt: number = 1): Promise<void> {
        if (this.maxAttempts < attempt) {
            console.error(`Max attempts reached for ${monitor.getFullName()}. Skipping check.`)
            return;
        }
        if (!monitor.configuration.isEnabled) {
            console.error(`${monitor.configuration.name} is disabled. Skipping check.`)
            return
        }
        if (!monitor.isEnabled) {
            console.error(`${monitor.getFullName()} is disabled. Skipping check.`)
            return
        }

        try {
            await this.checkers[monitor.id].check()
        } catch (error: any) {
            this.checkers[monitor.id].setStatus(CheckStatus.ERROR)

            await this.eventDispatcher.dispatch(new RunCheckFailed(monitor, attempt, error))

            console.error(error)
            console.debug(`${monitor.getFullName()}[Attempt: ${attempt}] Retrying in ${(attempt ** 2)} seconds`)
            await sleep(1000 * attempt ** 2)
            await this.runCheck(monitor, attempt + 1)
        }
    }
}
