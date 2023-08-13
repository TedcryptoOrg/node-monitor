import {RpcConfiguration} from "../type/rpcConfiguration";
import {RpcStatus} from "./type/rpc/rpcStatus";
import {RecoverableException} from "../monitor/exception/recoverableException";
import axios from "axios";

export class RpcClient {
    constructor(
        private readonly rpcConfiguration: RpcConfiguration
    ) {

    }

    async getBlockHeight(): Promise<string> {
        try {
            return (await this.parser()).sync_info.latest_block_height;
        } catch (error: any) {
            throw new RecoverableException('Error fetching block height from RPC: ' + String(error.message))
        }
    }

    async isSyncing(): Promise<boolean> {
        try {
            return (await this.parser()).sync_info.catching_up;
        } catch (error: any) {
            throw new RecoverableException('Error fetching syncing status from RPC: ' + String(error.message))
        }
    }

    async parser(): Promise<RpcStatus> {
        try {
            const rpcUrl = this.rpcConfiguration.address + '/status';
            return (await axios.get(rpcUrl)).data.result;
        } catch (error: any) {
            throw new RecoverableException('Error fetching status from RPC: ' + String(error.message))
        }
    }
}