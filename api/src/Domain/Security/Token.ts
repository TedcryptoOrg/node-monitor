export default class Token {
  constructor (
    public readonly token: string,
    public readonly expiresAt?: Date
  ) {
  }

  public equals (other: Token): boolean {
    return this.token === other.token && this.expiresAt === other.expiresAt
  }

  toArray (): { token: string, expiresAt?: string } {
    return {
      token: this.token,
      expiresAt: this.expiresAt?.toISOString()
    }
  }
}
