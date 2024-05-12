import type BlockchainClient from '../../../Domain/Blockchain/BlockchainClient'
import { getValConsAddressFromPubKey } from './Cosmjs/validatorTools'
import type CosmjsClient from './Cosmjs/CosmjsClient'
import { type Chain } from '@tedcryptoorg/cosmos-directory'

export default class CosmosBlockchainClient implements BlockchainClient {
  constructor (
    private readonly client: CosmjsClient,
    private readonly chain: Chain
  ) {}

  async fetchOracleMissCounter (chain: string, validatorAddress: string): Promise<number> {
    return await this.client.fetchOracleMissCounter(chain, validatorAddress)
  }

  async isSyncing (): Promise<boolean> {
    return await this.client.isSyncing()
  }

  async getBlockHeight (): Promise<number> {
    return await this.client.getBlockHeight()
  }

  async fetchMissCounter (validatorAddress: string): Promise<number> {
    const validator = (await this.client.getValidatorInfo(validatorAddress)).validator

    const validatorConsAddress = getValConsAddressFromPubKey(
      this.chain.bech32_prefix,
      validator.consensus_pubkey.type,
      validator.consensus_pubkey.value
    )

    const signingInfo = (await this.client.getValidatorSigningInfo(validatorConsAddress)).val_signing_info

    return Number(signingInfo.missed_blocks_counter)
  }
}
