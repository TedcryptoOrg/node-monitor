export default class BlockEta {
  private readonly blocksTimestamp = new Map<number, number>()

  pushBlock (blockHeight: number): void {
    if (this.blocksTimestamp.get(blockHeight) !== undefined) {
      return
    }
    if (this.blocksTimestamp.size > 100) {
      this.blocksTimestamp.delete(Number(this.blocksTimestamp.keys().next().value))
    }

    this.blocksTimestamp.set(blockHeight, new Date().getTime())
  }

  calculateAverageBlockTime (): number | null {
    const timestamps = Array.from(this.blocksTimestamp.values())
    if (timestamps.length < 2) {
      return null
    }

    // Loop through the timestamps and calculate the difference between each pair of timestamps
    const diffs = []
    for (let i = 1; i < timestamps.length; i++) {
      diffs.push(timestamps[i] - timestamps[i - 1])
    }

    // Calculate the average difference
    const sum = diffs.reduce((acc, val) => acc + val, 0)

    return sum / diffs.length
  }

  getEta (blockHeight: number): number | null {
    const averageBlockTime = this.calculateAverageBlockTime()
    if (averageBlockTime === null) {
      return null
    }

    const lastBlockTime = this.blocksTimestamp.get(blockHeight)
    if (lastBlockTime === undefined) {
      return null
    }

    const currentTime = new Date().getTime()
    const timeSinceLastBlock = currentTime - lastBlockTime

    const blocksToGo = blockHeight - this.blocksTimestamp.size
    return timeSinceLastBlock + (blocksToGo * averageBlockTime)
  }
}
