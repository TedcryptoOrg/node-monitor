interface Client {
  sendMessage: (message: string) => Promise<boolean>
}
