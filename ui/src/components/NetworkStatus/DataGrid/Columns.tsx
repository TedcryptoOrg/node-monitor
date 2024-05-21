import {GridCellParams, GridColDef} from "@mui/x-data-grid";
import ConfigurationLink from "../../configurations/ConfigurationLink";
import {ApiConfiguration} from "../../../types/ApiConfiguration";
import {ApiServer} from "../../../types/ApiServer";
import {ServerMetric} from "../../../types/ServerMetric";
import ServerLink from "../../servers/ServerLink";

const bytesToGigabytes = (bytes: number) => {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2);
}

export const columns: GridColDef[] = [
    {
        field: 'configuration' as keyof ServerMetric,
        headerName: 'Configuration',
        flex: 1,
        renderCell: (params: GridCellParams) => params.value
            ? <ConfigurationLink configuration={params.value as ApiConfiguration}/>
            : null
    },
    {
        field: 'server' as keyof ServerMetric,
        headerName: 'Server',
        flex: 1,
        renderCell: (params: GridCellParams) => params.value
            ? <ServerLink server={params.value as ApiServer}/>
            : null
    },
    {
        field: 'totalDiskSpace' as keyof ServerMetric,
        headerName: 'Total Disk Space',
        flex: 1,
        renderCell: (params: GridCellParams) => params.value
            ? `${bytesToGigabytes(params.value as number)} GB`
            : null
    },
    {
        field: 'freeDiskSpace' as keyof ServerMetric,
        headerName: 'Free Disk Space',
        flex: 1,
        renderCell: (params: GridCellParams) => params.value
            ? `${bytesToGigabytes(params.value as number)} GB`
            : null
    },
    {
        field: 'usedDiskSpace' as keyof ServerMetric,
        headerName: 'Used Disk Space',
        flex: 1,
        renderCell: (params: GridCellParams) => params.value
            ? `${bytesToGigabytes(params.value as number)} GB`
            : null
    },
    {
        field: 'usedDiskSpacePercentage' as keyof ServerMetric,
        headerName: 'Used Disk Space Percentage',
        flex: 1,
        renderCell: (params: GridCellParams) => params.value
            ? `${params.value as number}%`
            : null
    },
    {
        field: 'totalMemory' as keyof ServerMetric,
        headerName: 'Total Memory',
        flex: 1,
        renderCell: (params: GridCellParams) => params.value
            ? `${bytesToGigabytes(params.value as number)} GB`
            : null
    },
    {
        field: 'memoryUsage' as keyof ServerMetric,
        headerName: 'Memory Usage',
        flex: 1,
        renderCell: (params: GridCellParams) => params.value
            ? `${bytesToGigabytes(params.value as number)} GB`
            : null
    },
    {
        field: 'memoryUsagePercentage' as keyof ServerMetric,
        headerName: 'Memory Usage Percentage',
        flex: 1,
        renderCell: (params: GridCellParams) => params.value
            ? `${params.value as number}%`
            : null
    },
];