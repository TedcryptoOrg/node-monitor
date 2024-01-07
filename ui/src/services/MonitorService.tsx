import {ApiMonitor} from "../types/ApiMonitor";

class MonitorService {
    async upsertMonitor(monitor: ApiMonitor): Promise<boolean> {
        const url = `${process.env.REACT_APP_API_HOST}/api/monitors${monitor.id ? `/${monitor.id}` : ''}`;

        return fetch(url, {
            method: monitor.id ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(monitor),
        })
            .then(response => response.ok)
            .catch((error) => {
                console.error(error);
                return false;
            });
    }
}

const monitorService = new MonitorService();
export default monitorService;