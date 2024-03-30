import Monitor from "./Monitor";
import Checker from "../Checker/Checker";

export interface MonitorCheckerFactory {
    create(monitor: Monitor): Checker;
}