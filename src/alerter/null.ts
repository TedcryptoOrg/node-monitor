import {Alerter} from "./alerter";

export class Null implements Alerter {
    async alert(message: string): Promise<void> {
        console.log(message);
        return;
    }
}