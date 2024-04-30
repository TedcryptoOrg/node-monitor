import Configuration from "./Domain/Configuration/Configuration";

require('dotenv').config({ path: '.env', override: false })

import {myContainer} from "./Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "./Domain/DependencyInjection/types";
import ApiClient from "./Domain/ApiClient";
import MonitorManager from "./Application/Monitor/MonitorManager";
import Logger from "./Application/Logger/Logger";

const logger = myContainer.get<Logger>(TYPES.Logger)

async function main (): Promise<void> {
  logger.log('Booting up monitor...')

  const monitorManager = myContainer.get(MonitorManager)
  let configurations: Configuration[] = []
  configurations = await myContainer.get<ApiClient>(TYPES.ApiClient).getConfigurations();
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

setInterval(() => {
  const memoryUsage = process.memoryUsage();
  logger.log(
      `==Memory usage==\n`
      +`Heap Total: ${Math.round(memoryUsage.heapTotal / 1024 / 1024 * 100) / 100} MB\n`
      +`Heap Used: ${Math.round(memoryUsage.heapUsed / 1024 / 1024 * 100) / 100} MB\n`
      +`RSS: ${Math.round(memoryUsage.rss / 1024 / 1024 * 100) / 100} MB`,
      {memoryUsage}
  );
}, 1000 * 60 * 5)

main().catch((error) => {
  logger.error(`An error occurred: ${error.message}}`, {error})
  process.exit(1)
})
