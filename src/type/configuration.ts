import { type PriceFeederConfiguration } from './priceFeederConfiguration'
import { type RpcConfiguration } from './rpcConfiguration'

export interface Configuration {
  chainName: string
  valoperAddress?: string
  nodeRest?: string
  priceFeeder?: PriceFeederConfiguration
  rpc?: RpcConfiguration
}
