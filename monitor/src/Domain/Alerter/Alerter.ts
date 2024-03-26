import Monitor from "../Monitor/Monitor";

export default interface Alerter {
    alert(monitor: Monitor, message: string): Promise<void>
    resolve(monitor: Monitor, message: string): Promise<void>
}
