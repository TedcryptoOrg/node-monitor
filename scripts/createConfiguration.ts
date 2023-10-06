import * as readline from 'readline'
import { create as createConfiguration, getAll as getAllConfigurations } from '../src/database/dal/configuration'
import { create as createServerModel } from '../src/database/dal/server'
import { create as createServiceModel } from '../src/database/dal/service'
import { create as createMonitorModel } from '../src/database/dal/monitor'
import { type ConfigurationOutput } from '../src/database/models/configuration'
import { type ServerOutput } from '../src/database/models/server'
import { monitorTypes } from '../src/database/models/monitor'
import { type UrlCheckConfiguration } from '../src/type/config/urlCheckConfiguration'
import { type NodeExporterDiskSpaceUsageConfiguration } from '../src/type/config/nodeExporterDiskSpaceUsageConfiguration'
import { type PriceFeederMissCountConfiguration } from '../src/type/config/priceFeederMissCountConfiguration'
import { type BlockAlertConfiguration } from '../src/type/config/blockAlertConfiguration'
import { type SignMissCheckConfiguration } from '../src/type/config/signMissCheckConfiguration'
import { SERVICE_TYPES } from '../src/database/models/service'

require('dotenv').config({ path: '.env', override: false })

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

async function menu (): Promise<void> {
  const choice = await askChoice(rl, 'What do you want to do: ', {
    0: 'Show existing configurations',
    1: 'Create configuration'
  })
  switch (choice) {
    case '0': {
      await show()
      break
    }
    case '1': {
      await createNew()
      break
    }
  }
}

async function show (): Promise<void> {
  try {
    const configurations = await getAllConfigurations()
    if (configurations.length === 0) {
      console.log('No configurations found')
      return
    }
    let choices: Record<string, string> = {}
    for (const configuration of configurations) {
      choices[configuration.id] = configuration.name
    }

    const configurationId = await askChoice(rl, 'What configuration do you want to show details: ', choices)

    const selectedConfiguration = configurations.find((configuration) => configuration.id === Number(configurationId))
    if (selectedConfiguration === undefined) {
      throw new Error('Invalid configuration id')
    }

    if (await askConfirmation(rl, 'Do you want to show/create servers for this configuration?')) {
      const servers = await selectedConfiguration.getServers()
      choices = {}
      for (const server of servers) {
        choices[server.id] = server.name
      }

      choices.new = 'Create new server'

      const serverId = await askChoice(rl, 'What server do you want to update: ', choices)
      if (serverId === 'new') {
        await createServer(rl, selectedConfiguration)
      }
    }
  } catch (error) {
    console.error('An error occurred while updating configurations:', error)
  } finally {
    rl.close()
  }
}

async function createNew (): Promise<void> {
  try {
    const configuration = await createConfiguration({
      name: await askQuestion(rl, 'Configuration name: '),
      chain: await askQuestion(rl, 'Chain name, e.g.: comoshub, osmosis: '),
      is_enabled: true
    })

    console.log(`Configuration ${configuration.name} created! Id: ${configuration.id}`)

    await createServer(rl, configuration)
    await createMonitors(rl, configuration)
  } catch (error) {
    console.error('An error occurred while creating the configuration:', error)
  } finally {
    rl.close()
  }
}

async function createServer (rl: readline.Interface, configuration: ConfigurationOutput): Promise<void> {
  while (await askConfirmation(rl, 'Do you wanna create a server for this configuration? [Y/N]: ')) {
    const server = await createServerModel({
      name: await askQuestion(rl, 'Server name, e.g.: Node 1 (1.1.1.1): '),
      address: await askQuestion(rl, 'Ip of the server, e.g.: 127.0.0.1: '),
      is_enabled: true,
      configuration_id: configuration.id
    })

    console.log('Server created!')

    await createServices(rl, server)
  }
}

