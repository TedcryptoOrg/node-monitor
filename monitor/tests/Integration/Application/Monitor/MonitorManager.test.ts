import {myContainer} from "../../../../src/Infrastructure/DependencyInjection/inversify.config";
import MonitorManager from "../../../../src/Application/Monitor/MonitorManager";
import {createTestOnceMonitor} from "../../../Helper/fixedStaticObjects";
import SpyEventDispatcher from "../../../Helper/SpyEventDispatcher";
import {TYPES} from "../../../../src/Domain/DependencyInjection/types";
import RunCheckFailed from "../../../../src/Application/Monitor/RunCheckFailed";
import StubMonitorCheckerFactory from "../../../Helper/Monitor/StubMonitorCheckerFactory";
import OnceChecker from "../../../Helper/Monitor/OnceChecker";
import StubWebSocketServer from "../../../Helper/Monitor/StubWebSocketServer";
import InMemoryHttpApiClient from "../../../Helper/InMemoryHttpApiClient";
import {sleep} from "../../../../src/Application/Shared/sleep";


describe('MonitorManager', () => {
    const stubMonitorCheckerFactory = new StubMonitorCheckerFactory();
    myContainer.rebind(TYPES.MonitorCheckerFactory).toConstantValue(stubMonitorCheckerFactory);

    const eventDispatcher = myContainer.get<SpyEventDispatcher>(TYPES.EventDispatcher);
    const apiClient = myContainer.get<InMemoryHttpApiClient>(TYPES.ApiClient);

    it('should dispatch event when fails to run', async () => {
        const monitorManager = myContainer.get(MonitorManager);

        const monitor = createTestOnceMonitor()
        const checker = new OnceChecker()
        checker.setCheckerException(new Error('Failed to run'))

        stubMonitorCheckerFactory.addChecker(monitor, checker)
        monitorManager.setMaxAttempts(1)
        monitorManager.pushMonitor(monitor);

        monitorManager.run()

        await sleep(1)

        expect(eventDispatcher.events.length).toBe(1)
        expect(eventDispatcher.wasEventDispatched(RunCheckFailed.name)).toBe(true)
    })

    it('should run checks and listen for ws commands', async () => {
        const monitorManager = myContainer.get(MonitorManager);

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
