import Service from "../Services/Service";

export default class Server {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly address: string,
        public readonly services: readonly Service[]
    ) {
    }
}