async function createServices (rl: readline.Interface, server: ServerOutput): Promise<void> {
  while (await askConfirmation(rl, 'Do you want to create a service that you run on this server? [Y/N]: ')) {
    rl.setPrompt(server.address)
    const address: string = await askQuestion(rl, 'Address to access service, e.g.: http://localhost:1317: ')
    const service = await createServiceModel({
      name: await askQuestion(rl, 'Name of the service, e.g.: REST/RPC/Prometheus/NodeExporter: '),
      type: await askChoice(rl, 'Type of the service: ', SERVICE_TYPES),
      address,
      is_enabled: true,
      server_id: server.id
    })

    console.log(`Service ${service.name} created! Id: ${service.id}`)

    if (await askConfirmation(rl, 'Do you want to monitor this service aliveness? [Y/N]: ')) {
      rl.setPrompt('Check ' + service.name)

      const monitor = await createMonitorModel({
        name: service.name,
        is_enabled: true,
        type: monitorTypes.urlCheck.name,
        configuration_id: server.configuration_id,
        configuration_object: JSON.stringify({
          address: service.address
        })
      })

      console.log(`Monitor ${monitor.name} created! Id: ${monitor.id}`)
    }
  }
}

async function createMonitors (rl: readline.Interface, configuration: ConfigurationOutput): Promise<void> {
  const typeValues = Object.values(monitorTypes)
  const typeKeys = typeValues.map((value) => {
    return value.name
  })
  const choices: Record<string, string> = {}
  typeKeys.forEach((typeKey, index) => {
    choices[typeKey] = typeValues[index].description
  })

  while (await askConfirmation(rl, 'Do you want to create a custom monitor for this configuration? [Y/N]: ')) {
    const typeIdx = await askChoice(rl, 'What type is this monitor: ', choices)
    const monitorType = typeKeys[Number(typeIdx)]
    const monitorName: string = await askQuestion(rl, 'Monitor name: ')

    let monitorConfigurationJson: string

    switch (monitorType) {
      case monitorTypes.urlCheck.name: {
        const configuration: UrlCheckConfiguration = {
          name: monitorName,
          address: await askQuestion(rl, 'Full address (including protocol and port), e.g.: http://localhost:1317: ')
        }

        monitorConfigurationJson = JSON.stringify(configuration)

        break
      }
      case monitorTypes.blockCheck.name: {
        const configuration: BlockAlertConfiguration = {
          miss_tolerance: await askQuestion(rl, 'Number of blocks before alert (miss tolerance)[default: 5]: ', parseInt, 5),
          miss_tolerance_period_seconds: await askQuestion(rl, 'Seconds before resetting the counter (miss tolerance period)[default: 3600s (1h)]: ', parseInt, 3600),
          sleep_duration_seconds: await askQuestion(rl, 'Frequency to check (in seconds)[default: 30]: ', parseInt, 30),
          alert_sleep_duration_minutes: await askQuestion(rl, 'Don\'t alert again before x minutes [default: 5]: ', parseInt, 5),
          rpc: await askQuestion(rl, 'Full address (including protocol and port), we need REST or RPC to work... [default: http://localhost:26657]: ', undefined, 'http://localhost:26657')
        }

        monitorConfigurationJson = JSON.stringify(configuration)

        break
      }
      case monitorTypes.signMissCheck.name: {
        const configuration: SignMissCheckConfiguration = {
          miss_tolerance: await askQuestion(rl, 'Number of blocks before alert (miss tolerance)[default: 5]: ', parseInt, 5),
          miss_tolerance_period_seconds: await askQuestion(rl, 'Seconds before resetting the counter (miss tolerance period)[default: 3600s (1h)]: ', parseInt, 3600),
          sleep_duration_seconds: await askQuestion(rl, 'Frequency to check (in seconds)[default: 30]: ', parseInt, 30),
          alert_sleep_duration_minutes: await askQuestion(rl, 'Don\'t alert again before x minutes [default: 5]: ', parseInt, 5),
          valoper_address: await askQuestion(rl, 'Validator address to check: '),
          rest: await askQuestion(rl, 'Full address (including protocol and port), we need REST or RPC to work... [default: http://localhost:26657]: ', undefined, 'http://localhost:26657'),
          rpc: await askQuestion(rl, 'Full address (including protocol and port), we need REST or RPC to work... [default: http://localhost:26657]: ', undefined, 'http://localhost:26657')
        }

        monitorConfigurationJson = JSON.stringify(configuration)

        break
      }
      case monitorTypes.nodeExporterDiskSpace.name: {
        const configuration: NodeExporterDiskSpaceUsageConfiguration = {
          address: await askQuestion(rl, 'Full address (including protocol and port)[default: http://localhost:9100/metrics]: ', undefined, 'http://localhost:9100/metrics'),
          threshold: await askQuestion(rl, 'Disk space threshold (in %)[default: 80]: ', parseInt, 80),
          check_interval_seconds: await askQuestion(rl, 'Frequency to check (in seconds)[default: 60]: ', parseInt, 60),
          alert_sleep_duration_minutes: await askQuestion(rl, 'Don\'t alert again before x minutes [default: 10]: ', parseInt, 10)
        }

        monitorConfigurationJson = JSON.stringify(configuration)

        break
      }
      case monitorTypes.priceFeederMissCount.name: {
        const configuration: PriceFeederMissCountConfiguration = {
          miss_tolerance: await askQuestion(rl, 'Number of blocks before alert (miss tolerance)[default: 5]: ', parseFloat, 5),
          miss_tolerance_period_seconds: await askQuestion(rl, 'Seconds before resetting the counter (miss tolerance period)[default: 3600s (1h)]: ', parseInt, 3600),
          sleep_duration_seconds: await askQuestion(rl, 'Frequency to check (in seconds)[default: 5]: ', parseInt, 5),
          alert_sleep_duration_minutes: await askQuestion(rl, 'Don\'t alert again before x minutes [default: 5]: ', parseInt, 5),
          valoper_address: await askQuestion(rl, 'Validator address to check: '),
          rest_address: await askQuestion(rl, 'Full address (including protocol and port)[default: http://localhost:1317]: ', undefined, 'http://localhost:1317')
        }

        monitorConfigurationJson = JSON.stringify(configuration)

        break
      }
      default: throw new Error(`Invalid monitor type "${monitorType}"`)
    }

    await createMonitorModel({
      name: monitorName,
      is_enabled: true,
      type: monitorTypes.urlCheck.name,
      configuration_id: configuration.id,
      configuration_object: monitorConfigurationJson
    })

    console.log('Monitor created!')
  }
}

