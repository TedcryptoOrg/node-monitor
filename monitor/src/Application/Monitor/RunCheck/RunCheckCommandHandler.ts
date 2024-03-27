import CommandHandler from "../../../Domain/Command/CommandHandler";
import {injectable} from "inversify";
import RunCheckCommand from "./RunCheckCommand";
import {MonitorType} from "../../../Domain/Monitor/MonitorType";
import Checker from "../../../Domain/Checker/Checker";
import Monitor from "../../../Domain/Monitor/Monitor";
import DiskSpaceChecker from "../Check/CheckDiskSpace/DiskSpaceChecker";
import DiskSpaceCheckMonitor from "../../../Domain/Monitor/DiskSpaceCheckMonitor";
import {CheckStatus} from "../../../Domain/Checker/CheckStatusEnum";
import CheckState from "../Check/CheckState";
import CommandHandlerManager from "../../../Infrastructure/CommandHandler/CommandHandlerManager";
import {myContainer} from "../../../Infrastructure/DependencyInjection/inversify.config";
import {sleep} from "../../Shared/sleep";

@injectable()
export default class RunCheckCommandHandler implements CommandHandler {
    async handle(command: RunCheckCommand): Promise<void> {
        if (!command.monitor.configuration.isEnabled) {
            console.error(`${command.monitor.configuration.name} is disabled. Skipping check.`)
            return
        }
        if (!command.monitor.isEnabled) {
            console.error(`${command.monitor.getFullName()} is disabled. Skipping check.`)
            return
        }

        try {
            await this.getChecker(command.monitor).check()
        } catch (error) {
            console.error(error)
            console.debug(`${command.monitor.getFullName()}[Attempt: ${command.attempt}] Retrying in ${(command.attempt ** 2)} seconds`)
            await sleep(1000 * command.attempt ** 2)
            await this.handle(command.withAttempt(command.attempt + 1))
        }
    }

    private getChecker(monitor: Monitor): Checker {
        switch (monitor.type) {
            case MonitorType.DISK_SPACE_CHECK: {
                return new DiskSpaceChecker(
                    myContainer.get(CommandHandlerManager),
                    monitor as DiskSpaceCheckMonitor,
                    new CheckState(CheckStatus.UNKNOWN, 0, 0)
                );
            }
            default:
                throw new Error(`Unsupported monitor type ${monitor.type}`);
        }
    }
}
