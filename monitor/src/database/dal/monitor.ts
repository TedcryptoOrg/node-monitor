import Monitor , {MonitorInput, MonitorOutput} from "../models/monitor";

export const create = async (monitorInput: MonitorInput): Promise<MonitorOutput> => {
    return await Monitor.create(monitorInput)
}

export const getAll = async (): Promise<MonitorOutput[]> => {
    return await Monitor.findAll()
}
