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

  async alert (message: string): Promise<void> {
    const timeDifferenceInMin = (new Date().getTime() - this.lastAlertedPeriod) / 1000 / 60
    if (timeDifferenceInMin > this.alertSleepDurationMinutes) {
      console.log(`[${this.name}][${this.checkerName}] Sending an alert...`, timeDifferenceInMin, this.alertSleepDurationMinutes)
      // loop alertChannels and alert
      for (const alerter of this.alertChannels) {
        await alerter.alert(message)
      }
      this.lastAlertedPeriod = new Date().getTime()
    } else {
      console.log(`[${this.name}][${this.checkerName}] Alert message sent too recently. Skipping.`, timeDifferenceInMin)
    }
  }
}
