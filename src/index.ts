import { ConfigurationFactory } from './config/configurationFactory'
import { Telegram } from './AlertChannel/telegram'
import { type Configuration } from './type/configuration'
import { PriceFeeder } from './monitor/priceFeeder'

require('dotenv').config({ path: '.env', override: false })

const telegram = new Telegram({
  botId: process.env.TELEGRAM_BOT_ID ?? '',
  token: process.env.TELEGRAM_TOKEN ?? '',
  chatId: process.env.TELEGRAM_CHAT_ID ?? ''
})

async function startPriceFeeder (name: string, configuration: Configuration): Promise<void> {
  console.log(`Starting ${name} price feeder monitor...`)
  if (configuration.priceFeeder === undefined) {
    throw new Error(`Configuration ${name} does not have a price feeder configured!`)
  }

  try {
    await new PriceFeeder(name, configuration.priceFeeder, [telegram]).start()
  } catch (error) {
    const message = `🚨 ${name} Price feeder failed to start!\n${error}`
    try {
      await telegram.alert(message)
    } catch (error: any) {
      console.error('Failed to send Telegram alert!')
    }

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

    if (Object.prototype.hasOwnProperty.call(configuration, 'priceFeeder')) {
      startPriceFeeder(configurationName, configuration)
    }
  }
}

main().catch((error) => {
  console.error('An error occurred:', error.message)
  process.exit(1)
})