async function askChoice (rl: readline.Interface, question: string, choices: object, _default?: string): Promise<string> {
  let choicesMessage = 'Choices: \n'
  const choiceKeys = Object.keys(choices)
  const choiceValues = Object.values(choices)
  choiceValues.forEach((value: any, index: number) => {
    choicesMessage += `[${index}] ${value}\n`
  })

  let choiceId: undefined | number

  while (choiceId === undefined || !Object.prototype.hasOwnProperty.call(choiceKeys, choiceId)) {
    rl.write((choicesMessage))

    choiceId = await askQuestion(rl, question)
  }

  return choiceKeys[choiceId]
}

async function askQuestion<T> (rl: readline.Interface, question: string, parseFn?: (value: string) => T, _default?: T): Promise<T> {
  return await new Promise((resolve) => {
    rl.question(question, (answer) => {
      if (_default && answer === '') {
        resolve(_default)
      }
      if (parseFn) {
        resolve(parseFn(answer))
      } else {
        // @ts-expect-error answer template
        resolve(answer)
      }
    })
  })
}

async function askConfirmation (rl: readline.Interface, question: string): Promise<boolean> {
  return await new Promise((resolve) => {
    rl.question(question, (answer) => {
      const normalizedAnswer = answer.trim().toLowerCase()
      resolve(normalizedAnswer === 'y' || normalizedAnswer === 'yes')
    })
  })
}

menu()
