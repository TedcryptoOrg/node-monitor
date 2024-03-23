export abstract class AbstractStringVo<T> {
  constructor (
    public readonly value: string
  ) {
  }

  public equals (other: AbstractStringVo<T>): boolean {
    return this.value === other.value
  }

  public toString (): string {
    return this.value
  }
}
