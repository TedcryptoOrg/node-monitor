import type { ClientInterface } from '../client/clientInterface'
import { ServiceTypeEnum } from '../type/api/ServiceTypeEnum'
import { RpcClient } from '../client/rpcClient'
import { RestClient } from '../client/restClient'
import { type ApiService } from '../type/api/ApiService'

export function buildClient (services: ApiService[], type?: ServiceTypeEnum): ClientInterface {
  for (const apiService of services) {
    if (!apiService.is_enabled) {
      continue
    }
    if (apiService.type === ServiceTypeEnum.RPC &&
            (type === undefined || type === ServiceTypeEnum.RPC)
    ) {
      return new RpcClient({ address: apiService.address })
    }
    if (apiService.type === ServiceTypeEnum.REST &&
            (type === undefined || type === ServiceTypeEnum.REST)
    ) {
      return new RestClient({ address: apiService.address })
    }
  }

  throw new Error('No client found.')
}
