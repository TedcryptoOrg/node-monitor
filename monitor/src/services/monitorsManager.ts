import axios from "axios";

export async function pingMonitor(id: number, params: { last_error?: string|null; status: boolean }): Promise<void> {
    await axios.post(`${process.env.API_HOST}/api/monitors/${id}/ping`, params);
}