import {ApiMonitorInput} from "../types/ApiMonitor";
import ApiClient from "./ApiClient";

class MonitorService {
    async upsertMonitor(api: ApiClient, monitor: ApiMonitorInput): Promise<boolean | undefined> {
        const url = `/monitors${monitor.id ? `/${monitor.id}` : ''}`;

        return api?.[monitor.id ? 'put' : 'post'](url, monitor)
            .then(response => response.ok)
            .catch((error) => {
                console.error(error);
                return false;
            });
    }
}

const monitorService = new MonitorService();
export default monitorService;