export function formatBytes (bytes: number, decimals: number = 2): string {
  if (bytes === 0) {
    return '0 Bytes'
  }

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i]
}

export function parseHumanReadableSize (sizeString: string): number | undefined {
  const units: Record<string, number> = {
    Bytes: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
    TB: 1024 ** 4,
    PB: 1024 ** 5,
    EB: 1024 ** 6,
    ZB: 1024 ** 7,
    YB: 1024 ** 8
  }

  const regex = /^([\d.]+)\s*(\w{1,2})$/i
  const match = sizeString.match(regex)

  if (match?.[1] && match?.[2]) {
    const value = parseFloat(match[1])
    const unit = match[2].toUpperCase()

    if (units.hasOwnProperty(unit)) {
      return value * units[unit]
    }
  }

  return undefined // Unable to parse the size string
}
