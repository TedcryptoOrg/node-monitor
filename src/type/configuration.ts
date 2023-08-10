import { type PriceFeederConfiguration } from './priceFeederConfiguration'

export interface Configuration {
  chainName: string
  valoperAddress?: string
  nodeRest?: string
  priceFeeder?: PriceFeederConfiguration
}
