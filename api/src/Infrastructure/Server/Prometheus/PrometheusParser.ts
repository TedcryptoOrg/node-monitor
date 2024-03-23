import {injectable} from "inversify";
import parsePrometheusTextFormat from "./prometheusUtils";
import axios from "axios";
import PrometheusMetricBag from "./PrometheusMetricBag";

@injectable()
export class PrometheusParser {

    async parse(address: string): Promise<PrometheusMetricBag> {
        const metrics = (await axios.get(address)).data

        return new PrometheusMetricBag(parsePrometheusTextFormat(metrics))
    }

}
