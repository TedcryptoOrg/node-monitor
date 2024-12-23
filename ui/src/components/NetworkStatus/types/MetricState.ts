import { ServerMetric } from '../../../types/ServerMetric';
import { ApiConfiguration } from '../../../types/ApiConfiguration';

export interface MetricState {
  data: ServerMetric | null;
  isLoading: boolean;
  error: string | null;
}

export interface MetricsTableProps {
  metricsMap: Map<string, MetricState>;
  configurations: ApiConfiguration[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}