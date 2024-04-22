import MonitorManager from "../../../../../src/Application/Monitor/MonitorManager";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {createUrlMonitor} from "../../../../Helper/fixedStaticObjects";
import {lazyAssert} from "../../../../Helper/lazyAssert";
import {CheckStatus} from "../../../../../src/Domain/Checker/CheckStatusEnum";

jest.setTimeout(10000)

describe('CheckUrlCommandHandler', () => {
    it('should return OK status when URL is reachable', async () => {
        const monitorManager = myContainer.get(MonitorManager);

        const monitor = createUrlMonitor('https://google.com');
        monitorManager.setMaxAttempts(1)
        monitorManager.pushMonitor(monitor);
        monitorManager.runOnce();

        await lazyAssert(
            () => monitorManager.getStatus(monitor) === CheckStatus.OK,
            5000
        )
    })

    it('should return ERROR status when URL is NOT reachable', async () => {
        const monitorManager = myContainer.get(MonitorManager);

        const monitor = createUrlMonitor('https://foo-bar-zoo-dont-exists.com');
        monitorManager.setMaxAttempts(1)
        monitorManager.pushMonitor(monitor);
        monitorManager.runOnce();

        await lazyAssert(
            () => monitorManager.getStatus(monitor) === CheckStatus.ERROR,
            6000
        )
    })
})