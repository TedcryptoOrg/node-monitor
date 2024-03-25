import Command from "../../../../Domain/Command/Command";
import Server from "../../../../Domain/Server/Server";

export default class CheckDiskSpaceCommand implements Command {
    constructor(
        public readonly messagePrefix: string,
        public readonly server: Server,
        public readonly threshold: number,
    ) {
    }

}