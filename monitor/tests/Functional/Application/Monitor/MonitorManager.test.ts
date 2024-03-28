import {myContainer} from "../../../../src/Infrastructure/DependencyInjection/inversify.config";
import MonitorManager from "../../../../src/Application/Monitor/MonitorManager";
import {
    createConfiguration,
    createServer,
    createTestOnceMonitor
} from "../../../Helper/fixedStaticObjects";
import SpyEventDispatcher from "../../../Helper/SpyEventDispatcher";
import {TYPES} from "../../../../src/Domain/DependencyInjection/types";
import DiskSpaceCheckMonitor from "../../../../src/Domain/Monitor/DiskSpaceCheckMonitor";
import {MonitorType} from "../../../../src/Domain/Monitor/MonitorType";
import RunCheckFailed from "../../../../src/Application/Monitor/RunCheckFailed";
import StubMonitorCheckerFactory from "../../../Helper/Monitor/StubMonitorCheckerFactory";
import OnceChecker from "../../../Helper/Monitor/OnceChecker";
import StubWebSocketServer from "../../../Helper/Monitor/StubWebSocketServer";
import InMemoryHttpApiClient from "../../../Helper/InMemoryHttpApiClient";
import {sleep} from "../../../../src/Application/Shared/sleep";


describe('MonitorManager', () => {
    const eventDispatcher = myContainer.get<SpyEventDispatcher>(TYPES.EventDispatcher);
    const monitorManager = myContainer.get(MonitorManager);
    const apiClient = myContainer.get<InMemoryHttpApiClient>(TYPES.ApiClient);

    it('should dispatch event when fails to run', async () => {
        monitorManager.setMaxAttempts(1)
        monitorManager.pushMonitor(
            new DiskSpaceCheckMonitor(
                1,
                createConfiguration(),
                'Test monitor',
                'foo' as MonitorType,
                createServer(),
                80,
                1,
                60,
                1,
                true
            ),
        );

        monitorManager.run()

        expect(eventDispatcher.events.length).toBe(1)
        expect(eventDispatcher.wasEventDispatched(RunCheckFailed.name)).toBe(true)
    })

    it('should run checks and listen for ws commands', async () => {
        const monitorCheckFactory = myContainer.get<StubMonitorCheckerFactory>(TYPES.MonitorCheckerFactory)
        const websocketServer = myContainer.get<StubWebSocketServer>(TYPES.WebSocketServer)
        const onceChecker = new OnceChecker()
        const monitor = createTestOnceMonitor();
        apiClient.addMonitor(monitor)
        monitorCheckFactory.addChecker(monitor, onceChecker)

        monitorManager.pushMonitor(monitor)
        monitorManager.run();

        expect(onceChecker.hasEvent('check')).toBe(true)
        expect(onceChecker.hasEvent('stop')).toBe(false)
        expect(onceChecker.hasEvent('start')).toBe(false)

        websocketServer.trigger('message', JSON.stringify({event: 'monitor_disabled', id: monitor.id}))
        await sleep(1) // wait for the event to be processed
        expect(onceChecker.hasEvent('stop')).toBe(true)
        expect(onceChecker.hasEvent('start')).toBe(false)
        expect(websocketServer.wasEventSent('message')).toBe(true)

        websocketServer.trigger('message', JSON.stringify({event: 'monitor_enabled', id: monitor.id}))
        await sleep(1) // wait for the event to be processed
        expect(onceChecker.hasEvent('start')).toBe(true)
    })
})
