import * as MonitorDal from '../../database/dal/monitor';
import { RequestHandler, Request, Response } from 'express';

export const findFailed: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const monitors = await MonitorDal.findFailed(
        req.body.limit ?? 100
    );

    res.send(monitors);
}
