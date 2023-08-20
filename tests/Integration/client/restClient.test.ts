import {OSMOSIS_VALCONS_ADDRESS, OSMOSIS_VALOPER_ADDRESS, REST_CONFIGURATION} from "../../Helper/fixedConfigurations";
import {RestClient} from "../../../src/client/restClient";

describe('REST Client', () => {
    let restClient: RestClient;
    beforeAll(
        () => {
            restClient = new RestClient(
                REST_CONFIGURATION,
            )
        }
    )

    it('should return whether is syncing or not', () => {
        expect(restClient.isSyncing()).resolves.toBe(false);
    });

    it('should return the validator signing info', async () => {
        const signingInfo = await restClient.getValidatorSigningInfo(OSMOSIS_VALCONS_ADDRESS);

        expect(signingInfo.val_signing_info.address).toEqual(OSMOSIS_VALCONS_ADDRESS);
        expect(signingInfo.val_signing_info.tombstoned).toBe(false)
        expect(Number(signingInfo.val_signing_info.missed_blocks_counter)).toBeGreaterThan(0)
    });

    it('should return the validator information', async () => {
        const validatorInfo = await restClient.getValidatorInfo(OSMOSIS_VALOPER_ADDRESS);

        console.log(validatorInfo)
        expect(validatorInfo.validator.commission.commission_rates.rate.substring(0, 4)).toEqual('0.05')
        expect(validatorInfo.validator.description.moniker).toBe('Tedcrypto.io 🧸 | TedLotto')
        expect(validatorInfo.validator.jailed).toBe(false)
        expect(validatorInfo.validator.status).toEqual('BOND_STATUS_BONDED')
        expect(validatorInfo.validator.consensus_pubkey.key).toEqual('iGQ1nBgIebCilnCQwrqf9kzKvoAxDzAyf1j/BHS8bz8=')

    });
});