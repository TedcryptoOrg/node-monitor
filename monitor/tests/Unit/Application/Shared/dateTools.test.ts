import {createDateFromSeconds} from "../../../../src/Application/Shared/dateTools";

describe('DateTools', () => {
    it('should convert seconds to a date', () => {
        expect(createDateFromSeconds(1616425200)).toEqual(new Date('2021-03-22T15:00:00.000Z'))
    })
})
