import TelegramBot from 'node-telegram-bot-api'
import { type AlertChannel } from '../Domain/Alerter/AlertChannel'

export interface TelegramOptions {
  token: string
  chatId: string
}

export class Telegram implements AlertChannel {
  private readonly bot: TelegramBot
  private readonly options: TelegramOptions

  constructor (options: TelegramOptions) {
    this.bot = new TelegramBot(options.token)
    this.options = options
  }

  async alert (message: string): Promise<void> {
    console.debug('Sending telegram alert. Message: ' + message)
    await this.bot.sendMessage(this.options.chatId, message)
  }
}
