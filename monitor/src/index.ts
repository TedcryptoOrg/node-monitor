import Configuration from "./Domain/Configuration/Configuration";

require('dotenv').config({ path: '.env', override: false })

import {myContainer} from "./Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "./Domain/DependencyInjection/types";
import ApiClient from "./Domain/ApiClient";
import MonitorManager from "./Application/Monitor/MonitorManager";

async function main (): Promise<void> {
  console.log('Booting up monitor...')

  const monitorManager = myContainer.get(MonitorManager)
  let configurations: Configuration[] = []
  try {
    configurations = await myContainer.get<ApiClient>(TYPES.ApiClient).getConfigurations();
  } catch (error) {
    console.error('Failed to get configurations:', error)
    process.exit(1)
  }

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
      console.log(`${monitor.getFullName()} loaded`)
      monitorManager.pushMonitor(monitor)
    }
  }

  monitorManager.run()
}

main().catch((error) => {
  console.error('An error occurred:', error.message)
  process.exit(1)
})
