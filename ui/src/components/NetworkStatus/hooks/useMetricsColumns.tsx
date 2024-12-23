import { useMemo } from 'react';
import { 
  GridColDef,
  GridRenderCellParams,
  GridValueGetter as BaseGridValueGetterParams
} from '@mui/x-data-grid';
import ConfigurationLink from '../../configurations/ConfigurationLink';
import ServerLink from '../../servers/ServerLink';
import { formatBytes } from '../utils/formatBytes';
import { ServerMetric } from '../../../types/ServerMetric';

type GridValueGetterParams = BaseGridValueGetterParams<ServerMetric>;

export const useMetricsColumns = () => {
  return useMemo<GridColDef<ServerMetric>[]>(() => [
    {
      field: 'configuration',
      headerName: 'Configuration',
      flex: 1,
      renderCell: (params: GridRenderCellParams<ServerMetric>) => 
        params.value && <ConfigurationLink configuration={params.value} />
    },
    {
      field: 'server',
      headerName: 'Server',
      flex: 1,
      renderCell: (params: GridRenderCellParams<ServerMetric>) => 
        params.value && <ServerLink server={params.value} />
    },
    {
      field: 'diskUsage',
      headerName: 'Disk Usage',
      flex: 1,
      valueGetter: (value: any, row: any) => row.usedDiskSpacePercentage ?? 0,
      renderCell: (params: GridRenderCellParams<ServerMetric>) => {
        const used = formatBytes(params.row.usedDiskSpace);
        const total = formatBytes(params.row.totalDiskSpace);
        return `${params.row.usedDiskSpacePercentage ?? 0}% (${used} / ${total})`;
      }
    },
    {
      field: 'memoryUsage',
      headerName: 'Memory Usage',
      flex: 1,
      valueGetter: (value: any, row: any) => row.memoryUsagePercentage ?? 0,
      renderCell: (params: GridRenderCellParams<ServerMetric>) => {
        const used = formatBytes(params.row.memoryUsage);
        const total = formatBytes(params.row.totalMemory);
        return `${params.row.memoryUsagePercentage ?? 0}% (${used} / ${total})`;
      }
    }
  ], []);
};