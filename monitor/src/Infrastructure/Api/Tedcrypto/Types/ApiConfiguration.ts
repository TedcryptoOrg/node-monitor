import { type ApiServer } from './ApiServer'
import { type ApiMonitor } from './ApiMonitor'
import { type ApiConfigurationNotificationChannel } from './ApiConfigurationNotificationChannel'

export interface ApiConfiguration {
  id: number
  name: string
  chain: string
  is_enabled: boolean
  createdAt: string
  updatedAt: string
  servers: ApiServer[] | undefined
  monitors: ApiMonitor[] | undefined
  notification_channels: ApiConfigurationNotificationChannel[] | undefined
}
