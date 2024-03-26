import Monitor from "../Monitor/Monitor";

export default interface Checker {

    toArray(): object

    check(monitor: Monitor): Promise<void>;
}
