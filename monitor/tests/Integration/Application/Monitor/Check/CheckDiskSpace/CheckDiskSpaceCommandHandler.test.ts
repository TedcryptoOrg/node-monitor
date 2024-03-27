import {myContainer} from "../../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import CommandHandlerManager from "../../../../../../src/Infrastructure/CommandHandler/CommandHandlerManager";
import CheckDiskSpaceCommand
    from "../../../../../../src/Application/Monitor/Check/CheckDiskSpace/CheckDiskSpaceCommand";
import Server from "../../../../../../src/Domain/Server/Server";
import {CheckStatus} from "../../../../../../src/Domain/Checker/CheckStatusEnum";
import InMemoryHttpApiClient from "../../../../../Helper/InMemoryHttpApiClient";
import {TYPES} from "../../../../../../src/Domain/DependencyInjection/types";
import ServerMetricsResponseBuilder from "../../../../../Helper/ServerMetricsResponseBuilder";
import {createServer} from "../../../../../Helper/fixedStaticObjects";

describe('CheckDiskSpaceCommandHandler', () => {
    const commandHandler = myContainer.get(CommandHandlerManager);

    it('should return OK status when disk space is below threshold', async () => {
        const httpApiClient: InMemoryHttpApiClient = myContainer.get(TYPES.ApiClient);
        httpApiClient.addServerMetrics(
            1,
            (new ServerMetricsResponseBuilder(0, 0, 0, 10)).build()
        );

        const result = await commandHandler.handle(new CheckDiskSpaceCommand(
            'test',
            createServer(),
            80
        ));

        expect(result.status).toBe(CheckStatus.OK);
        expect(result.message).toBe('Used disk space is 10% below threshold 80');
    });

    it('should return NOK status when disk space is above threshold', async () => {
        const httpApiClient: InMemoryHttpApiClient = myContainer.get(TYPES.ApiClient);
        httpApiClient.addServerMetrics(
            1,
            (new ServerMetricsResponseBuilder(0, 0, 0, 10)).build()
        );

        const result = await commandHandler.handle(new CheckDiskSpaceCommand(
            'test',
            createServer(),
            5
        ));

        expect(result.status).toBe(CheckStatus.ERROR);
        expect(result.message).toBe('Used disk space is 10% above threshold 5');
    });
})
