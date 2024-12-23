import { useState, useEffect, useCallback } from 'react';
import { useApi } from '../../../context/ApiProvider';
import { ServerMetric } from '../../../types/ServerMetric';
import { ApiConfiguration } from '../../../types/ApiConfiguration';
import { ApiServer } from '../../../types/ApiServer';
import { MetricState } from '../types/MetricState';

interface UseMetricsReturn {
  metricsMap: Map<string, MetricState>;
  configurations: ApiConfiguration[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useMetrics = (): UseMetricsReturn => {
  const api = useApi();
  const [configurations, setConfigurations] = useState<ApiConfiguration[]>([]);
  const [metricsMap, setMetricsMap] = useState<Map<string, MetricState>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServerMetrics = useCallback(async (config: ApiConfiguration, server: ApiServer) => {
    const key = `${config.id}-${server.id}`;
    
    setMetricsMap(prev => new Map(prev).set(key, {
      data: null,
      isLoading: true,
      error: null
    }));

    try {
      const response = await api?.get(`/servers/${server.id}/metrics`);
      if (!response?.ok) {
        throw new Error('Failed to fetch server metrics');
      }

      setMetricsMap(prev => new Map(prev).set(key, {
        data: {
          configuration: config,
          server: server,
          ...response.body
        },
        isLoading: false,
        error: null
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch server metrics';
      setMetricsMap(prev => new Map(prev).set(key, {
        data: null,
        isLoading: false,
        error: errorMessage
      }));
    }
  }, [api]);

  const fetchConfigurations = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api?.get('/configurations');
      if (!response?.ok) {
        throw new Error('Failed to fetch configurations');
      }

      const configs: ApiConfiguration[] = response.body;
      setConfigurations(configs);

      configs.forEach(config => {
        config.servers?.forEach(server => {
          fetchServerMetrics(config, server);
        });
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch configurations';
      console.error('Error fetching configurations:', error);
      setError(errorMessage);
      setConfigurations([]);
    } finally {
      setIsLoading(false);
    }
  }, [api, fetchServerMetrics]);

  useEffect(() => {
    fetchConfigurations();
    const interval = setInterval(fetchConfigurations, 30000);
    return () => clearInterval(interval);
  }, [fetchConfigurations]);

  return { 
    metricsMap, 
    configurations, 
    isLoading, 
    error, 
    refetch: fetchConfigurations 
  };
};