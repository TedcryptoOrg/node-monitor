import MonitorController from "../../src/Application/Monitor/MonitorController";

export default class InMemoryMonitorController implements MonitorController {
    private readonly disabledMonitors: Map<number, boolean> = new Map();
    private readonly enabledMonitors: Map<number, boolean> = new Map();
    private readonly updatedMonitors: Map<number, boolean> = new Map();
    private readonly disabledConfigurations: Map<number, boolean> = new Map();
    private readonly enabledConfigurations: Map<number, boolean> = new Map();

    disableMonitor(monitorId: number): void {
        this.disabledMonitors.set(monitorId, true);
    }

    hasMonitorBeenDisabled(monitorId: number): boolean {
        return this.disabledMonitors.has(monitorId);
    }

    enableMonitor(monitorId: number): void {
        this.enabledMonitors.set(monitorId, true);
    }

    hasMonitorBeenEnabled(monitorId: number): boolean {
        return this.enabledMonitors.has(monitorId);
    }

    updateMonitor(monitorId: number): void {
        this.updatedMonitors.set(monitorId, true);
    }

    hasMonitorBeenUpdated(monitorId: number): boolean {
        return this.updatedMonitors.has(monitorId);
    }

    enableConfiguration(configurationId: number): void {
        this.enabledConfigurations.set(configurationId, true);
    }

    hasConfigurationBeenEnabled(configurationId: number): boolean {
        return this.enabledConfigurations.has(configurationId);
    }

    disableConfiguration(configurationId: number): void {
        this.disabledConfigurations.set(configurationId, true);
    }

    hasConfigurationBeenDisabled(configurationId: number): boolean {
        return this.disabledConfigurations.has(configurationId);
    }
}