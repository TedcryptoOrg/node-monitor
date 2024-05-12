export default interface LogProviderInterface {
  info: (message: string, context?: Record<string, any>) => void
  error: (message: string, context?: Record<string, any>) => void
  log: (message: string, context?: Record<string, any>) => void
  warn: (message: string, context?: Record<string, any>) => void
  debug: (message: string, context?: Record<string, any>) => void
}
