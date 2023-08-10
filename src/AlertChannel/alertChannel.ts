export interface AlertChannel {
  alert: (message: string) => Promise<void>
}
