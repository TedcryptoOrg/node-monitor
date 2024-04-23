import { injectable } from 'inversify'
import parsePrometheusTextFormat from './prometheusUtils'
import axios from 'axios'
import PrometheusMetricBag, { PrometheusMetric } from './PrometheusMetricBag'
import * as https from 'https'

@injectable()
export class PrometheusParser {
  async parse (address: string): Promise<PrometheusMetricBag> {
    const response = await axios.get(address, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        checkServerIdentity: () => undefined
      })
    })

    const metrics: PrometheusMetric[] = parsePrometheusTextFormat(response.data as string)

    return new PrometheusMetricBag(metrics)
  }
}
