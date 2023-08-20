import { type RestConfiguration } from '../type/restConfiguration'
import axios from 'axios'
import { RecoverableException } from '../monitor/exception/recoverableException'
import { type SigningInfosResponse as RestSigningInfosResponse } from './type/rest/slashing/signingInfosResponse'
import { type ValidatorInfoResponse as RestValidatorInfoResponse } from './type/rest/staking/validatorInfoResponse'
import { type ClientInterface } from './clientInterface'
import { type ValidatorInfoResponse } from './type/uniformisation/staking/validatorInfoResponse'

export class RestClient implements ClientInterface {
  constructor (
    private readonly configuration: RestConfiguration
  ) {
  }

  async isSyncing (): Promise<boolean> {
    try {
      const restUrl = this.configuration.address + '/cosmos/base/tendermint/v1beta1/syncing'
      return (await axios.get(restUrl)).data.syncing
    } catch (error: any) {
      throw new RecoverableException('Error fetching syncing status from REST: ' + String(error.message))
    }
  }

  async getValidatorSigningInfo (valconsAddress: string): Promise<RestSigningInfosResponse> {
    if (!valconsAddress.includes('valcons')) {
      throw new Error('Expected valcons address. Got' + valconsAddress)
    }

    try {
      const restUrl = this.configuration.address + '/cosmos/slashing/v1beta1/signing_infos/' + valconsAddress
      console.log('Fetching signing infos from: ' + restUrl)
      return (await axios.get(restUrl)).data
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(`Error fetching validator signing info from REST. Code ${error.response.data.code}: ${error.response.data.message}`)
      }

      throw new RecoverableException('Error fetching validator signing info from REST: ' + String(error.message))
    }
  }

  async getValidatorInfo (valoperAddress: string): Promise<ValidatorInfoResponse> {
    try {
      const restUrl = this.configuration.address + '/cosmos/staking/v1beta1/validators/' + valoperAddress
      console.log(restUrl)
      const response: RestValidatorInfoResponse = (await axios.get(restUrl)).data

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
}
