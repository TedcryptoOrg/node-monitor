import { type PriceFeederConfiguration } from './priceFeederConfiguration'
import { type RpcConfiguration } from './rpcConfiguration'
import { type RestConfiguration } from './restConfiguration'
import { type PrometheusConfiguration } from './prometheusConfiguration'
import { type BlockAlertConfiguration } from './blockAlertConfiguration'

export interface Configuration {
  chainName: string
  valoperAddress?: string
  priceFeeder?: PriceFeederConfiguration
  rpc?: RpcConfiguration
  rest?: RestConfiguration
  prometheus?: PrometheusConfiguration
  alerts?: {
    block?: BlockAlertConfiguration
  }
}
