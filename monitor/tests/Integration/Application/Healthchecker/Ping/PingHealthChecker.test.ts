import PingHealthcheckCommand from "../../../../../src/Application/Healthchecker/Ping/PingHealthcheckCommand";
import CommandHandlerManager from "../../../../../src/Infrastructure/CommandHandler/CommandHandlerManager";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import axios from "axios";

jest.mock('axios');

describe('PingHealthChecker', () => {
    let commandHandlerManager: CommandHandlerManager = myContainer.get(CommandHandlerManager);

    it('should ping', async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        mockedAxios.get.mockResolvedValue({ data: {} });

        const pingHealthChecker = new PingHealthcheckCommand('http://localhost:3000');
        await commandHandlerManager.handle(pingHealthChecker);

        expect(mockedAxios.get).toBeCalledWith('http://localhost:3000/ping');
    });
})