import { bech32 } from 'bech32'

export class CryptoTools {
  getChainFromBech32Address (address: string): string | null {
    try {
      const decoded = bech32.decode(address)

      return decoded.prefix.replace('valoper', '')
    } catch (error) {
      console.error('Failed to decode Bech32 address:', error)
      return null
    }
  }
}
