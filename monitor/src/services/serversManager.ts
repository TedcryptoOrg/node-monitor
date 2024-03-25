import { type ApiServer } from '../Infrastructure/Api/Tedcrypto/Types/ApiServer'
import { type ApiService } from '../Infrastructure/Api/Tedcrypto/Types/ApiService'
import axios from 'axios'

export class ServersManager {
  async getServices (server: ApiServer): Promise<ApiService[]> {
    return (await axios.get(`${process.env.API_HOST}/api/servers/${server.id}/services`)).data
  }
}
