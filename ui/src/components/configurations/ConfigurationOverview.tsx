import React, {useState, useEffect, useCallback} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    AlertColor,
    Button,
    DialogContent, DialogContentText, LinearProgress
} from '@mui/material';
import {useParams} from 'react-router-dom';
import { ApiConfiguration } from '../../types/ApiConfiguration';
import { ApiServer } from '../../types/ApiServer';
import CustomSnackbar from "../shared/CustomSnackbar";
import UpsertServerModal from '../servers/UpsertServerModal';
import {ApiMonitor} from "../../types/ApiMonitor";
import UpsertMonitorModal from "../monitors/UpsertMonitorModal";
import BooleanIcon from "../shared/BooleanIcon";
import UpsertConfigurationModal from "./UpsertConfigurationModal";
import ServerLink from "../shared/ServerLink";
import MonitorsStatus from "../shared/MonitorsStatus";

type RouteParams = {
    [key: number]: string;
};

const ConfigurationOverview: React.FC = () => {
    const { id } = useParams<RouteParams>() as { id: number };
    const [isLoadingConfiguration, setLoadingConfiguration] = useState(true);
    const [configuration, setConfiguration] = useState<ApiConfiguration | null>(null);
    const [isLoadingServers, setLoadingServers] = useState(true);
    const [servers, setServers] = useState<ApiServer[]>([]);
    const [isLoadingMonitors, setLoadingMonitors] = useState(true);
    const [monitors, setMonitors] = useState<ApiMonitor[]>([]);
    const firstRender = React.useRef(true);

    const fetchMonitors = useCallback(() => {
        setLoadingMonitors(true)
        fetch(`${process.env.REACT_APP_API_HOST}/api/configurations/${id}/monitors`)
            .then(response => response.json())
            .then(data => setMonitors(data))
            .catch((error) => {
                console.error('Error:', error);
                setMonitors([])
            })
            .finally(() => setLoadingMonitors(false))
        ;
    }, [id])

    const fetchServers = useCallback(() => {
        setLoadingServers(true)
        fetch(`${process.env.REACT_APP_API_HOST}/api/configurations/${id}/servers`)
            .then(response => response.json())
            .then(data => setServers(data))
            .catch((error) => {
                console.error('Error:', error);
                sendNotification('Failed to fetch server data!', 'error')
                setServers([])
            })
            .finally(() => setLoadingServers(false))
    }, [id]);

    const fetchData = useCallback(() => {
        setLoadingConfiguration(true)
        fetch(`${process.env.REACT_APP_API_HOST}/api/configurations/${id}`)
            .then(response => response.json())
            .then(data => setConfiguration(data))
            .catch((error) => {
                console.error('Error:', error);
                sendNotification('Failed to fetch configuration data!', 'error')
                setConfiguration(null)
            })
            .finally(() => setLoadingConfiguration(false))
        ;
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

    // Configuration
    const [openConfigurationModal, setOpenConfigurationModal] = useState(false);

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
            sendNotification('Failed to remove monitor!', 'error')
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
            sendNotification('Failed to remove monitor!', 'error')
        });
    };

    return (
        <div>
            <h2>Configuration Overview</h2>
            {isLoadingConfiguration ? <LinearProgress /> : (configuration && (
                <DialogContent>
                    <DialogContentText>
                        <p>Name: {configuration.name}</p>
                        <p>Chain: {configuration.chain}</p>
                        <p>Is Enabled: <BooleanIcon value={configuration.is_enabled}/></p>
                        <p>Created At: {new Date(configuration.createdAt).toLocaleString()}</p>
                        <p>Updated At: {new Date(configuration.updatedAt).toLocaleString()}</p>
                    </DialogContentText>
                    <DialogContentText>
                        <UpsertConfigurationModal
                            open={openConfigurationModal}
                            fetchData={fetchData}
                            configuration={configuration}
                            sendNotification={sendNotification}
                            handleClose={() => {setOpenConfigurationModal(false)}}
                            />
                        <Button variant="contained" color="primary" onClick={() => {setOpenConfigurationModal(true)}}>
                            Edit
                        </Button>
                    </DialogContentText>
                </DialogContent>
            ))}

            <h3>Servers</h3>
            <Button variant="outlined" onClick={handleServerModalOpen}>
                Add Server
            </Button>
            <UpsertServerModal
                open={openServerModal}
                fetchData={fetchServers}
                configurationId={id}
                editServer={editServer}
                sendNotification={sendNotification}
                handleClose={handleServerModalClose}
            />
            {isLoadingServers ? <LinearProgress /> : (<TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Is Enabled</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {servers.map((server) => (
                            <TableRow key={server.id}>
                                <TableCell>{server.id}</TableCell>
                                <TableCell>
                                    <ServerLink server={server} />
                                </TableCell>
                                <TableCell>{server.address}</TableCell>
                                <TableCell>
                                    <BooleanIcon value={server.is_enabled} />
                                </TableCell>
                                <TableCell>
                                    <MonitorsStatus monitors={server.monitors ?? []} />
                                </TableCell>
                                <TableCell>
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
            </TableContainer>)}


            <h3>Monitors</h3>
            <Button variant="outlined" onClick={handleMonitorModalOpen}>
                Add Monitor
            </Button>
            <UpsertMonitorModal
                open={openMonitorModal}
                fetchData={fetchMonitors}
                configuration={configuration as ApiConfiguration}
                editMonitor={editMonitor}
                sendNotification={sendNotification}
                handleClose={handleMonitorModalClose}
            />
            {isLoadingMonitors ? <LinearProgress/> : (
                <TableContainer component={Paper}>
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
                </TableContainer>)}

            <CustomSnackbar open={snackbarOpen} severity={snackbarSeverity} handleClose={handleCloseSnackBar} message={snackbarMessage} />
        </div>
    );
}

export default ConfigurationOverview;