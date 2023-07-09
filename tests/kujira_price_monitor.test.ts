import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';
import MockAdapter from "axios-mock-adapter";

require('dotenv').config({ path: '.env.test', debug: false, override: true});

import { main } from '../src/kujira_price_monitor';

jest.mock('node-telegram-bot-api');

describe('Main', () => {
    let mock: MockAdapter;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    it('should send a Telegram message if miss counter exceeds the tolerance', async () => {
        mock
            .onGet(`http://test-node:26657/oracle/validators/TEST_VALOPER/miss`)
            .replyOnce(200, { miss_counter: 10 })
            .onGet(`http://test-node:26657/oracle/validators/TEST_VALOPER/miss`)
            .replyOnce(200, { miss_counter: 15 });

        const mockBotSendMessage = TelegramBot.prototype.sendMessage as jest.MockedFunction<
            typeof TelegramBot.prototype.sendMessage
        >;
        mockBotSendMessage.mockResolvedValue({});

        process.env.TELEGRAM_CHAT = 'telegram_chat_id';

        await main();

        expect(mock.history.get[0].url).toEqual(`http://test-node:26657/oracle/validators/TEST_VALOPER/miss`);
        expect(mockBotSendMessage).toHaveBeenCalledTimes(1);
        expect(mockBotSendMessage).toHaveBeenCalledWith('telegram_chat_id', 'Miss counter exceeded: 15');
    });

    it('should not send a Telegram message if miss counter does not exceed the tolerance', async () => {
        mock
            .onGet(`http://test-node:26657/oracle/validators/TEST_VALOPER/miss`)
            .replyOnce(200, { miss_counter: 10 })
            .onGet(`http://test-node:26657/oracle/validators/TEST_VALOPER/miss`)
            .replyOnce(200, { miss_counter: 12 });

        const mockBotSendMessage = TelegramBot.prototype.sendMessage as jest.MockedFunction<
            typeof TelegramBot.prototype.sendMessage
        >;
        mockBotSendMessage.mockResolvedValue({});

        process.env.TELEGRAM_CHAT = 'telegram_chat_id';

        await main();

        expect(mock.history.get[0].url).toEqual(`http://test-node:26657/oracle/validators/TEST_VALOPER/miss`);
        expect(mockBotSendMessage).toHaveBeenCalledTimes(0);
    });

    it('should handle error when fetching miss counter', async () => {
        mock
            .onGet(`http://test-node:26657/oracle/validators/TEST_VALOPER/miss`)
            .replyOnce(500, {})

        try {
            await main();
        } catch (error) {
            expect(error.message).toEqual('Error fetching miss counter');
        }
    });
});
