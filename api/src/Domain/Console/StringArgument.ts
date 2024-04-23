import AbstractInputArgument from './AbstractInputArgument'

export default class StringArgument extends AbstractInputArgument {
  private value: string | undefined

  constructor (
    name: string,
    description: string,
    required: boolean,
    protected defaultValue: string | undefined
  ) {
    super(name, description, required)
  }

  setValue (value: string): void {
    this.value = value
  }

  getValue (): string | undefined {
    if (this.required && this.value === undefined) {
      throw new Error(`Argument ${this.name} is required`)
    }

    return this.value ?? this.defaultValue
  }
}
