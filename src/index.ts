import {ConfigurationFactory} from "./config/configuration_factory";
import {Kujira} from "./monitor/kujira";
import {Configuration} from "./type/configuration";
import {Ojo} from "./monitor/ojo";
import {Telegram} from "./alerter/telegram";

require('dotenv').config({path: '.env', override: false});

const telegram = new Telegram({
    botId: process.env.TELEGRAM_BOT_ID ?? '',
    token: process.env.TELEGRAM_TOKEN ?? '',
    chatId: process.env.TELEGRAM_CHAT_ID ?? ''
});

async function startKujira(configuration: Configuration): Promise<void> {
    console.log('Starting kujira client...');
    try {
        await new Kujira(configuration, [telegram]).start();
    } catch (error) {
        const message = '🚨 Kujira Price feeder monitor alert!\n ' + error;
        try {
            await telegram.alert(message);
        } catch (error: any) {
            console.error('Failed to send Telegram alert!');
        }
        console.error(message);

        // Retry in 5 minutes
        setTimeout(startKujira, 5 * 60 * 1000);
    }
}

async function startOjo(configuration: Configuration): Promise<void> {
    console.log('Starting Ojo client...');
    try {
        await new Ojo(configuration, [telegram]).start();
    } catch (error) {
        const message = '🚨 Ojo Price feeder monitor alert!\n ' + error;
        try {
            await telegram.alert(message);
        } catch (error: any) {
            console.error('Failed to send Telegram alert!');
        }
        console.error(message);

        // Retry in 5 minutes
        setTimeout(startOjo, 5 * 60 * 1000);
    }
}

export async function main(): Promise<void> {
    const configurations: {[key: string]: Configuration} = new ConfigurationFactory().loadConfigurations();
    if (configurations.kujira) {
        await startKujira(configurations.kujira);
    }
    if (configurations.ojo) {
        await startOjo(configurations.ojo);
    }
}

main().catch((error) => {
    console.error('An error occurred:', error.message);
    process.exit(1);
});