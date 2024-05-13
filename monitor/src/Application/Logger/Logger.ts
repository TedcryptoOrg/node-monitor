import type LogProviderInterface from './LogProviderInterface'

export default interface Logger extends LogProviderInterface {
  addProvider: (provider: LogProviderInterface) => void
}
