export default interface MonitorController {
  updateMonitor: (monitorId: number) => void

  enableMonitor: (monitorId: number) => void

  disableMonitor: (monitorId: number) => void

  enableConfiguration: (configurationId: number) => void

  disableConfiguration: (configurationId: number) => void
}
