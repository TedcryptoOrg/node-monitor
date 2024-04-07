import {Telegraf} from "telegraf";
import NotificationChannelClient from "../../../Domain/NotificationChannel/Client/NotificationChannelClient";

export type TelegramBotConfiguration = {
    bot_token: string,
    chat_id: string,
    topic_id?: string,
}

export default class Telegram implements NotificationChannelClient {
    private readonly bot: Telegraf;

    private constructor(
        private readonly botToken: string,
        private readonly chatId: string,
        private readonly topicId?: number
    ) {
        this.bot = new Telegraf(this.botToken);
    }

    public static with(telegramBot: TelegramBotConfiguration): Telegram {
        return new Telegram(
            telegramBot.bot_token,
            telegramBot.chat_id,
            telegramBot.topic_id ? Number(telegramBot.topic_id) : undefined
        )
    }

    public async send(message: string): Promise<void> {
        await this.bot.telegram.sendMessage(this.chatId, message, {
            ...(this.topicId ? {message_thread_id: this.topicId} : {})
        });
    }
}
