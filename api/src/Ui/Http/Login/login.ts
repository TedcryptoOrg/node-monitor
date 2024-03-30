import { RequestHandler, Request, Response } from "express";
import {myContainer} from "../../../Infrastructure/DependencyInjection/inversify.config";
import CommandHandlerManager from "../../../Infrastructure/CommandHandler/CommandHandlerManager";
import LoginCommand from "../../../Application/Query/Login/LoginCommand";
import RecordNotFound from "../../../Domain/RecordNotFound";
import PasswordNotMatch from "../../../Application/Query/Login/PasswordNotMatch";

export const login: RequestHandler = async (req: Request, resp: Response) => {
    const commandHandler = myContainer.get(CommandHandlerManager);

    try {
        const commandResult = await commandHandler.handle(new LoginCommand(
            req.body.username,
            req.body.password
        ));

        resp.status(200).send({
            accessToken: commandResult.accessToken,
            refreshToken: commandResult.refreshToken,
        });
    } catch (error) {
        console.error(error)
        if (error instanceof RecordNotFound) {
            resp.status(404).send({message: 'User not found'});
            return;
        }
        if (error instanceof PasswordNotMatch) {
            resp.status(401).send({message: 'Incorrect password'});
            return;
        }

        resp.status(500).send({message: 'An error occurred while processing the request. Please try again later.'});
    }
}
