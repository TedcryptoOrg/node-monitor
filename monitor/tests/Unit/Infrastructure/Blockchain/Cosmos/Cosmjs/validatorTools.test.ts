import {getValConsAddressFromPubKey} from "../../../../../../src/Infrastructure/Blockchain/Cosmos/Cosmjs/validatorTools";

describe('ValidatorTools', () => {
    it('should convert validator addresses into their consensus addresses', () => {
        expect(
            getValConsAddressFromPubKey(
                'osmo',
                'cosmos.crypto.ed25519.PubKey',
                'iGQ1nBgIebCilnCQwrqf9kzKvoAxDzAyf1j/BHS8bz8='
            )
        ).toEqual('osmovalcons139x9d4k0cw5wp84k6x3wxdr8cn8h0s84q2f7rx')
    });
});