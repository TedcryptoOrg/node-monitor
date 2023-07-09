import {Param} from "./params/param";
import {Configuration} from "../type/configuration";
import {MissCounter} from "./params/miss_counter";
import {Monitor} from "./monitor";
import {Alerter} from "../alerter/alerter";

export class Kujira implements Monitor {
    private monitor_params: Param[] = [];

    constructor(configuration: Configuration, alerters: Alerter[]) {
        this.monitor_params.push(new MissCounter('Kujira', configuration, alerters));
    }

    async start(): Promise<void> {
        for (const param of this.monitor_params) {
            await param.check();
        }
    }
}