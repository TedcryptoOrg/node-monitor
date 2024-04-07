import Command from "../../../Domain/Command/Command";
import {AbstractChecker} from "./AbstractChecker";
import CheckUrlCommand from "../CheckUrl/CheckUrlCommand";
import UrlMonitor from "../../../Domain/Monitor/UrlMonitor";

export default class UrlChecker extends AbstractChecker {
    getCommand(): Command {
        if (!(this.monitor instanceof UrlMonitor)) {
            throw new Error('Invalid monitor type');
        }

        return new CheckUrlCommand(
            this.monitor.getFullName(),
            this.monitor.url,
        )
    }
}