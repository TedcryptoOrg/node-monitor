import type Monitor from './Monitor'
import type Checker from '../Checker/Checker'

export interface MonitorCheckerFactory {
  create: (monitor: Monitor) => Checker
}
