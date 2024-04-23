import { myContainer } from '../src/Infrastructure/DependencyInjection/inversify.config'
import { type ConsoleCommand } from '../src/Domain/Console/ConsoleCommand'
import CreateUser from '../src/Ui/Console/CreateUser'

async function run (): Promise<void> {
  const args = process.argv.slice(2)
  if (args.length === 0) {
    throw new Error('Missing command to run!')
  }

  const commandArgs = args.slice(1)
  const action = args[0]

  const consoleCommands: Record<string, ConsoleCommand> = {}
  consoleCommands[CreateUser.commandName.toString()] = myContainer.get<CreateUser>(CreateUser)

  if (!consoleCommands[action]) {
    throw new Error(`Unknown action: ${action}`)
  }

  await consoleCommands[action].run(commandArgs)
}

run()
  .then(() => {
    console.log('Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Error:', error.message)
    process.exit(1)
  })
