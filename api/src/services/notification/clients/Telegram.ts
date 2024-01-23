import {TelegramBotConfiguration} from "../../../type/notificationChannel/TelegramBotConfiguration";
import {Telegraf} from "telegraf";

export default class Telegram implements Client {
    private readonly bot: Telegraf;

    private constructor(
        private readonly botToken: string,
        private readonly chatId: string,
        private readonly topicId?: string
    ) {
        this.bot = new Telegraf(this.botToken);
    }

    public static with(telegramBot: TelegramBotConfiguration): Telegram {
        return new Telegram(
            telegramBot.bot_token,
            telegramBot.chat_id,
            telegramBot.topic_id ?? undefined
        )
    }

    public async sendMessage(message: string): Promise<boolean> {
        await this.bot.telegram.sendMessage(this.chatId, message);

        return true;
    }
}
