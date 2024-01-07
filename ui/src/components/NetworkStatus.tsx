import React, {useEffect, useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {ApiConfiguration} from "../types/ApiConfiguration";
import {ApiServer} from "../types/ApiServer";

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
    const [metrics, setMetrics] = useState<Metric[]>([]);

    useEffect(() => {
        const fetchMetrics = async () => {
            const configurationsResponse = await fetch(`${process.env.REACT_APP_API_HOST}/api/configurations`);
            const configurations = await configurationsResponse.json();

            const metricsPromises = configurations.map(async (configuration: any) => {
                const serversResponse = await fetch(`${process.env.REACT_APP_API_HOST}/api/configurations/${configuration.id}/servers`);
                const servers = await serversResponse.json();

                return Promise.all(servers.map(async (server: any) => {
                    const metricsResponse = await fetch(`${process.env.REACT_APP_API_HOST}/api/servers/${server.id}/metrics`);
                    const metrics = await metricsResponse.json();

                    return {
                        ...metrics,
                        configuration,
                        server
                    };
                }));
            });

            const metrics = (await Promise.all(metricsPromises)).flat();
            setMetrics(metrics);
        };

        fetchMetrics();
    }, []);

    const bytesToGigabytes = (bytes: number) => {
        return (bytes / (1024 * 1024 * 1024)).toFixed(2);
    }

    return (
        <div>
            <h2>Network status</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Server</TableCell>
                            <TableCell>Total Disk Space</TableCell>
                            <TableCell>Used Disk Space</TableCell>
                            <TableCell>Free Disk Space</TableCell>
                            <TableCell>Used Disk Space Percentage</TableCell>
                            <TableCell>Total Memory</TableCell>
                            <TableCell>Memory Usage</TableCell>
                            <TableCell>Memory Usage Percentage</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {metrics.map((metric, index) => (
                            <TableRow key={index}>
                                <TableCell>{metric.server.name}</TableCell>
                                <TableCell>{bytesToGigabytes(metric.totalDiskSpace)} GB</TableCell>
                                <TableCell>{bytesToGigabytes(metric.freeDiskSpace)} GB</TableCell>
                                <TableCell>{bytesToGigabytes(metric.usedDiskSpace)} GB</TableCell>
                                <TableCell>{metric.usedDiskSpacePercentage}%</TableCell>
                                <TableCell>{bytesToGigabytes(metric.totalMemory)} GB</TableCell>
                                <TableCell>{bytesToGigabytes(metric.memoryUsage)} GB</TableCell>
                                <TableCell>{metric.memoryUsagePercentage}%</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default NetworkStatus;