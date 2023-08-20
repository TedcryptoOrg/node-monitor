import {RpcClient} from "../../../src/client/rpcClient";
import {OSMOSIS_VALOPER_ADDRESS, RPC_CONFIGURATION} from "../../Helper/fixedConfigurations";

describe('RPC Client', () => {
    let rpcClient: RpcClient;
    beforeAll(
        () => {
            rpcClient = new RpcClient(
                RPC_CONFIGURATION,
            )
        }
    )

    it('should return whether is syncing or not', () => {
        expect(rpcClient.isSyncing()).resolves.toBe(false);
    });

    it('should return the validator signing info', async () => {
        const signingInfo = await rpcClient.getValidatorSigningInfo(OSMOSIS_VALOPER_ADDRESS);

        expect(signingInfo.val_signing_info.address).toEqual(OSMOSIS_VALOPER_ADDRESS);
    });
});