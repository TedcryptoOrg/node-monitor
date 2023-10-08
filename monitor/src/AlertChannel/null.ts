import { type AlertChannel } from './alertChannel'

export class Null implements AlertChannel {
  async alert (message: string): Promise<void> {
    console.log(message)
  }
}
