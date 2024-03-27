import Monitor from "../../../Domain/Monitor/Monitor";
import Command from "../../../Domain/Command/Command";

export default class RunCheckCommand implements Command {
    constructor(
        public readonly monitor: Monitor,
        public readonly attempt: number = 1
    ) {}

    withAttempt(attempt: number): RunCheckCommand {
        return new RunCheckCommand(this.monitor, attempt);
    }
}
