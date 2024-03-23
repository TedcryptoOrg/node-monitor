export default class InvalidLineError extends Error {
    constructor(message: string) {
        super('Encountered invalid line: ' + message);
    }
}
