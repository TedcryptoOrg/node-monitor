import {
    createDistributionClient,
    createSlashingClient, createStakingClient,
    createTendermintClient
} from "../../../src/client/queryClientFactory";
import {OSMOSIS_VALCONS_ADDRESS, OSMOSIS_VALOPER_ADDRESS, RPC_CONFIGURATION} from "../../Helper/fixedConfigurations";

describe('Query Client Factory', () => {
    it('should create tendermint client', async () => {
        const tendermintClient = await createTendermintClient('https://rpc.cosmos.directory/osmosis');
        const status = await tendermintClient.status();

        expect(status.syncInfo).toBeDefined()
        expect(status.nodeInfo).toBeDefined();
        expect(status.nodeInfo.network).toBe('osmosis-1');
    }, 30000);

    it('should create a working distribution client', async () => {
        const client = await createDistributionClient(RPC_CONFIGURATION.address);
        const commissionResponse = await client.ValidatorCommission({
            validatorAddress: OSMOSIS_VALOPER_ADDRESS
        });

        expect(Number(commissionResponse.commission?.commission[0].amount)).toBeGreaterThan(0);
        expect(commissionResponse.commission?.commission[0].denom).toBe('uosmo');
    }, 30000);

    it('should create a working slashing client', async () => {
        const client = await createSlashingClient(RPC_CONFIGURATION.address);
        const params = await client.Params({});

        expect(params.params?.downtimeJailDuration?.seconds.toNumber()).toBe(60)

        const response = await client.SigningInfo({consAddress: OSMOSIS_VALCONS_ADDRESS})

        expect(response.valSigningInfo?.address).toBe(OSMOSIS_VALCONS_ADDRESS)
    }, 30000);

    it('should create a working staking client', async () => {
        const client = await createStakingClient(RPC_CONFIGURATION.address);

        const response = await client.Params({})
        expect(response.params?.bondDenom).toBe('uosmo')
    }, 30000);
});