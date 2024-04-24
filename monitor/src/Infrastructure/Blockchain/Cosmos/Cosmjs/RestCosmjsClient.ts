import axios from 'axios'
import {RecoverableException} from "../../../../Domain/RecoverableException";
import CosmjsClient from "./CosmjsClient";
import {ValidatorInfoResponse} from "./Response/Staking/ValidatorInfoResponse";
import {SigningInfosResponse} from "./Response/Slashing/SigningInfosResponse";
import Logger from "../../../../Application/Logger/Logger";

type RestSigningInfosResponse = {
  val_signing_info: {
    address: string
    start_height: string
    index_offset: string
    jailed_until: string
    tombstoned: boolean
    missed_blocks_counter: string
  }
}

export class RestCosmjsClient implements CosmjsClient {
  constructor (
    private readonly address: string,
    private readonly logger: Logger,
  ) {
  }

  async fetchOracleMissCounter(chain: string, validatorAddress: string): Promise<number> {
    const response = await axios.get(this.getOracleMissCounterEndpoint(chain, validatorAddress))

    return Number(response.data.miss_counter)
    }

  async getBlockHeight(): Promise<number> {
    try {
      const restUrl = this.address + '/cosmos/base/tendermint/v1beta1/blocks/latest'
      return (await axios.get(restUrl)).data.block.header.height
    } catch (error: any) {
      throw new Error('Error fetching block height from REST: ' + String(error.message))
    }
  }

  async isSyncing (): Promise<boolean> {
    try {
      const restUrl = this.address + '/cosmos/base/tendermint/v1beta1/syncing'
      return (await axios.get(restUrl)).data.syncing
    } catch (error: any) {
      throw new Error('Error fetching syncing status from REST: ' + String(error.message))
    }
  }

  async getValidatorSigningInfo (valconsAddress: string): Promise<SigningInfosResponse> {
    if (!valconsAddress.includes('valcons')) {
      throw new Error('Expected valcons address. Got' + valconsAddress)
    }

    try {
      const restUrl = this.address + '/cosmos/slashing/v1beta1/signing_infos/' + valconsAddress
      this.logger.log('Fetching signing infos from: ' + restUrl, {valconsAddress})
      return (await axios.get(restUrl)).data as RestSigningInfosResponse
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(`Error fetching validator signing info from REST. Code ${error.response.data.code}: ${error.response.data.message}`)
      }

      throw new Error('Error fetching validator signing info from REST: ' + String(error.message))
    }
  }

  async getValidatorInfo (valoperAddress: string): Promise<ValidatorInfoResponse> {
    try {
      const restUrl = this.address + '/cosmos/staking/v1beta1/validators/' + valoperAddress
      this.logger.log(`Get validator info ${restUrl}`, {valoperAddress})
      const response: ValidatorInfoResponse = (await axios.get(restUrl)).data

      return {
        validator: {
          operator_address: response.validator.operator_address,
          consensus_pubkey: {
            // @ts-expect-error one or another are always set
            type: response.validator.consensus_pubkey['@type'] ?? response.validator.consensus_pubkey.type,
            // @ts-expect-error one or another are always set
            value: response.validator.consensus_pubkey.key ?? response.validator.consensus_pubkey.value
          },
          jailed: response.validator.jailed,
          status: response.validator.status,
          tokens: response.validator.tokens,
          delegator_shares: response.validator.delegator_shares,
          description: response.validator.description,
          unbonding_height: response.validator.unbonding_height,
          unbonding_time: response.validator.unbonding_time,
          commission: response.validator.commission,
          min_self_delegation: response.validator.min_self_delegation,
          unbonding_on_hold_ref_count: response.validator.unbonding_on_hold_ref_count,
          unbonding_ids: response.validator.unbonding_ids
        }
      }
    } catch (error: any) {
      const message = 'Error fetching validator info from REST: '
      if (error.response?.data?.message) {
        throw new Error(message + error.response.data.message)
      }

      throw new RecoverableException(message + String(error.message))
    }
  }

  private getOracleMissCounterEndpoint(chain: string, valoperAddress: string): string {
    switch (chain) {
        case 'kujira':
          return this.address+'/oracle/validators/%valoper%/miss'.replace('%valoper%', valoperAddress)
        case 'ojo':
          return this.address+'/ojo/oracle/v1/validators/%valoper%/miss'.replace('%valoper%', valoperAddress)
        default:
          throw new Error('Unknown chain: ' + chain)
      }
  }
}
