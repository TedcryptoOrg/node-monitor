import { type PriceFeederConfiguration } from './priceFeederConfiguration'
import { type RpcConfiguration } from './rpcConfiguration'
import { type RestConfiguration } from './restConfiguration'
import {PrometheusConfiguration} from "./prometheusConfiguration";

export interface Configuration {
  chainName: string
  valoperAddress?: string
  priceFeeder?: PriceFeederConfiguration
  rpc?: RpcConfiguration
  rest?: RestConfiguration
  prometheus?: PrometheusConfiguration
}
