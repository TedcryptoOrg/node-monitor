import type Configuration from '../../../Domain/Configuration/Configuration'

export default class ConfigurationDisabled {
  constructor (
    public readonly configuration: Configuration
  ) {
  }
}
