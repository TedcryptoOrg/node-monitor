import {handleCommand} from "../handleCommandUtil";
import GetMetricsCommand from "../../../Application/Query/Server/GetMetrics/GetMetricsCommand";
import {ServerMetrics} from "../../../Domain/Server/ServerMetrics";

export const getMetrics = async (req: any, resp: any): Promise<void> => {
    await handleCommand(
        new GetMetricsCommand(
            Number(req.params.id),
        ),
        resp,
        (metrics: ServerMetrics) => resp.status(200).send(metrics)
    )
}
