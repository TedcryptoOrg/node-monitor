import * as fs from 'fs'
import * as readline from 'readline'
import * as yaml from 'yaml'
import { type Configuration } from '../src/type/configuration'

const VALID_PROVIDERS = ['kujira', 'ojo']

async function createConfigurationFile (): Promise<void> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  try {
    const configurationName = await askQuestion(rl, 'Configuration name: ')

    const configuration: Configuration = {
      chainName: await askQuestion(rl, 'Chain name, e.g.: comoshub, osmosis: '),
      valoperAddress: await askQuestion(rl, 'Your valoper address (leave empty if you don\'t want to monitor): ', (value: string) => {
        if (value === undefined || value.length === 0) {
          return undefined
        }
        return value
      })
    }

    // Create RPC configuration
    if (await askConfirmation(rl, `Do you want to monitor RPC for ${configurationName}? (Y/N): `)) {
      configuration.rpc = {
        address: await askQuestion(rl, 'RPC address[default: http://localhost:26657]: ', undefined, 'http://localhost:26657')
      }
    }

    // Create REST configuration
    if (await askConfirmation(rl, `Do you want to monitor REST for ${configurationName}? (Y/N): `)) {
      configuration.rest = {
        address: await askQuestion(rl, 'REST address[default: http://localhost:1317]: ', undefined, 'http://localhost:1317')
      }
    }

    // Create Prometheus configuration
    if (await askConfirmation(rl, `Do you want to monitor Prometheus for ${configurationName}? (Y/N): `)) {
      configuration.prometheus = {
        address: await askQuestion(rl, 'Prometheus address[default: http://localhost:26660]: ', undefined, 'http://localhost:26660')
      }
    }

    // Create block alert configuration
    if (await askConfirmation(rl, `Do you want to monitor block for ${configurationName}? (Y/N): `)) {
      if (configuration.rpc === undefined) {
        throw new Error('You need to provide a RPC endpoint to monitor block')
      }

      configuration.alerts = {
        block: {
          miss_tolerance: await askQuestion(rl, 'Number of blocks before alert (miss tolerance)[default: 5]: ', parseInt, 5),
          miss_tolerance_period_seconds: await askQuestion(rl, 'Seconds before resetting the counter (miss tolerance period)[default: 3600s (1h)]: ', parseInt, 3600),
          sleep_duration_seconds: await askQuestion(rl, 'Frequency to check (in seconds)[default: 30]: ', parseInt, 30),
          alert_sleep_duration_minutes: await askQuestion(rl, 'Don\'t alert again before x minutes [default: 5]: ', parseInt, 5),
        }
      }
    }

    // Create price feeder configuration
    if (VALID_PROVIDERS.includes(configuration.chainName) && await askConfirmation(rl, `Do you want to monitor oracle for ${configurationName}? (Y/N): `)) {
      if (configuration.valoperAddress === undefined) {
        throw new Error('You need to provide a valoper address to monitor oracle')
      }
      if (configuration.rest === undefined) {
        throw new Error('You need to provide a rest endpoint to monitor oracle')
      }

      configuration.priceFeeder = {
        miss_tolerance: await askQuestion(rl, 'Number of blocks before alert (miss tolerance)[default: 5]: ', parseFloat, 5),
        miss_tolerance_period_seconds: await askQuestion(rl, 'Seconds before resetting the counter (miss tolerance period)[default: 3600s (1h)]: ', parseInt, 3600),
        sleep_duration_seconds: await askQuestion(rl, 'Frequency to check (in seconds)[default: 5]: ', parseInt, 5),
        alert_sleep_duration_minutes: await askQuestion(rl, 'Don\'t alert again before x minutes [default: 5]: ', parseInt, 5)
      }
    }

    console.log('\nConfiguration:')
    console.log(configuration)

    if (await askConfirmation(rl, 'Is the configuration correct? (Y/N): ')) {
      const yamlContent = yaml.stringify(configuration)
      const filePath = `config/${configurationName}.yaml`
      if (fs.existsSync(filePath)) {
        if (await askConfirmation(rl, 'Configuration file already exists. Do you want to overwrite it? (Y/N): ')) {
          fs.rmSync(filePath)
        } else {
          console.log('Configuration aborted')
          return
        }
      }

      fs.writeFileSync(filePath, yamlContent)

      console.log(`Configuration file saved: ${filePath}`)
    } else {
      console.log('Configuration not saved')
    }
  } catch (error) {
    console.error('An error occurred while creating the configuration.ts file:', error)
  } finally {
    rl.close()
  }
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

createConfigurationFile()
