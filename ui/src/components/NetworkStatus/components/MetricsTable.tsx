import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
} from '@mui/material';
import { ApiConfiguration } from '../../../types/ApiConfiguration';
import { ApiServer } from '../../../types/ApiServer';
import ConfigurationLink from '../../configurations/ConfigurationLink';
import ServerLink from '../../servers/ServerLink';
import NoMetricsFound from './NoMetricsFound';
import MetricsError from './MetricsError';
import MetricCell from './MetricCell';
import { MetricsTableProps } from '../types/MetricState';

const MetricsTable: React.FC<MetricsTableProps> = ({ 
  metricsMap,
  configurations,
  isLoading,
  error,
  onRetry
}) => {
  if (error) {
    return <MetricsError message={error} onRetry={onRetry} />;
  }

  if (!isLoading && configurations.length === 0) {
    return <NoMetricsFound />;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Configuration</TableCell>
            <TableCell>Server</TableCell>
            <TableCell>Disk Usage</TableCell>
            <TableCell>Memory Usage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {configurations.map(config => 
            config.servers?.map((server: ApiServer) => {
              const key = `${config.id}-${server.id}`;
              const metricState = metricsMap.get(key);

              return (
                <TableRow key={key}>
                  <TableCell>
                    <ConfigurationLink configuration={config} />
                  </TableCell>
                  <TableCell>
                    <ServerLink server={server} />
                  </TableCell>
                  <TableCell>
                    <MetricCell metricState={metricState} type="disk" />
                  </TableCell>
                  <TableCell>
                    <MetricCell metricState={metricState} type="memory" />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MetricsTable;