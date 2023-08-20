import {pubkeyToAddress} from "@cosmjs/amino";
import {pubkeyType} from "@cosmjs/amino/build/pubkeys";

export function getValConsAddressFromPubKey(prefix: string, type: string, key: string) {
    if (type.includes('ed25519')) {
        return pubkeyToAddress({
            type: pubkeyType.ed25519,
            value: key,
        }, prefix + 'valcons');
    }
    if (type.includes('secp256k1')) {
        return pubkeyToAddress({
            type: pubkeyType.secp256k1,
            value: key,
        }, prefix + 'valcons');
    }

    throw new Error('Unknown pubkey type: ' + type)
}