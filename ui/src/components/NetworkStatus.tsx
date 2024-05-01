import React, {useEffect, useState} from 'react';
import {ApiConfiguration} from "../types/ApiConfiguration";
import {ApiServer} from "../types/ApiServer";
import ConfigurationLink from "./configurations/ConfigurationLink";
import ServerLink from "./servers/ServerLink";
import {DataGrid, GridCellParams, GridColDef} from "@mui/x-data-grid";
import {Box} from "@mui/system";
import {useApi} from "../context/ApiProvider";

interface Metric {
    configuration: ApiConfiguration,
    server: ApiServer,
    freeDiskSpace: number;
    usedDiskSpace: number;
    totalDiskSpace: number;
    usedDiskSpacePercentage: number;
    memoryUsage: number;
    memoryUsagePercentage: number;
    totalMemory: number;
}

const NetworkStatus: React.FC = () => {
    const api = useApi()
    const [metrics, setMetrics] = useState<Metric[]>([]);
    const firstRender = React.useRef(true);

    const columns: GridColDef[] = [
        {
            field: 'configuration' as keyof Metric,
            headerName: 'Configuration',
            flex: 1,
            renderCell: (params: GridCellParams) => params.value ? <ConfigurationLink configuration={(params.value as ApiConfiguration)} /> : null
        },
        {
            field: 'server' as keyof Metric,
            headerName: 'Server',
            flex: 1,
            renderCell: (params: GridCellParams) => params.value ? <ServerLink server={(params.value as ApiServer)} /> : null
        },
        {
            field: 'totalDiskSpace' as keyof Metric,
            headerName: 'Total Disk Space',
            flex: 1,
            renderCell: (params: GridCellParams) => params.value ? `${bytesToGigabytes(params.value as number)} GB` : null
        },
        {
            field: 'freeDiskSpace' as keyof Metric,
            headerName: 'Free Disk Space',
            flex: 1,
            renderCell: (params: GridCellParams) => params.value ? `${bytesToGigabytes(params.value as number)} GB` : null
        },
        {
            field: 'usedDiskSpace' as keyof Metric,
            headerName: 'Used Disk Space',
            flex: 1,
            renderCell: (params: GridCellParams) => params.value ? `${bytesToGigabytes(params.value as number)} GB` : null
        },
        {
            field: 'usedDiskSpacePercentage' as keyof Metric,
            headerName: 'Used Disk Space Percentage',
            flex: 1,
            renderCell: (params: GridCellParams) => params.value ? `${params.value as number}%` : null
        },
        {
            field: 'totalMemory' as keyof Metric,
            headerName: 'Total Memory',
            flex: 1,
            renderCell: (params: GridCellParams) => params.value ? `${bytesToGigabytes(params.value as number)} GB` : null
        },
        {
            field: 'memoryUsage' as keyof Metric,
            headerName: 'Memory Usage',
            flex: 1,
            renderCell: (params: GridCellParams) => params.value ? `${bytesToGigabytes(params.value as number)} GB` : null
        },
        {
            field: 'memoryUsagePercentage' as keyof Metric,
            headerName: 'Memory Usage Percentage',
            flex: 1,
            renderCell: (params: GridCellParams) => params.value ? `${params.value as number}%` : null
        },
    ];

    useEffect(() => {
        if (firstRender.current) {
            api?.get(`/configurations`)
                .then(response => {
                    if (!response.ok) {
                        throw Error('Failed to fetch')
                    }

                    return response.body
                })
                .then((data: ApiConfiguration[]) => {
                    for (const configuration of data) {
                        if (!configuration.servers) {
                            continue;
                        }

                        for (const server of configuration.servers) {
                            api?.get(`/servers/${server.id}/metrics`)
                                .then(response => {
                                    if (!response.ok) {
                                        throw Error('Failed to fetch')
                                    }

                                    return response.body
                                })
                                .then((data: any) => {
                                    setMetrics(metrics => [...metrics, {
                                        configuration: configuration,
                                        server: server,
                                        ...data
                                    }]);
                                });
                        }
                    }
                })

            firstRender.current = false;
            return;
        }
    }, [api]);

    const bytesToGigabytes = (bytes: number) => {
        return (bytes / (1024 * 1024 * 1024)).toFixed(2);
    }

    return (

        <Box sx={{ height: '100%', width: '100%' }}>
            <DataGrid
                rows={metrics}
                columns={columns}
                autoHeight={true}
                getRowId={(row) => row.server.id}
                style={{ width: '100%' }}
            />
        </Box>
    );
}

export default NetworkStatus;