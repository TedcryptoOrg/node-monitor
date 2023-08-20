import { Tendermint34Client, Tendermint37Client } from '@cosmjs/tendermint-rpc'
import { createProtobufRpcClient, type ProtobufRpcClient, QueryClient } from '@cosmjs/stargate'
import { QueryClientImpl as DistributionQueryClient } from 'cosmjs-types/cosmos/distribution/v1beta1/query'
import { QueryClientImpl as StakingQueryClient } from 'cosmjs-types/cosmos/staking/v1beta1/query'
import { QueryClientImpl as SlashingQueryClient } from 'cosmjs-types/cosmos/slashing/v1beta1/query'

export async function createDistributionClient (endpoint: string): Promise<DistributionQueryClient> {
  return new DistributionQueryClient(await createRpcClient(endpoint))
}

export async function createStakingClient (endpoint: string): Promise<StakingQueryClient> {
  return new StakingQueryClient(await createRpcClient(endpoint))
}

export async function createSlashingClient (endpoint: string): Promise<SlashingQueryClient> {
  return new SlashingQueryClient(await createRpcClient(endpoint))
}

export async function createTendermintClient (endpoint: string): Promise<Tendermint37Client | Tendermint34Client> {
  const tm37Client = await Tendermint37Client.connect(endpoint)
  const version = (await tm37Client.status()).nodeInfo.version
  if (version.startsWith('0.37.')) {
    return tm37Client
  }

  tm37Client.disconnect()
  return await Tendermint34Client.connect(endpoint)
}

async function createRpcClient (endpoint: string): Promise<ProtobufRpcClient> {
  return createProtobufRpcClient(
    new QueryClient(await createTendermintClient(endpoint))
  )
}
