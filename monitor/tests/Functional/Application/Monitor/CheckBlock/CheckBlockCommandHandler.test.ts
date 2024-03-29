import MonitorManager from "../../../../../src/Application/Monitor/MonitorManager";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {
    createBlockCheckMonitor,
    createConfiguration,
    createServer,
    createService,
} from "../../../../Helper/fixedStaticObjects";
import {lazyAssert} from "../../../../Helper/lazyAssert";
import {CheckStatus} from "../../../../../src/Domain/Checker/CheckStatusEnum";
import InMemoryHttpApiClient from "../../../../Helper/InMemoryHttpApiClient";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import InMemoryBlockchainClientFactory from "../../../../Helper/Blockchain/InMemoryBlockchainClientFactory";
import StubBlockchainClient from "../../../../Helper/Blockchain/StubBlockchainClient";

describe('CheckBlockCommandHandler', () => {
    const monitorManager = myContainer.get(MonitorManager)
    const apiClient = myContainer.get<InMemoryHttpApiClient>(TYPES.ApiClient)
    const blockchainClientFactory = myContainer.get<InMemoryBlockchainClientFactory>(TYPES.BlockchainClientFactory)

    it('should run', async () => {
        blockchainClientFactory.addRpcClient(new StubBlockchainClient())

        const server = createServer([createService()])
        const configuration = createConfiguration([], [server]);
        apiClient.addConfiguration(configuration)
        const monitor = createBlockCheckMonitor(configuration);

        monitorManager.setMaxAttempts(1)
        monitorManager.pushMonitor(monitor);
        monitorManager.runOnce();

        await lazyAssert(() => monitorManager.getStatus(monitor) === CheckStatus.OK)
    })
})
