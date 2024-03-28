import Monitor from "../../Domain/Monitor/Monitor";
import {MonitorType} from "../../Domain/Monitor/MonitorType";
import DiskSpaceChecker from "./Check/CheckDiskSpace/DiskSpaceChecker";
import CommandHandlerManager from "../../Infrastructure/CommandHandler/CommandHandlerManager";
import DiskSpaceCheckMonitor from "../../Domain/Monitor/DiskSpaceCheckMonitor";
import CheckState from "./Check/CheckState";
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
                    new CheckState(CheckStatus.UNKNOWN, 0, 0)
                );
            }
            default:
                throw new Error(`Unsupported monitor type ${monitor.type}`);
        }
    }
}