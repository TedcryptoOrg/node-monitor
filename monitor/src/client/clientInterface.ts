import { type SigningInfosResponse } from '../Infrastructure/Blockchain/Cosmos/Cosmjs/Response/Slashing/SigningInfosResponse'
import { type ValidatorInfoResponse } from '../Infrastructure/Blockchain/Cosmos/Cosmjs/Response/Staking/ValidatorInfoResponse'

export interface ClientInterface {
  isSyncing: () => Promise<boolean>
  getValidatorSigningInfo: (valconsAddress: string) => Promise<SigningInfosResponse>
  getValidatorInfo: (valoperAddress: string) => Promise<ValidatorInfoResponse>
}
