export default abstract class AbstractInputArgument {
    constructor(
        public name: string,
        public description: string,
        public required: boolean,
    ) {
    }

    abstract setValue(value: any): void;
}