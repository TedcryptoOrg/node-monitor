import { type SigningInfosResponse } from './type/uniformisation/slashing/signingInfosResponse'
import { type ValidatorInfoResponse } from './type/uniformisation/staking/validatorInfoResponse'

export interface ClientInterface {
  isSyncing: () => Promise<boolean>
  getValidatorSigningInfo: (valconsAddress: string) => Promise<SigningInfosResponse>
  getValidatorInfo: (valoperAddress: string) => Promise<ValidatorInfoResponse>
}
