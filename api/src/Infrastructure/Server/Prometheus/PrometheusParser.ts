import {injectable} from "inversify";
import parsePrometheusTextFormat from "./prometheusUtils";
import axios from "axios";
import PrometheusMetricBag from "./PrometheusMetricBag";
import * as https from "https";

@injectable()
export class PrometheusParser {

    async parse(address: string): Promise<PrometheusMetricBag> {
        const response = await axios.get(address, {
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        })

        return new PrometheusMetricBag(parsePrometheusTextFormat(response.data))
    }

}
