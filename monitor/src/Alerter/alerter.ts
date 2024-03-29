import { type AlertChannel } from '../AlertChannel/alertChannel'

export class Alerter {
  private lastAlertedPeriod: number = 0

  constructor (
    private readonly name: string,
    private readonly checkerName: string,
    private readonly alertChannels: AlertChannel[],
    private readonly alertSleepDurationMinutes: number
  ) {
  }

  async resolve (message: string): Promise<void> {
    console.log(`[${this.name}][${this.checkerName}] Resolving alert...`)
    await this.sendMessage(message)
    this.lastAlertedPeriod = 0
  }

  async alert (message: string): Promise<void> {
    const timeDifferenceInMin = (new Date().getTime() - this.lastAlertedPeriod) / 1000 / 60
    if (timeDifferenceInMin < this.alertSleepDurationMinutes) {
      console.log(`[${this.name}][${this.checkerName}] Alert message sent too recently. Skipping.`, timeDifferenceInMin)
      return
    }

    console.log(`[${this.name}][${this.checkerName}] Sending an alert...`, timeDifferenceInMin, this.alertSleepDurationMinutes)
    await this.sendMessage(message)
    this.lastAlertedPeriod = new Date().getTime()
  }

  private async sendMessage (message: string): Promise<void> {
    for (const alerter of this.alertChannels) {
      try {
        await alerter.alert(message)
      } catch (error) {
        console.error(`[${this.name}][${this.checkerName}] Failed to alert`, error)
      }
    }
  }
}
