import type {SigningInfosResponse} from "./Response/Slashing/SigningInfosResponse";
import type {ValidatorInfoResponse} from "./Response/Staking/ValidatorInfoResponse";

export default interface CosmjsClient {
    isSyncing: () => Promise<boolean>
    getValidatorSigningInfo: (valconsAddress: string) => Promise<SigningInfosResponse>
    getValidatorInfo: (valoperAddress: string) => Promise<ValidatorInfoResponse>
}
