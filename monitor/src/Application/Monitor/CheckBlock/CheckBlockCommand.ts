import Command from "../../../Domain/Command/Command";
import Configuration from "../../../Domain/Configuration/Configuration";
import CheckBlockCommandState from "./CheckBlockCommandState";
import Server from "../../../Domain/Server/Server";

export default class CheckBlockCommand implements Command {
    constructor(
        public readonly messagePrefix: string,
        public readonly configuration: Configuration,
        public readonly server: Server,
        public readonly missTolerance: number,
        public readonly missToleranceIntervalSeconds: number,
        public readonly lastState?: CheckBlockCommandState,
    ) {
    }
}
