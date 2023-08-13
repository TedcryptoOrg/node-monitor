import { ConfigurationFactory } from './config/configurationFactory'
import { Telegram } from './AlertChannel/telegram'
import { type Configuration } from './type/configuration'
import { PriceFeeder } from './monitor/priceFeeder'
import { type AlertChannel } from './AlertChannel/alertChannel'
import { NodeMonitor } from './monitor/nodeMonitor'

require('dotenv').config({ path: '.env', override: false })

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

async function startNodeMonitor (name: string, configuration: Configuration): Promise<void> {
  console.log(`Starting ${name} node monitor...`)
  console.debug(configuration)

  try {
    await new NodeMonitor(name, configuration, alertChannels).start()
  } catch (error) {
    const message = `🚨 ${name} Node monitor failed to start!\n${error}`
    console.error(message)
  }
}

async function startPriceFeeder (name: string, configuration: Configuration): Promise<void> {
  console.log(`Starting ${name} price feeder monitor...`)

  try {
    await new PriceFeeder(name, configuration, alertChannels).start()
  } catch (error) {
    const message = `🚨 ${name} Price feeder failed to start!\n${error}`
    console.error(message)
  }
}

async function main (): Promise<void> {
  const configurations: Record<string, Configuration> = new ConfigurationFactory().loadConfigurations()
  for (const configurationName in configurations) {
    console.log(`Loaded configuration: ${configurationName}`)
    const configuration = configurations[configurationName]
    if (configuration === undefined) {
      throw new Error(`Configuration ${configurationName} not found!`)
    }

    startNodeMonitor(configurationName, configuration)
    if (Object.prototype.hasOwnProperty.call(configuration, 'priceFeeder')) {
      startPriceFeeder(configurationName, configuration)
    }
  }
}

main().catch((error) => {
  console.error('An error occurred:', error.message)
  process.exit(1)
})
