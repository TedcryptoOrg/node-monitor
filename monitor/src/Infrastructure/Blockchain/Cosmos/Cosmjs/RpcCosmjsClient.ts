import axios from 'axios'
import type CosmjsClient from './CosmjsClient'
import type { SigningInfosResponse } from './Response/Slashing/SigningInfosResponse'
import type { ValidatorInfoResponse } from './Response/Staking/ValidatorInfoResponse'
import { createDateFromSeconds } from '../../../../Application/Shared/dateTools'
import { createSlashingClient, createStakingClient } from './queryClientFactory'
import type { QueryClientImpl as StakingQueryClient } from 'cosmjs-types/cosmos/staking/v1beta1/query'
import type { QueryClientImpl as SlashingQueryClient } from 'cosmjs-types/cosmos/slashing/v1beta1/query'

interface RpcStatus {
  node_info: {
    protocol_version: {
      p2p: string
      block: string
      app: string
    }
    id: string
    listen_addr: string
    network: string
    version: string
    channels: string
    moniker: string
    other: {
      tx_index: string
      rpc_address: string
    }
  }
  sync_info: {
    latest_block_hash: string
    latest_app_hash: string
    latest_block_height: string
    latest_block_time: string
    earliest_block_hash: string
    earliest_app_hash: string
    earliest_block_height: string
    earliest_block_time: string
    catching_up: boolean
  }
  validator_info: {
    address: string
    pub_key: {
      type: string
      value: string
    }
    voting_power: string
  }
}

export class RpcCosmjsClient implements CosmjsClient {
  private readonly clients: Record<string, any> = {}

  private readonly boundedStatusCodeToText: Record<string | number, string> = {
    0: 'BOND_STATUS_UNSPECIFIED',
    1: 'BOND_STATUS_UNBONDED',
    2: 'BOND_STATUS_UNBONDING',
    3: 'BOND_STATUS_BONDED',
    '-1': 'UNRECOGNIZED'
  }

  constructor (
    private readonly address: string
  ) {
  }

  async fetchOracleMissCounter (chain: string, validatorAddress: string): Promise<number> {
    throw new Error('Method not implemented.')
  }

  async isSyncing (): Promise<boolean> {
    try {
      return (await this.getStatus()).sync_info.catching_up
    } catch (error: any) {
      throw new Error('Error fetching syncing status from RPC: ' + String(error.message))
    }
  }

  async getValidatorSigningInfo (valconsAddress: string): Promise<SigningInfosResponse> {
    const client = await this.getSlashingClient()

    const response = await client.SigningInfo({
      consAddress: valconsAddress
    })
    if (response.valSigningInfo === undefined) {
      throw new Error('No signing info found for validator ' + valconsAddress)
    }

    return {
      val_signing_info: {
        address: response.valSigningInfo.address,
        start_height: response.valSigningInfo.startHeight.toString(),
        index_offset: response.valSigningInfo.indexOffset.toString(),
        jailed_until: createDateFromSeconds(response.valSigningInfo?.jailedUntil?.seconds.toNumber()).toISOString(),
        tombstoned: response.valSigningInfo.tombstoned,
        missed_blocks_counter: response.valSigningInfo.missedBlocksCounter.toString()
      }
    }
  }

  async getValidatorInfo (valoperAddress: string): Promise<ValidatorInfoResponse> {
    const client = await this.getStakingClient()

    const response = await client.Validator({
      validatorAddr: valoperAddress
    })

    if (response.validator === undefined) {
      throw new Error('No validator found for address ' + valoperAddress)
    }

    return {
      validator: {
        operator_address: response.validator.operatorAddress,
        consensus_pubkey: {
          // @ts-expect-error: seems that even cosmjs cant understand this
          type: response.validator.consensusPubkey['@type'] ?? response.validator.consensusPubkey.type ?? response.validator.consensusPubkey?.typeUrl,
          // @ts-expect-error: seems that even cosmjs cant understand this differences
          value: response.validator.consensusPubkey.key ?? response.validator.consensusPubkey.value
        },
        jailed: response.validator.jailed,
        status: this.boundedStatusCodeToText[response.validator.status.toString()],
        tokens: response.validator.tokens,
        delegator_shares: response.validator.delegatorShares,
        description: {
          moniker: response.validator.description?.moniker ?? '',
          identity: response.validator.description?.identity ?? '',
          website: response.validator.description?.website ?? '',
          security_contact: response.validator.description?.securityContact ?? '',
          details: response.validator.description?.details ?? ''
        },
        unbonding_height: response.validator.unbondingHeight.toString(),
        unbonding_time: createDateFromSeconds(response.validator.unbondingTime?.seconds.toNumber()).toISOString(),
        commission: {
          commission_rates: {
            // Not sure if this is the correct assumption
            rate: (Number(response.validator.commission?.commissionRates?.rate) / 1e18).toString(),
            max_rate: response.validator.commission?.commissionRates?.maxRate ?? '',
            max_change_rate: response.validator.commission?.commissionRates?.maxChangeRate ?? ''
          },
          update_time: createDateFromSeconds(response.validator.commission?.updateTime?.seconds.toNumber()).toISOString()
        },
        min_self_delegation: response.validator.minSelfDelegation,
        unbonding_on_hold_ref_count: response.validator.unbondingOnHoldRefCount.toString(),
        unbonding_ids: response.validator.unbondingIds.map((id) => id.toString())
      }
    }
  }

  async getBlockHeight (): Promise<number> {
    try {
      return Number((await this.getStatus()).sync_info.latest_block_height)
    } catch (error: any) {
      throw new Error('Error fetching block height from RPC: ' + String(error.message))
    }
  }

  async getStatus (): Promise<RpcStatus> {
    try {
      const rpcUrl = this.address + '/status'
      return (await axios.get(rpcUrl)).data.result
    } catch (error: any) {
      throw new Error('Error fetching status from RPC: ' + String(error.message))
    }
  }

  private async getSlashingClient (): Promise<SlashingQueryClient> {
    if (this.clients.slashing === undefined) {
      this.clients.slashing = await createSlashingClient(this.address)
    }

    return this.clients.slashing
  }

  private async getStakingClient (): Promise<StakingQueryClient> {
    if (this.clients.staking === undefined) {
      this.clients.staking = await createStakingClient(this.address)
    }

    return this.clients.staking
  }
}
