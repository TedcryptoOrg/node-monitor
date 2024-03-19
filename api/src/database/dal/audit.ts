import {Audit, AuditInput, AuditOutput} from '../models/audit'

export const create = async (audit: AuditInput): Promise<AuditOutput> => {
    return await Audit.create(audit)
}

export const findLatest = async (page: number, numRecords: number, limit: number): Promise<AuditOutput[]> => {
    return await Audit.findAll({
        limit: limit,
        offset: (page - 1) * numRecords,
        order: [['created_at', 'DESC']]
    })
}
