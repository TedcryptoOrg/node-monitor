import type Command from '../../../Domain/Command/Command'
import type Server from '../../../Domain/Server/Server'

export default class CheckDiskSpaceCommand implements Command {
  constructor (
    public readonly messagePrefix: string,
    public readonly server: Server,
    public readonly threshold: number
  ) {
  }
}
