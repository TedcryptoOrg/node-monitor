import Monitor from "../../Domain/Monitor/Monitor";
import {MonitorType} from "../../Domain/Monitor/MonitorType";
import DiskSpaceChecker from "./Checkers/DiskSpaceChecker";
import CommandHandlerManager from "../../Infrastructure/CommandHandler/CommandHandlerManager";
import {CheckStatus} from "../../Domain/Checker/CheckStatusEnum";
import {inject, injectable} from "inversify";
import {MonitorCheckerFactory as MonitorCheckerFactoryInterface} from "../../Domain/Monitor/MonitorCheckerFactory";
import UrlChecker from "./Checkers/UrlChecker";
import SignMissChecker from "./Checkers/SignMissChecker";
import BlockChecker from "./Checkers/BlockChecker";

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
                    monitor,
                    CheckStatus.UNKNOWN
                );
            }
            case MonitorType.URL_CHECK: {
                return new UrlChecker(
                    this.commandHandlerManager,
                    monitor,
                    CheckStatus.UNKNOWN
                )
            }
            case MonitorType.SIGN_MISS_CHECK: {
                return new SignMissChecker(
                    this.commandHandlerManager,
                    monitor,
                    CheckStatus.UNKNOWN
                )
            }
            case MonitorType.BLOCK_CHECK: {
                return new BlockChecker(
                    this.commandHandlerManager,
                    monitor,
                    CheckStatus.UNKNOWN
                );
            }
            default:
                throw new Error(`Unsupported monitor type ${monitor.type}`);
        }
    }
}