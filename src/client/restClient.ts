import {RestConfiguration} from "../type/restConfiguration";
import axios from "axios";
import {RecoverableException} from "../monitor/exception/recoverableException";
import {SigningInfosResponse} from "./type/rest/slashing/signingInfosResponse";
import {ValidatorInfoResponse} from "./type/rest/staking/ValidatorInfoResponse";
import {ClientInterface} from "./clientInterface";

export class RestClient implements ClientInterface {
    constructor(
        private readonly configuration: RestConfiguration
    ) {
    }

    async isSyncing(): Promise<boolean> {
        try {
            const restUrl = this.configuration.address + '/cosmos/base/tendermint/v1beta1/syncing'
            return (await axios.get(restUrl)).data.result.sync_info.catching_up
        } catch (error: any) {
            throw new RecoverableException('Error fetching syncing status from REST: ' + String(error.message))
        }
    }

    async getValidatorSigningInfo(valconsAddress: string): Promise<SigningInfosResponse> {
        try {
            if (!valconsAddress.includes('valcons')) {
                throw new Error('Expected valcons address. Got' + valconsAddress);
            }

            const restUrl = this.configuration.address + '/cosmos/slashing/v1beta1/signing_infos/' + valconsAddress
            console.log('Fetching signing infos from: ' + restUrl)
            return (await axios.get(restUrl)).data
        } catch (error: any) {
            if (error.response?.data?.message) {
                throw new Error(`Error fetching validator signing info from REST. Code ${error.response.data.code}: ${error.response.data.message}`);
            }

            throw new RecoverableException('Error fetching validator signing info from REST: ' + String(error.message))
        }
    }

    async getValidatorInfo(valoperAddress: string): Promise<ValidatorInfoResponse>
    {
        try {
            const restUrl = this.configuration.address + '/cosmos/staking/v1beta1/validators/' + valoperAddress
            console.log(restUrl)
            return (await axios.get(restUrl)).data
        } catch (error: any) {
            const message = 'Error fetching validator info from REST: ';
            if (error.response?.data?.message) {
                throw new Error(message + error.response.data.message);
            }

            throw new RecoverableException(message + String(error.message))
        }
    }

}