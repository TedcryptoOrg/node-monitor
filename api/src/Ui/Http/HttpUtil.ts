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
  const boolean = castToBooleanOrUndefined(value)
  if (boolean === undefined) {
    throw new Error('Value is required')
  }

  return boolean
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

export function castToString(value: unknown): string {
  if (value === undefined) {
    throw new Error('Value is required');
  }
  if (typeof value === 'object' && value !== null) {
    throw new Error('Cannot cast object to string');
  }

  return String(value);
}

export function castToStringOrUndefined (value: unknown): string | undefined {
  if (value === undefined || value === null) {
    return undefined
  }

  return castToString(value)
}
