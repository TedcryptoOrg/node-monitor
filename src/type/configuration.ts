import {PriceFeederConfiguration} from "./priceFeederConfiguration";

export type Configuration = {
    chainName: string,
    valoperAddress?: string,
    nodeRest?: string,
    priceFeeder?: PriceFeederConfiguration,
}
