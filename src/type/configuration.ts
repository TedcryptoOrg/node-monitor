import {PriceFeederConfiguration } from './priceFeederConfiguration'
import {RpcConfiguration} from "./rpcConfiguration";

export interface Configuration {
  chainName: string
  valoperAddress?: string
  nodeRest?: string
  priceFeeder?: PriceFeederConfiguration
  rpc?: RpcConfiguration
}
