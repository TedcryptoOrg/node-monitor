export function castToBooleanOrUndefined (value: unknown): boolean | undefined {
  if (value === undefined) {
    return undefined
  }
  if (value === true || value === false) {
    return value
  }

  return value === '1' || value === 'on' || value === 'true'
}

export function castToBoolean (value: unknown): boolean {
  value = castToBooleanOrUndefined(value)
  if (value === undefined) {
    throw new Error('Value is required')
  }

  return value
}

export function castToNumber (value: unknown): number {
  if (value === undefined) {
    throw new Error('Value is required')
  }

  return Number(value)
}

export function castToNumberOrUndefined (value: unknown): number | undefined {
  if (value === undefined) {
    return undefined
  }

  return castToNumber(value)
}

export function castToString (value: unknown): string {
  if (value === undefined) {
    throw new Error('Value is required')
  }

  return String(value)
}

export function castToStringOrUndefined (value: unknown): string | undefined {
  if (value === undefined) {
    return undefined
  }

  return castToString(value)
}
