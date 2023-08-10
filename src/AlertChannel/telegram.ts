import TelegramBot from 'node-telegram-bot-api'
import { type AlertChannel } from './alertChannel'

export interface TelegramOptions {
  botId: string
  token: string
  chatId: string
}

export class Telegram implements AlertChannel {
  private readonly bot: TelegramBot
  private readonly options: TelegramOptions

  constructor (options: TelegramOptions) {
    this.bot = new TelegramBot(`${options.botId}:${options.token}`)
    this.options = options
  }

  async alert (message: string): Promise<void> {
    await this.bot.sendMessage(this.options.chatId, message)
  }
}
