import { CryptoTools } from '../../../../src/Application/Shared/CryptoTools';

describe('CryptoTools', () => {
    let cryptoTools: CryptoTools;

    beforeEach(() => {
        cryptoTools = new CryptoTools();
    });

    it('should decode Bech32 address and return chain', () => {
        const bech32Address = 'kujira18lap75eu2sw4el35urw202j3ld9g0m3n3gz97q';
        const chain = cryptoTools.getChainFromBech32Address(bech32Address);
        expect(chain).toBe('kujira');
    });

    it('should handle decoding error and return null', () => {
        const invalidAddress = 'invalid-bech32-address';
        const chain = cryptoTools.getChainFromBech32Address(invalidAddress);
        expect(chain).toBeNull();
    });
});