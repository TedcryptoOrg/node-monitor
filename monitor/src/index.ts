import CommandHandlerManager from "./Infrastructure/CommandHandler/CommandHandlerManager";

require('dotenv').config({ path: '.env', override: false })

import {myContainer} from "./Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "./Domain/DependencyInjection/types";
import ApiClient from "./Domain/ApiClient";
import RunCheckCommand from "./Application/Monitor/RunCheck/RunCheckCommand";

async function main (): Promise<void> {
  console.log('Booting up monitor...')

  const commandHandler = myContainer.get(CommandHandlerManager)
  const configurations = await myContainer.get<ApiClient>(TYPES.ApiClient).getConfigurations();
  if (configurations.length === 0) {
    throw new Error('No configurations found!');
  }
  for (const configuration of configurations) {
    if (!configuration.isEnabled) {
        console.warn(`❌️[${configuration.name}] Configuration is disabled. Skipping...`)
        continue
    }

    console.log(`Loaded configuration: ${configuration.name}`)
    if (configuration.monitors.length === 0) {
      console.warn(`No monitors found for configuration: ${configuration.name}`)
      continue
    }

    for (const monitor of configuration.monitors) {
      commandHandler.handle(new RunCheckCommand(monitor))
    }
  }
}

main().catch((error) => {
  console.error('An error occurred:', error.message)
  process.exit(1)
})
