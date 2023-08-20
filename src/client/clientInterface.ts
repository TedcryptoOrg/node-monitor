import {SigningInfosResponse} from "./type/rest/slashing/signingInfosResponse";
import {ValidatorInfoResponse} from "./type/rest/staking/ValidatorInfoResponse";

export interface ClientInterface {
    isSyncing(): Promise<boolean>
    getValidatorSigningInfo(valconsAddress: string): Promise<SigningInfosResponse>
    getValidatorInfo(valoperAddress: string): Promise<ValidatorInfoResponse>
}