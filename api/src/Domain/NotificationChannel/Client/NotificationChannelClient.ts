export default interface NotificationChannelClient {
  send: (message: string) => Promise<void>
}
