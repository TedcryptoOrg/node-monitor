import { ConsoleCommand } from '../../Domain/Console/ConsoleCommand'
import { inject, injectable } from 'inversify'
import CommandHandlerManager from '../../Infrastructure/CommandHandler/CommandHandlerManager'
import UpsertUserCommand from '../../Application/Write/User/UpsertUser/UpsertUserCommand'

@injectable()
export default class CreateUser implements ConsoleCommand {
  public static commandName = 'create-user'

  constructor (
    @inject(CommandHandlerManager) private readonly commandHandlerManager: CommandHandlerManager
  ) {
  }

  configureArgs (inputArgs: any): void {
  }

  public async run (inputArgs: any): Promise<number> {
    const username = inputArgs[0]
    const isActive = inputArgs[1] === 'true'
    const isAdmin = inputArgs[2] === 'true'
    const isSuperAdmin = inputArgs[3] === 'true'
    const rawPassword = inputArgs[4]

    await this.commandHandlerManager.handle(
      new UpsertUserCommand(
        undefined,
        username,
        isActive,
        isAdmin,
        isSuperAdmin,
        undefined,
        rawPassword
      )
    )

    return 0
  }
}
