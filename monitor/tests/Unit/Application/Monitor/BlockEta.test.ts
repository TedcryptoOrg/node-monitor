import BlockEta from "../../../../src/Application/Monitor/BlockEta";

describe('BlockEta', () => {
    it('should calculate the average block time', () => {
        const blockEta = new BlockEta()
        blockEta.pushBlock(1)
        blockEta.pushBlock(2)
        blockEta.pushBlock(3)
        blockEta.pushBlock(4)

        expect(blockEta.calculateAverageBlockTime()).toBeLessThanOrEqual(1)
    })
})