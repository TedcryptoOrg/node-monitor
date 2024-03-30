import Monitor from "../../../src/Domain/Monitor/Monitor";
import Checker from "../../../src/Domain/Checker/Checker";

export default class StubMonitorCheckerFactory {
    mappedCheckers = new Map<number, Checker>();
    addChecker(monitor: Monitor, checker: Checker) {
        this.mappedCheckers.set(monitor.id, checker);
    }

    create(monitor: Monitor): Checker {
        const checker = this.mappedCheckers.get(monitor.id);
        if (!checker) {
            throw new Error(`Checker for monitor ${monitor.getFullName()} not found. Have you added it to the factory?`);
        }

        return checker;
    }
}
