import TelegramBot from "node-telegram-bot-api";
import {Alerter} from "./alerter";

export type TelegramOptions = {
    botId: string;
    token: string;
    chatId: string;
}

export class Telegram implements Alerter {
    private bot: TelegramBot;
    private options: TelegramOptions;

    constructor(options: TelegramOptions) {
        this.bot = new TelegramBot(`${options.botId}:${options.token}`);
        this.options = options;
    }

    async alert(message: string): Promise<void> {
        await this.bot.sendMessage(this.options.chatId, message);
    }
}