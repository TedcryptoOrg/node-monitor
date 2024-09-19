export default class CheckUrlCommandState {
  private constructor(
      public readonly numFailures: number,
  ) {
  }

  static create(): CheckUrlCommandState
  {
    return new CheckUrlCommandState(1);
  }

  public incrementFailure(): CheckUrlCommandState
  {
    return new CheckUrlCommandState(this.numFailures + 1);
  }
}
