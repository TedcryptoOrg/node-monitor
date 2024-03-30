import PingHealthcheckCommand from "../../../../../src/Application/Healthchecker/Ping/PingHealthcheckCommand";
import CommandHandlerManager from "../../../../../src/Infrastructure/CommandHandler/CommandHandlerManager";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import StubHttpClient from "../../../../Helper/Http/StubHttpClient";

jest.mock('axios');

describe('PingHealthChecker', () => {
    const httpClient = new StubHttpClient();
    myContainer.rebind(TYPES.HttpClient).toConstantValue(httpClient)

    let commandHandlerManager: CommandHandlerManager = myContainer.get(CommandHandlerManager);

    it('should ping', async () => {
        const pingHealthChecker = new PingHealthcheckCommand('http://localhost:3000');
        await commandHandlerManager.handle(pingHealthChecker);

        expect(httpClient.getRequests().get.length).toBe(1)
        expect(httpClient.getRequests().get[0]).toBe('http://localhost:3000/ping')
    });
})