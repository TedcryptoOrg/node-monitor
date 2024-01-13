import React, {useState, useEffect, useCallback} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, AlertColor, Button} from '@mui/material';
import {Link, useParams} from 'react-router-dom';
import { ApiConfiguration } from '../../types/ApiConfiguration';
import { ApiServer } from '../../types/ApiServer';
import CustomSnackbar from "../shared/CustomSnackbar";
import UpsertServerModal from '../servers/UpsertServerModal';
import {ApiMonitor} from "../../types/ApiMonitor";
import UpsertMonitorModal from "../monitors/UpsertMonitorModal";

type RouteParams = {
    [key: number]: string;
};

const ConfigurationOverview: React.FC = () => {
    const { id } = useParams<RouteParams>() as { id: number };
    const [configuration, setConfiguration] = useState<ApiConfiguration | null>(null);
    const [servers, setServers] = useState<ApiServer[]>([]);
    const [monitors, setMonitors] = useState<ApiMonitor[]>([]);
    const firstRender = React.useRef(true);

    const fetchMonitors = useCallback(() => {
        fetch(`${process.env.REACT_APP_API_HOST}/api/configurations/${id}/monitors`)
            .then(response => response.json())
            .then(data => setMonitors(data));
    }, [id])

    const fetchServers = useCallback(() => {
        fetch(`${process.env.REACT_APP_API_HOST}/api/configurations/${id}/servers`)
            .then(response => response.json())
            .then(data => setServers(data));
    }, [id]);

    const fetchData = useCallback(() => {
        fetch(`${process.env.REACT_APP_API_HOST}/api/configurations/${id}`)
            .then(response => response.json())
            .then(data => setConfiguration(data));
    }, [id]);

    useEffect(() => {
        if (firstRender.current) {
            fetchData();
            fetchServers();
            fetchMonitors();
            firstRender.current = false
        }
    }, [fetchData, fetchServers, fetchMonitors]);

    // snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('error');

    const sendNotification = (message: string, severity: AlertColor) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    }

    const handleCloseSnackBar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    // Upsert server
    const [openServerModal, setOpenServerModal] = useState(false);
    const [editServer, setEditServer] = useState<ApiServer|null>(null);

    const handleServerModalOpen = () => {
        setOpenServerModal(true);
    }

    const handleServerModalClose = () => {
        setEditServer(null);
        setOpenServerModal(false);
    };

    const handleEditServer = (id: number) => {
        const server = servers.find((server: ApiServer) => server.id === id);
        if (server) {
            setEditServer(server)
            handleServerModalOpen()
        } else {
            sendNotification(`No server found with id ${id}`, 'error')
        }
    };

    const handleRemoveServer = (id: number) => {
        fetch(`${process.env.REACT_APP_API_HOST}/api/servers/${id}`, {
            method: 'DELETE',
        }).then(() => {
            fetchServers()
            sendNotification('Monitor removed successfully!', 'success')
        }).catch((error) => {
            console.error('Error:', error)
        });
    };

    // Monitors
    const [openMonitorModal, setOpenMonitorModal] = useState(false);
    const [editMonitor, setEditMonitor] = useState<ApiMonitor|null>(null);

    const handleMonitorModalOpen = () => {
        setOpenMonitorModal(true);
    }

    const handleMonitorModalClose = () => {
        setEditMonitor(null);
        setOpenMonitorModal(false);
    };

    const handleEditMonitor = (id: number) => {
        const monitor = monitors.find((monitor: ApiMonitor) => monitor.id === id);
        if (monitor) {
            setEditMonitor(monitor)
            handleMonitorModalOpen()
        } else {
            sendNotification(`No monitor found with id ${id}`, 'error')
        }
    };

    const handleRemoveMonitor = (id: number) => {
        fetch(`${process.env.REACT_APP_API_HOST}/api/monitors/${id}`, {
            method: 'DELETE',
        }).then(() => {
            fetchMonitors()
            sendNotification('Monitor removed successfully!', 'success')
        }).catch((error) => {
            console.error('Error:', error)
        });
    };

    return (
        <div>
            <h2>Configuration Overview</h2>
            {configuration && (
                <div>
                    <p>Name: {configuration.name}</p>
                    <p>Chain: {configuration.chain}</p>
                    <p>Is Enabled: {configuration.is_enabled ? 'Yes' : 'No'}</p>
                    <p>Created At: {new Date(configuration.createdAt).toLocaleString()}</p>
                    <p>Updated At: {new Date(configuration.updatedAt).toLocaleString()}</p>
                </div>
            )}

            <h3>Servers</h3>
            <Button variant="outlined" onClick={handleServerModalOpen}>
                Add Server
            </Button>
            <UpsertServerModal
                open={openServerModal}
                fetchData={fetchServers}
                configurationId={id}
                editServer={editServer}
                handleClose={handleServerModalClose}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Is Enabled</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {servers.map((server) => (
                            <TableRow key={server.id}>
                                <TableCell>{server.id}</TableCell>
                                <TableCell>{server.name}</TableCell>
                                <TableCell>{server.address}</TableCell>
                                <TableCell>{server.is_enabled ? 'Yes' : 'No'}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" component={Link} to={`/servers/${server.id}`}>
                                        View
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={() => handleEditServer(server.id ?? 0)}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleRemoveServer(server.id ?? 0)}>
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <h3>Monitors</h3>
            <Button variant="outlined" onClick={handleMonitorModalOpen}>
                Add Monitor
            </Button>
            <UpsertMonitorModal
                open={openMonitorModal}
                fetchData={fetchMonitors}
                configuration={configuration as ApiConfiguration}
                editMonitor={editMonitor}
                handleClose={handleMonitorModalClose}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Is Enabled</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {monitors.map((monitor) => (
                            <TableRow key={monitor.id}>
                                <TableCell>{monitor.id}</TableCell>
                                <TableCell>{monitor.type}</TableCell>
                                <TableCell>{monitor.name}</TableCell>
                                <TableCell>{monitor.is_enabled ? 'Yes' : 'No'}</TableCell>
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
            </TableContainer>

            <CustomSnackbar open={snackbarOpen} severity={snackbarSeverity} handleClose={handleCloseSnackBar} message={snackbarMessage} />
        </div>
    );
}

export default ConfigurationOverview;