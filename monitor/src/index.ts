import Configuration from "./Domain/Configuration/Configuration";

require('dotenv').config({ path: '.env', override: false })

import {myContainer} from "./Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "./Domain/DependencyInjection/types";
import ApiClient from "./Domain/ApiClient";
import MonitorManager from "./Application/Monitor/MonitorManager";
import Logger from "./Application/Logger/Logger";

async function main (): Promise<void> {
  const logger = myContainer.get<Logger>(TYPES.Logger)
  logger.log('Booting up monitor...')

  const monitorManager = myContainer.get(MonitorManager)
  let configurations: Configuration[] = []
  try {
    configurations = await myContainer.get<ApiClient>(TYPES.ApiClient).getConfigurations();
  } catch (error) {
    logger.error('Failed to get configurations:', {error})
    process.exit(1)
  }

  if (configurations.length === 0) {
    throw new Error('No configurations found!');
  }
  for (const configuration of configurations) {
    if (!configuration.isEnabled) {
        logger.warn(`❌️[${configuration.name}] Configuration is disabled. Skipping...`, {configurationId: configuration.id})
        continue
    }

    logger.log(`Loaded configuration: ${configuration.name}`, {configurationId: configuration.id})
    if (configuration.monitors.length === 0) {
      logger.warn(`No monitors found for configuration: ${configuration.name}`, {configurationId: configuration.id})
      continue
    }

    for (const monitor of configuration.monitors) {
      logger.log(`${monitor.getFullName()} loaded`, {configurationId: configuration.id, monitorId: monitor.id})
      monitorManager.pushMonitor(monitor)
    }
  }

  monitorManager.run()
}

main().catch((error) => {
  console.error('An error occurred:', error.message)
  myContainer.get<Logger>(TYPES.Logger).error('An error occurred:', error.message)
  process.exit(1)
})
