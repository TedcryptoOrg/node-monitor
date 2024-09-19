import type CheckUrlCommandState from "./CheckUrlCommandState";

export default class CheckUrlCommand {
  constructor (
    public readonly messagePrefix: string,
    public readonly url: string,
    public readonly allowedAttempts: number,
    public readonly lastState?: CheckUrlCommandState
  ) {
  }
}
