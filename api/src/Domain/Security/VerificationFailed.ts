export default class VerificationFailed extends Error {
  static TOKEN_EXPIRED: string = 'token_expired'
  static FAILED_TO_AUTHENTICATE: string = 'failed_to_authenticate'

  private constructor (public readonly code: string, message: string) {
    super(message)
  }

  public static tokenExpired (): VerificationFailed {
    return new VerificationFailed(
      VerificationFailed.TOKEN_EXPIRED,
      'Token expired'
    )
  }

  public static failedToAuthenticate (): VerificationFailed {
    return new VerificationFailed(
      VerificationFailed.FAILED_TO_AUTHENTICATE,
      'Failed to authenticate token'
    )
  }
}
