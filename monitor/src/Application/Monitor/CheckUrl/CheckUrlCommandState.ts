export default class CheckUrlCommandState {
  constructor(
      public readonly numFailures: number,
  ) {
  }

  public incrementFailure(): CheckUrlCommandState
  {
    return new CheckUrlCommandState(this.numFailures + 1);
  }
}
