require('dotenv').config({ path: '.env', override: false })

import { Telegram } from './AlertChannel/telegram'
import { type AlertChannel } from './AlertChannel/alertChannel'
import { NodeMonitor } from './monitor/nodeMonitor'
import {ChainDirectory} from "@tedcryptoorg/cosmos-directory";
import {ConfigurationManager} from "./services/configuration/configurationManager";
import {ConfigurationOutput} from "./database/models/configuration";
import {database} from "./database/database";

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

async function startNodeMonitor (configuration: ConfigurationOutput): Promise<void> {
  console.log(`Starting ${configuration.name} node monitor...`)

  const chain = (await new ChainDirectory().getChainData(configuration.chain)).chain;

  try {
    await new NodeMonitor(configuration.name, chain, configuration, alertChannels).start()
  } catch (error) {
    const message = `🚨 ${configuration.name} Node monitor failed!\n${error}`
    console.error(message)
  }
}

async function main (): Promise<void> {
  const sequelize = database.getDatabase()

  const configurationManager = new ConfigurationManager();
  const configurations = await configurationManager.getAllConfigurations();
  if (configurations.length === 0) {
    throw new Error('No configurations found!');
  }
  configurations.forEach((configuration) => {
    console.log(`Loaded configuration: ${configuration.name}`)
    startNodeMonitor(configuration)
  })
}

main().catch((error) => {
  console.error('An error occurred:', error.message)
  process.exit(1)
})
