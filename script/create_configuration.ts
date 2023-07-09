import * as fs from 'fs';
import * as readline from 'readline';
import * as yaml from 'yaml';
import {Configuration} from '../src/type/configuration';
import {CryptoTools} from "../src/crypto/crypto_tools";
import _default from "jest-circus";

const VALID_PROVIDERS = ['kujira', 'ojo'];

async function createConfigurationFile(): Promise<void> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    try {
        const configuration: Configuration = {
            miss_tolerance: await askQuestion(rl, 'Number of blocks before alert (miss tolerance)[default: 5]: ', parseFloat, 5),
            miss_tolerance_period: await askQuestion(rl, 'Seconds before resetting the counter (miss tolerance period)[default: 3600s (1h)]: ', parseInt, 3600),
            sleep_duration: await askQuestion(rl, 'Frequency to check (in seconds)[default: 5]: ', parseInt, 5),
            alert_sleep_duration: await askQuestion(rl, 'Don\'t alert again before x minutes [default: 5]: ', parseInt, 5),
            node_rest: await askQuestion(rl, 'Rest endpoint[default: http://localhost:1317]: ', undefined, 'http://localhost:1317'),
            valoper_address: await askQuestion(rl, 'Your valoper address: '),
        };

        const providerName = new CryptoTools().getChainFromBech32Address(configuration.valoper_address);
        if (providerName === null) {
            throw new Error('Invalid valoper address');
        }

        if (!VALID_PROVIDERS.includes(providerName)) {
            throw new Error(`Invalid choice "${providerName}". Please select one of the options: ${VALID_PROVIDERS.join(', ')}`);
        }

        console.log('\nConfiguration:');
        console.log(configuration);

        if (await askConfirmation(rl, 'Is the configuration correct? (Y/N): ')) {
            const yamlContent = yaml.stringify(configuration);
            const filePath = `config/price_feeders/${providerName}.yaml`;
            if (fs.existsSync(filePath)) {
                if (await askConfirmation(rl, 'Configuration file already exists. Do you want to overwrite it? (Y/N): ')) {
                    fs.rmSync(filePath);
                } else {
                    console.log('Configuration aborted');
                    return;
                }
            }

            fs.writeFileSync(filePath, yamlContent);

            console.log(`Configuration file saved: ${filePath}`);
        } else {
            console.log('Configuration not saved');
        }
    } catch (error) {
        console.error('An error occurred while creating the configuration.ts file:', error);
    } finally {
        rl.close();
    }
}

function askQuestion<T>(rl: readline.Interface, question: string, parseFn?: (value: string) => T, _default?: T): Promise<T> {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            if (_default && answer === '') {
                resolve(_default);
            }
            if (parseFn) {
                resolve(parseFn(answer));
            } else {
                // @ts-ignore
                resolve(answer);
            }
        });
    });
}

function askConfirmation(rl: readline.Interface, question: string): Promise<boolean> {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            const normalizedAnswer = answer.trim().toLowerCase();
            resolve(normalizedAnswer === 'y' || normalizedAnswer === 'yes');
        });
    });
}

createConfigurationFile();