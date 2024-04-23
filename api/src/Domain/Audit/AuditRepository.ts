import type Audit from './Audit'

export default interface AuditRepository {
  create: (audit: Audit) => Promise<Audit>

  findLatest: (page: number, numRecords: number, limit: number) => Promise<Audit[]>
}
