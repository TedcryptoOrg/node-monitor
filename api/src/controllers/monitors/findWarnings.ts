import * as MonitorDal from '../../database/dal/monitor';
import { RequestHandler, Request, Response } from 'express';

export const findWarnings: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const monitors = await MonitorDal.findWarnings(
        req.body.limit ?? 100
    );

    res.send(monitors);
}
