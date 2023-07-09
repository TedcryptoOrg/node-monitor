import TelegramBot from 'node-telegram-bot-api';
import { Telegram, TelegramOptions } from '../../src/alerter/telegram';

jest.mock('node-telegram-bot-api');

describe('Telegram', () => {
    let telegram: Telegram;
    let mockedBot: jest.Mocked<TelegramBot>;
    const options: TelegramOptions = {
        chatId: 'dummy-chat-id',
        botId: 'dummy-bot-id',
        token: 'dummy-token'
    };

    beforeEach(() => {
        mockedBot = new TelegramBot('dummy-token') as jest.Mocked<TelegramBot>;
        telegram = new Telegram(options);
        (telegram as any).bot = mockedBot;
    });

    it('should send an alert message via Telegram', async () => {
        const message = 'Hello, world!';

        await telegram.alert(message);

        expect(mockedBot.sendMessage).toHaveBeenCalledWith(options.chatId, message);
    });

    it('should handle errors when sending an alert message', async () => {
        const message = 'Hello, world!';
        const expectedError = new Error('Failed to send message');

        mockedBot.sendMessage.mockRejectedValue(expectedError);

        expect.assertions(1);
        try {
            await telegram.alert(message);
        } catch (error) {
            expect(error).toBe(expectedError);
        }
    });
});
