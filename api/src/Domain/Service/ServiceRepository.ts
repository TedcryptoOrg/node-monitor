import type Service from './Service'

export interface FindAllCriteria {
  server_id?: number
}

export default interface ServiceRepository {
  get: (id: number) => Promise<Service>

  findAll: (criteria?: FindAllCriteria) => Promise<Service[]>

  upsert: (service: Service) => Promise<Service>

  delete: (id: number) => Promise<void>

}
