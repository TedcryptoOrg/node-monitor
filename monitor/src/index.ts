import NotificationChannelManager from "./services/NotificationChannelManager";

require('dotenv').config({ path: '.env', override: false })

import {ApiConfiguration} from "./type/api/ApiConfiguration";
import { NodeMonitor } from './monitor/nodeMonitor'
import {ChainDirectory} from "@tedcryptoorg/cosmos-directory";
import {ConfigurationManager} from "./services/configurationManager";
import {ApiMonitor} from "./type/api/ApiMonitor";
import {ServersManager} from "./services/serversManager";
import {ApiService} from "./type/api/ApiService";
const axios = require('axios').default;

async function setupHealthCheckPing(): Promise<void> {
  if (process.env.HEALTH_CHECK_URL === undefined) {
    console.warn('Health check url not set. Skipping health check ping setup.')
    return;
  }

  setInterval(async () => {
    try {
      await axios.get(`${process.env.HEALTHCHECK_URL}/ping`);
    } catch (error) {
      console.error('Health check ping failed', error);
    }
  }, parseInt(process.env.HEALTHCHECK_INTERVAL_MS ?? '60000'));
}

async function startNodeMonitor (configuration: ApiConfiguration, monitors: ApiMonitor[], services: ApiService[]): Promise<void> {
  console.log(
    `Starting ${configuration.name}. \n\n` +
    `Monitors: \n -${monitors.map(monitor => monitor.name).join('\n -')}\n\n`+
    `Services: \n -${services.map(service => service.name).join('\n -')}`)

  try {
    const chain = (await new ChainDirectory().getChainData(configuration.chain)).chain;

    await new NodeMonitor(
        configuration,
        chain,
        monitors,
        services,
        await NotificationChannelManager.getConfigurationNotificationChannels(configuration)
    ).start()
  } catch (error) {
    const message = `🚨 ${configuration.name} Node monitor failed!\n${error}`
    console.error(message)
  }
}

async function main (): Promise<void> {
  const configurationManager = new ConfigurationManager();
  const serversManager = new ServersManager();

  const configurations = await configurationManager.getAllConfigurations();
  if (configurations.length === 0) {
    throw new Error('No configurations found!');
  }
  for (const configuration of configurations) {
    if (!configuration.is_enabled) {
        console.warn(`❌️[${configuration.name}] Configuration is disabled. Skipping...`)
        continue
    }

    console.log(`Loaded configuration: ${configuration.name}`)
    const monitors = await configurationManager.getMonitors(configuration.id);
    if (monitors.length === 0) {
      console.warn(`No monitors found for configuration: ${configuration.name}`)
      continue
    }
    const servers = await configurationManager.getServers(configuration.id);
    const services: ApiService[] = [];
    for (const server of servers) {
      services.push(...await serversManager.getServices(server));
    }

    startNodeMonitor(configuration, monitors, services);
    setupHealthCheckPing();
  }
}

main().catch((error) => {
  console.error('An error occurred:', error.message)
  process.exit(1)
})
