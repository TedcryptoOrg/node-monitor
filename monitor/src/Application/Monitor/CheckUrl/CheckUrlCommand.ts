export default class CheckUrlCommand {
    constructor(
        public readonly messagePrefix: string,
        public readonly url: string,
    ) {
    }
}