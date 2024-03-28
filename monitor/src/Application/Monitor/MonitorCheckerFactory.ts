import Monitor from "../../Domain/Monitor/Monitor";
import {MonitorType} from "../../Domain/Monitor/MonitorType";
import DiskSpaceChecker from "./CheckDiskSpace/DiskSpaceChecker";
import CommandHandlerManager from "../../Infrastructure/CommandHandler/CommandHandlerManager";
import DiskSpaceCheckMonitor from "../../Domain/Monitor/DiskSpaceCheckMonitor";
import {CheckStatus} from "../../Domain/Checker/CheckStatusEnum";
import {inject, injectable} from "inversify";
import {MonitorCheckerFactory as MonitorCheckerFactoryInterface} from "../../Domain/Monitor/MonitorCheckerFactory";

@injectable()
export default class MonitorCheckerFactory implements MonitorCheckerFactoryInterface {
    constructor(
        @inject(CommandHandlerManager) private readonly commandHandlerManager: CommandHandlerManager,
    ) {
    }

    create(monitor: Monitor) {
        switch (monitor.type) {
            case MonitorType.DISK_SPACE_CHECK: {
                return new DiskSpaceChecker(
                    this.commandHandlerManager,
                    monitor as DiskSpaceCheckMonitor,
                    CheckStatus.UNKNOWN
                );
            }
            default:
                throw new Error(`Unsupported monitor type ${monitor.type}`);
        }
    }
}