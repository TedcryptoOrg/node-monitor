import Configuration from "../Configuration/Configuration";

export default interface Monitor {
    id: number,
    name: string,
    configuration: Configuration,
    alertSleepDurationMinutes: number
}
