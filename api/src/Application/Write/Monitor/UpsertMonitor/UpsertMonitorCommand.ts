import type Command from '../../../../Domain/Command/Command'
import type { MonitorType } from '../../../../Domain/Monitor/MonitorType'

export default class UpsertMonitorCommand implements Command {
  constructor (
    public readonly name: string,
    public readonly type: MonitorType,
    public readonly isEnabled: boolean,
    public readonly configurationId: number | undefined,
    public readonly configurationObject: string,
    public readonly serverId?: number,
    public readonly lastCheck?: Date,
    public readonly status?: boolean,
    public readonly lastError?: string,
    public readonly id?: number
  ) {}
}
