import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import CommandHandlerManager from "../../../../../src/Infrastructure/CommandHandler/CommandHandlerManager";
import RunCheckCommand from "../../../../../src/Application/Monitor/RunCheck/RunCheckCommand";
import DiskSpaceCheckMonitor from "../../../../../src/Domain/Monitor/DiskSpaceCheckMonitor";
import {MonitorType} from "../../../../../src/Domain/Monitor/MonitorType";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import SpyEventDispatcher from "../../../../Helper/SpyEventDispatcher";
import {createConfiguration, createServer} from "../../../../Helper/fixedStaticObjects";
import RunCheckFailed from "../../../../../src/Application/Monitor/RunCheck/RunCheckFailed";

describe('Run Check fails to run', () => {
    const commandHandler = myContainer.get(CommandHandlerManager);

    it('should dispatch event when fails to run', async () => {
        const eventDispatcher = myContainer.get<SpyEventDispatcher>(TYPES.EventDispatcher);

        await commandHandler.handle(new RunCheckCommand(
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
            1
        ));

        expect(eventDispatcher.events.length).toBe(1);
        expect(eventDispatcher.wasEventDispatched(RunCheckFailed.name)).toBe(true);
    })
})