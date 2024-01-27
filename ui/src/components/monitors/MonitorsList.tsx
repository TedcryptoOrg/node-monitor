import {ApiMonitor} from "../../types/ApiMonitor";
import {
    Button, LinearProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import ServerLink from "../servers/ServerLink";
import BooleanIcon from "../shared/BooleanIcon";
import MonitorsStatus from "./MonitorsStatus";
import React, {useCallback, useEffect, useState} from "react";
import UpsertMonitorModal from "./UpsertMonitorModal";
import {ApiConfiguration} from "../../types/ApiConfiguration";
import {ApiServer} from "../../types/ApiServer";
import {enqueueSnackbar} from "notistack";

interface MonitorsListProps {
    configuration: ApiConfiguration,
    server?: ApiServer,
}

const MonitorsList: React.FC<MonitorsListProps> = ({configuration, server}) => {
    const [openMonitorModal, setModalOpen] = useState(false);
    const [editMonitor, setEditMonitor] = useState<ApiMonitor|null>(null);
    const [monitors, setMonitors] = useState<ApiMonitor[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(() => {
        setIsLoading(true)

        const url = server
            ? `${process.env.REACT_APP_API_HOST}/api/servers/${server.id}/monitors`
            : `${process.env.REACT_APP_API_HOST}/api/configurations/${configuration.id}/monitors`

        fetch(url)
            .then(response => response.json())
            .then(data => setMonitors(data))
            .catch((error) => {
                console.error('Error:', error);
                setMonitors([])
            })
            .finally(() => setIsLoading(false))
        ;
    }, [configuration.id, server])

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    const handleModalOpen = () => {
        setModalOpen(true);
    }

    const handleMonitorModalClose = () => {
        setEditMonitor(null);
        setModalOpen(false);
    };

    const handleEditMonitor = (id: number) => {
        const monitor = monitors.find((monitor: ApiMonitor) => monitor.id === id);
        if (monitor) {
            setEditMonitor(monitor)
            handleModalOpen()
        } else {
            enqueueSnackbar(`No monitor found with id ${id}`, {variant: 'error'});
        }
    };

    const handleRemoveMonitor = (id: number) => {
        fetch(`${process.env.REACT_APP_API_HOST}/api/monitors/${id}`, {
            method: 'DELETE',
        }).then(() => {
            fetchData()
            enqueueSnackbar('Monitor removed successfully!', {variant: 'success'});
        }).catch((error) => {
            console.error('Error:', error)
            enqueueSnackbar('Failed to remove monitor!', {variant: 'error'});
        });
    };

    return (
        <>
            <Button variant="outlined" onClick={handleModalOpen}>
                Add Monitor
            </Button>
            <UpsertMonitorModal
                open={openMonitorModal}
                fetchData={fetchData}
                configuration={configuration as ApiConfiguration}
                editMonitor={editMonitor}
                handleClose={handleMonitorModalClose}
            />
            {isLoading ? <LinearProgress /> : <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Server</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Is Enabled</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Last checked</TableCell>
                            <TableCell>Last error</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {monitors.map((monitor) => (
                            <TableRow key={monitor.id}>
                                <TableCell>{monitor.id}</TableCell>
                                <TableCell>
                                    {monitor.server && <ServerLink server={monitor.server} />}
                                </TableCell>
                                <TableCell>{monitor.type}</TableCell>
                                <TableCell>{monitor.name}</TableCell>
                                <TableCell><BooleanIcon value={monitor.is_enabled} /></TableCell>
                                <TableCell>
                                    <MonitorsStatus monitors={[monitor]} />
                                </TableCell>
                                <TableCell>{monitor.last_check?.toLocaleString()}</TableCell>
                                <TableCell>{monitor.last_error}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary"
                                            onClick={() => handleEditMonitor(monitor.id ?? 0)}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="secondary"
                                            onClick={() => handleRemoveMonitor(monitor.id ?? 0)}>
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
        </>
    );
};

export default MonitorsList;