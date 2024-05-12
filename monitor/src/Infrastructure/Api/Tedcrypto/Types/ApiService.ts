import { type ServiceTypeEnum } from './ServiceTypeEnum'

export interface ApiService {
  id?: number
  name: string
  address: string
  is_enabled: boolean
  type: ServiceTypeEnum
  server_id: number
}
