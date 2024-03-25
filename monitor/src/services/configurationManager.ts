import axios from 'axios'
import { type ApiConfiguration } from '../type/api/ApiConfiguration'
import { type ApiMonitor } from '../type/api/ApiMonitor'
import { type ApiServer } from '../type/api/ApiServer'

export class ConfigurationManager {
  async getAllConfigurations (): Promise<ApiConfiguration[]> {
    return (await axios.get(`${process.env.API_HOST}/api/configurations`)).data
  }

  async getMonitors (configurationId: number): Promise<ApiMonitor[]> {
    return (await axios.get(`${process.env.API_HOST}/api/configurations/${configurationId}/monitors`)).data
  }

  async getServers (id: number): Promise<ApiServer[]> {
    return (await axios.get(`${process.env.API_HOST}/api/configurations/${id}/servers`)).data
  }
}
