import { type PriceFeederConfiguration } from './priceFeederConfiguration'
import { type RpcConfiguration } from './rpcConfiguration'
import {RestConfiguration} from "./restConfiguration";

export interface Configuration {
  chainName: string
  valoperAddress?: string
  priceFeeder?: PriceFeederConfiguration
  rpc?: RpcConfiguration
  rest?: RestConfiguration;
}
