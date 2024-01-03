import {ApiConfiguration} from "./type/api/ApiConfiguration";

require('dotenv').config({ path: '.env', override: false })

import { Telegram } from './AlertChannel/telegram'
import { type AlertChannel } from './AlertChannel/alertChannel'
import { NodeMonitor } from './monitor/nodeMonitor'
import {ChainDirectory} from "@tedcryptoorg/cosmos-directory";
import {ConfigurationManager} from "./services/configurationManager";
import {ApiMonitor} from "./type/api/ApiMonitor";
import {sleep} from "./util/sleep";

const alertChannels: AlertChannel[] = []
if (
  process.env.TELEGRAM_BOT_ID !== undefined &&
    process.env.TELEGRAM_TOKEN !== undefined &&
    process.env.TELEGRAM_CHAT_ID !== undefined
) {
  alertChannels.push(new Telegram({
    botId: process.env.TELEGRAM_BOT_ID,
    token: process.env.TELEGRAM_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID
  }))
}

async function startNodeMonitor (configuration: ApiConfiguration, monitors: ApiMonitor[]): Promise<void> {
  console.log(`Starting ${configuration.name} node monitor with ${monitors.length} monitors...`)

  try {
    const chain = (await new ChainDirectory().getChainData(configuration.chain)).chain;

    await new NodeMonitor(
        configuration.name,
        chain,
        configuration,
        monitors,
        alertChannels
    ).start()
  } catch (error) {
    const message = `🚨 ${configuration.name} Node monitor failed!\n${error}`
    console.error(message)
  }
}

async function main (): Promise<void> {
  if (alertChannels.length === 0) {
    console.warn('No alert channels configured. Please configure at least one alert channel. Continuing in 10 seconds...')
    await sleep(10000);
  }

  const configurationManager = new ConfigurationManager();
  const configurations = await configurationManager.getAllConfigurations();
  if (configurations.length === 0) {
    throw new Error('No configurations found!');
  }
  for (const configuration of configurations) {
    console.log(`Loaded configuration: ${configuration.name}`)
    const monitors = await configurationManager.getMonitors(configuration.id);
    if (monitors.length === 0) {
      console.warn(`No monitors found for configuration: ${configuration.name}`)
      continue
    }

    startNodeMonitor(configuration, monitors);
  }
}

main().catch((error) => {
  console.error('An error occurred:', error.message)
  process.exit(1)
})
