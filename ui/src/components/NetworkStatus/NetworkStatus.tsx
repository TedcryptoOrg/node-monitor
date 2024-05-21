import React, {useEffect, useState} from 'react';
import {ApiConfiguration} from "../../types/ApiConfiguration";
import {DataGrid} from "@mui/x-data-grid";
import {Box} from "@mui/system";
import {useApi} from "../../context/ApiProvider";
import {ServerMetric} from "../../types/ServerMetric";
import {columns} from "./DataGrid/Columns";

const NetworkStatus: React.FC = () => {
    const api = useApi()
    const [metrics, setMetrics] = useState<ServerMetric[]>([]);
    const firstRender = React.useRef(true);

    const lazyFetchMetrics = () => {
        setMetrics((currentMetrics) => {
            for(const metric of currentMetrics) {
                api?.get(`/servers/${metric.server.id}/metrics`)
                    .then(response => {
                        if (!response.ok) {
                            metric.freeDiskSpace = null
                            metric.usedDiskSpace = null
                            metric.totalDiskSpace = null
                            metric.usedDiskSpacePercentage = null
                            metric.memoryUsage = null
                            metric.memoryUsagePercentage = null
                            metric.totalMemory = null
                            return null;
                        }

                        const data = response.body
                        metric.freeDiskSpace = data.freeDiskSpace;
                        metric.usedDiskSpace = data.usedDiskSpace;
                        metric.totalDiskSpace = data.totalDiskSpace;
                        metric.usedDiskSpacePercentage = data.usedDiskSpacePercentage;
                        metric.memoryUsage = data.memoryUsage;
                        metric.memoryUsagePercentage = data.memoryUsagePercentage;
                        metric.totalMemory = data.totalMemory;
                    })
                ;
            }
            return currentMetrics;
        });
    }

    useEffect(() => {
        if (firstRender.current) {
            console.log('firstRender')
            firstRender.current = false;
            api?.get(`/configurations`)
                .then(response => {
                    if (!response.ok) {
                        throw Error('Failed to fetch')
                    }

                    const data: ApiConfiguration[] = response.body
                    for (const configuration of data) {
                        if (!configuration.servers) {
                            continue;
                        }

                        for (const server of configuration.servers) {
                            setMetrics(metrics => [...metrics, {
                                configuration: configuration,
                                server: server,
                                freeDiskSpace: 0,
                                usedDiskSpace: 0,
                                totalDiskSpace: 0,
                                usedDiskSpacePercentage: 0,
                                memoryUsage: 0,
                                memoryUsagePercentage: 0,
                                totalMemory: 0
                            }]);
                        }
                    }

                    lazyFetchMetrics();
                })
        }
    }, [api]);

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