export function createDateFromSeconds (seconds: number | undefined): Date {
  if (seconds === undefined) {
    return new Date()
  }

  return new Date(seconds * 1000)
}
