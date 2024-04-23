import type Configuration from '../../../Domain/Configuration/Configuration'

export default class ConfigurationEnabled {
  constructor (
    public readonly configuration: Configuration
  ) {
  }
}
