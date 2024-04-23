import type Command from '../../../../Domain/Command/Command'

export default class UpsertUserCommand implements Command {
  constructor (
    public id: number | undefined,
    public username: string,
    public isActive: boolean,
    public isAdmin: boolean,
    public isSuperAdmin: boolean,
    public companyId: number | undefined,
    public rawPassword?: string
  ) {}
}
