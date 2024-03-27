import Event from "../../../Domain/Event/Event";
import Monitor from "../../../Domain/Monitor/Monitor";

export default class RunCheckFailed implements Event {
    constructor(
        public readonly monitor: Monitor,
        public readonly attempt: number,
        public readonly error: Error,
    ) {}
}
