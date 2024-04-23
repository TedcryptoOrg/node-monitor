import type Monitor from './Monitor'

export interface MonitorFindAllProps {
  configuration_id?: number
  server_id?: number
}

export default interface MonitorRepository {
  /**
     * @throws RecordNotFound
     */
  get: (id: number) => Promise<Monitor>

  upsert: (monitor: Monitor) => Promise<Monitor>

  delete: (id: number) => Promise<void>

  findAll: (criteria?: MonitorFindAllProps) => Promise<Monitor[]>

  findFailed: (limit: number, offset: number) => Promise<Monitor[]>

  findWarnings: (limit: number, offset: number) => Promise<Monitor[]>
}
