import { type RpcConfiguration } from '../type/rpcConfiguration'
import { type RpcStatus } from './type/rpc/rpcStatus'
import { RecoverableException } from '../monitor/exception/recoverableException'
import axios from 'axios'
import {ClientInterface} from "./clientInterface";

export class RpcClient implements ClientInterface {
  constructor (
    private readonly rpcConfiguration: RpcConfiguration
  ) { }



  async isSyncing (): Promise<boolean> {
    try {
      return (await this.getStatus()).sync_info.catching_up
    } catch (error: any) {
      throw new RecoverableException('Error fetching syncing status from RPC: ' + String(error.message))
    }
  }

  async getValidatorSigningInfo (valconsAddress:string): Promise<any> {
    throw new Error('Not Implemented yet...');
  }

  async getValidatorInfo(valoperAddress: string): Promise<any> {
    throw new Error('Not Implemented yet...');
  }

  async getBlockHeight (): Promise<string> {
    try {
      return (await this.getStatus()).sync_info.latest_block_height
    } catch (error: any) {
      throw new RecoverableException('Error fetching block height from RPC: ' + String(error.message))
    }
  }

  async getStatus(): Promise<RpcStatus> {
    try {
      const rpcUrl = this.rpcConfiguration.address + '/status'
      return (await axios.get(rpcUrl)).data.result
    } catch (error: any) {
      throw new RecoverableException('Error fetching status from RPC: ' + String(error.message))
    }
  }
}
