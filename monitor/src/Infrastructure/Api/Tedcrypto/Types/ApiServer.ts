import { type ApiConfiguration } from './ApiConfiguration'
import { type ApiService } from './ApiService'

export interface ApiServerInput {
  name: string
  address: string
  is_enabled: boolean
  configuration_id: number
}

export interface ApiServer {
  id?: number
  name: string
  address: string
  is_enabled: boolean
  configuration: ApiConfiguration
  services: ApiService[]
  created_at?: string
  updated_at?: string
}
