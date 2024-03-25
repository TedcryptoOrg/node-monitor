import axios from "axios";
import {sleep} from "../Application/Shared/sleep";

export async function pingMonitor(
    id: number,
    params: { last_error?: string|null; status: boolean }
): Promise<void> {
    try {
        await axios.post(`${process.env.API_HOST}/api/monitors/${id}/ping`, params);
    } catch (exception: any) {
        console.error(`Error while pinging monitor ${id}: ${exception.message}`);
        await sleep(500);
        await pingMonitor(id, params);
    }
}
