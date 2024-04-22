import Monitor from "../../../Domain/Monitor/Monitor";

export default class MonitorUpdated {
    constructor(
        public readonly monitor: Monitor,
    ) {
    }
}
