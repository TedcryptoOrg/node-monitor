import {sleep} from "../../src/Application/Shared/sleep";

export const lazyAssert = async (condition: () => boolean, timeout: number = 1000, interval: number = 100): Promise<void> => {
    const start = Date.now();
    while (!condition()) {
        if (Date.now() - start > timeout) {
            throw new Error('Timeout');
        }
        await sleep(interval);
    }
}
