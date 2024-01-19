import React, {useEffect, useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel} from '@mui/material';
import {ApiConfiguration} from "../types/ApiConfiguration";
import {ApiServer} from "../types/ApiServer";
import ConfigurationLink from "./shared/ConfigurationLink";
import ServerLink from "./shared/ServerLink";

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
    const firstRender = React.useRef(true);

    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState('');

    const handleSort = (property: keyof Metric) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedMetrics = [...metrics].sort((a, b) => {
        const keyA = Number(a[orderBy as keyof Metric]);
        const keyB = Number(b[orderBy as keyof Metric]);

        if (order === 'asc') {
            return keyA > keyB ? 1 : -1;
        } else {
            return keyA < keyB ? 1 : -1;
        }
    });

    useEffect(() => {
        if (firstRender.current) {
            fetch(`${process.env.REACT_APP_API_HOST}/api/configurations`)
                .then(response => response.json())
                .then((data: ApiConfiguration[]) => {
                    for (const configuration of data) {
                        if (!configuration.servers) {
                            continue;
                        }

                        for (const server of configuration.servers) {
                            fetch(`${process.env.REACT_APP_API_HOST}/api/servers/${server.id}/metrics`)
                                .then(response => response.json())
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
                            <TableCell>Configuration</TableCell>
                            <TableCell>Server</TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'totalDiskSpace'}
                                    direction={orderBy === 'totalDiskSpace' ? order : 'asc'}
                                    onClick={() => handleSort('totalDiskSpace')}
                                >
                                    Total Disk Space
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'usedDiskSpace'}
                                    direction={orderBy === 'usedDiskSpace' ? order : 'asc'}
                                    onClick={() => handleSort('usedDiskSpace')}
                                >
                                    Used Disk Space
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'freeDiskSpace'}
                                    direction={orderBy === 'freeDiskSpace' ? order : 'asc'}
                                    onClick={() => handleSort('freeDiskSpace')}
                                >
                                    Free Disk Space
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'usedDiskSpacePercentage'}
                                    direction={orderBy === 'usedDiskSpacePercentage' ? order : 'asc'}
                                    onClick={() => handleSort('usedDiskSpacePercentage')}
                                 >
                                    Used Disk Space Percentage
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'totalMemory'}
                                    direction={orderBy === 'totalMemory' ? order : 'asc'}
                                    onClick={() => handleSort('totalMemory')}
                                >
                                    Total Memory
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'memoryUsage'}
                                    direction={orderBy === 'memoryUsage' ? order : 'asc'}
                                    onClick={() => handleSort('memoryUsage')}
                                >
                                    Memory Usage
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'memoryUsagePercentage'}
                                    direction={orderBy === 'memoryUsagePercentage' ? order : 'asc'}
                                    onClick={() => handleSort('memoryUsagePercentage')}
                                >
                                    Memory Usage Percentage
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedMetrics.map((metric, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <ConfigurationLink configuration={metric.configuration} />
                                </TableCell>
                                <TableCell>
                                    <ServerLink server={metric.server} />
                                </TableCell>
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