import Configuration from "./Domain/Configuration/Configuration";

require('dotenv').config({ path: '.env', override: false })

import {ConfigurationManager} from "./services/configurationManager";
import {NodeExporterDiskSpaceUsageConfiguration} from "./Infrastructure/Api/Tedcrypto/Types/ApiMonitor";
import {MonitorTypeEnum} from "./Infrastructure/Api/Tedcrypto/Types/MonitorTypeEnum";
import DiskSpaceChecker from "./Application/Monitor/Check/CheckDiskSpace/DiskSpaceChecker";
import {myContainer} from "./Infrastructure/DependencyInjection/inversify.config";
import CommandHandlerManager from "./Infrastructure/CommandHandler/CommandHandlerManager";
import DiskSpaceCheckMonitor from "./Domain/Monitor/DiskSpaceCheckMonitor";
import Server from "./Domain/Server/Server";
import CheckState from "./Application/Monitor/Check/CheckState";
import {CheckStatus} from "./Domain/Checker/CheckStatusEnum";

async function main (): Promise<void> {
  const configurationManager = new ConfigurationManager();

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

    const liveMonitors = [];
    for(const monitor of monitors) {
      if (monitor.type === MonitorTypeEnum.NODE_EXPORTER_DISK_SPACE) {
        if (monitor.server === undefined) {
          throw Error(`Monitor ${monitor.name} has no server associated with it`)
        }

        // TODO: bug here, configuration object should not be parsed twice
        // https://trello.com/c/niqWP4wh/39-configuration-object-needs-to-be-parsed-twice-in-monitor-after-prisma-changes
        const monitorConfig = JSON.parse(JSON.parse(monitor.configuration_object)) as NodeExporterDiskSpaceUsageConfiguration;
        liveMonitors.push(new DiskSpaceChecker(
            myContainer.get(CommandHandlerManager),
            new DiskSpaceCheckMonitor(
                Number(monitor.id),
                new Configuration(configuration.id, configuration.name),
                monitor.name,
                new Server(Number(monitor.server.id), monitor.server.name, monitor.server.name),
                monitorConfig.threshold,
                monitorConfig.alert_sleep_duration_minutes,
                monitorConfig.check_interval_seconds,
                60
            ),
            new CheckState(CheckStatus.UNKNOWN, 0, 0)
        ))
      }
    }

    for (const monitor of liveMonitors) {
      monitor.check();
    }
  }
}

main().catch((error) => {
  console.error('An error occurred:', error.message)
  process.exit(1)
})
