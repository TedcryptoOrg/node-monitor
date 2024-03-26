import { type AlertChannel } from '../Domain/Alerter/AlertChannel'

export class Null implements AlertChannel {
  async alert (message: string): Promise<void> {
    console.log(message)
  }
}
