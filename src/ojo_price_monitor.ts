import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';

require('dotenv').config();

const telegramBotId = process.env.TELEGRAM_BOT_ID;
const telegramToken = process.env.TELEGRAM_TOKEN;
const telegramChat = process.env.TELEGRAM_CHAT;
const missTolerance = parseInt(process.env.MISS_TOLERANCE!);
const missTolerancePeriod = parseInt(process.env.MISS_TOLERANCE_PERIOD!);
const sleepDuration = parseInt(process.env.SLEEP!);
const alertSleepDuration = parseInt(process.env.ALERT_SLEEP_PERIOD);
const rpc = process.env.RPC;
const valoper = process.env.VALOPER_ADDRESS;

const endpointURL = `${rpc}/ojo/oracle/v1/validators/${valoper}/miss`;

async function fetchMissCounter(): Promise<number> {
    try {
        const response = await axios.get(endpointURL!);
        return response.data.miss_counter;
    } catch (error) {
        throw new Error('Error fetching miss counter');
    }
}

async function main(): Promise<void> {
    let previousMissCounter = await fetchMissCounter();
    let previousTimestamp = new Date().getTime();
    let lastMissCounter = 0;
    let lastAlertedPeriod = 0;
    while (true) {
        let currentMissCounter = await fetchMissCounter();

        // Check if miss counter exceeds the tolerance
        let missDifference = currentMissCounter - previousMissCounter;
        if (missDifference > missTolerance) {
            console.log('Missing too many price updates...');
            let timeDifference = new Date().getTime() - lastAlertedPeriod;
            if (timeDifference / 1000 > alertSleepDuration) {
                console.log('Sending alert message');
                lastAlertedPeriod = new Date().getTime();
                // Send Telegram message
                const bot = new TelegramBot(`${telegramBotId}:${telegramToken}`);
                const message = `Miss counter exceeded: ${currentMissCounter}`;

                await bot.sendMessage(telegramChat!, message);
            } else {
                console.log('Alert message sent too recently. Skipping.');
            }
        }

        let currentTimestamp = new Date().getTime();

        // Refresh the missing period if we are missing blocks within the period
        if (currentMissCounter > lastMissCounter) {
            console.log('Missing counter has increased. Refreshing previous incident timestamp.');
            previousTimestamp = new Date().getTime();
        }

        let timeDifference = currentTimestamp - previousTimestamp;
        if (timeDifference / 1000 > missTolerancePeriod) {
            console.log('No more misses happened since last one. Reset monitoring flags')
            // Reset the miss counter if the tolerance period has passed
            previousMissCounter = currentMissCounter;
            previousTimestamp = currentTimestamp;
        }

        lastMissCounter = currentMissCounter;

        // Sleep for the specified duration
        await new Promise((resolve) => setTimeout(resolve, sleepDuration * 1000));
    }
}

main().catch((error) => {
    console.error('An error occurred:', error.message);
    process.exit(1);
});
