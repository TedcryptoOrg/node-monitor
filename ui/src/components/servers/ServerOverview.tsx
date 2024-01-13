import React, { useState, useEffect, useCallback } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    AlertColor
} from '@mui/material';
import {Link, useParams} from 'react-router-dom';
import { ApiServer } from '../../types/ApiServer';
import { ApiService } from '../../types/ApiService';
import UpsertServiceModal from '../services/UpsertServiceModal';
import CustomSnackbar from '../shared/CustomSnackbar';
import {ApiConfiguration} from "../../types/ApiConfiguration";
import BooleanIcon from "../shared/BooleanIcon";
import UpsertMonitorModal from "../monitors/UpsertMonitorModal";
import {ApiMonitor} from "../../types/ApiMonitor";

type RouteParams = {
    [key: string]: string;
};

const ServerOverview: React.FC = () => {
    const { id } = useParams<RouteParams>() as { id: string };
    const [configuration, setConfiguration] = useState<ApiConfiguration | null>(null);
    const [server, setServer] = useState<ApiServer>({} as ApiServer);
    const [services, setServices] = useState<ApiService[]>([]);
    const [openServiceModal, setOpenServiceModal] = useState(false);
    const [editService, setEditService] = useState<ApiService|null>(null);
    const firstRender = React.useRef(true);

    const fetchServices = useCallback(() => {
        fetch(`${process.env.REACT_APP_API_HOST}/api/servers/${id}/services`)
            .then(response => response.json())
            .then(data => setServices(data));
    }, [id]);

    const fetchData = useCallback(() => {
        fetch(`${process.env.REACT_APP_API_HOST}/api/servers/${id}`)
            .then(response => response.json())
            .then(data => setServer(data))
            .catch((error) => sendNotification(`Error: ${error}`, 'error'));
    }, [id]);

    const fetchMonitors = useCallback(() => {
        fetch(`${process.env.REACT_APP_API_HOST}/api/servers/${id}/monitors`)
            .then(response => response.json())
            .then(data => setMonitors(data));
    }, [id])

    useEffect(() => {
        if (firstRender.current) {
            fetch(`${process.env.REACT_APP_API_HOST}/api/configurations/${id}`)
                .then(response => response.json())
                .then(data => setConfiguration(data))
                .catch((error) => {
                    sendNotification(`Error: ${error}`, 'error')
                });
            fetchData();
            fetchServices();
            fetchMonitors();
            firstRender.current = false
        }
    }, [id, setConfiguration, fetchData, fetchServices, fetchMonitors]);

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

    // Service modal
    const handleServiceModalOpen = () => {
        setOpenServiceModal(true);
    }

    const handleServiceModalClose = () => {
        setOpenServiceModal(false);
        setEditService(null)
    };

    const handleEditService = (id: number) => {
        const service = services.find((service: ApiService) => service.id === id);
        if (service) {
            setEditService(service)
            handleServiceModalOpen()
        } else {
            sendNotification('Service not found', 'error')
        }
    };

    const handleRemoveService = (id: number) => {
        fetch(`${process.env.REACT_APP_API_HOST}/api/services/${id}`, {
            method: 'DELETE',
        }).then(() => {
            fetchServices()
        }).catch((error) => {
            sendNotification(`Error: ${error}`, 'error')
        });
    };

    // Monitors
    const [monitors, setMonitors] = useState<ApiMonitor[]>([]);
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
            <h2>Server Overview</h2>
            {server && (
                <div>
                    <p>Configuration: <Link
                        to={`/configurations/${server.configuration_id}`}>{configuration?.name}</Link></p>
                    <p>Name: {server.name}</p>
                    <p>Address: {server.address}</p>
                    <p>Is Enabled: <BooleanIcon value={server.is_enabled}/></p>
                    <p>Created At: {server.createdAt ? new Date(server.createdAt).toLocaleString() : 'unknown'}</p>
                    <p>Updated At: {server.updatedAt ? new Date(server.updatedAt).toLocaleString() : 'unknown'}</p>
                </div>
            )}

            <h3>Services</h3>
            <Button variant="outlined" onClick={handleServiceModalOpen}>
                Add Service
            </Button>
            <UpsertServiceModal
                open={openServiceModal}
                fetchData={() => {fetchServices(); fetchMonitors();}}
                server={server}
                editService={editService}
                handleClose={handleServiceModalClose}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Is Enabled</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {services.map((service: ApiService) => (
                            <TableRow key={service.id}>
                                <TableCell>{service.id}</TableCell>
                                <TableCell>{service.name}</TableCell>
                                <TableCell>{service.address}</TableCell>
                                <TableCell><BooleanIcon value={service.is_enabled}/></TableCell>
                                <TableCell>{service.type}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary"
                                            onClick={() => handleEditService(service.id ?? 0)}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="secondary"
                                            onClick={() => handleRemoveService(service.id ?? 0)}>
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
                            <TableCell>Server ID</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Is Enabled</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {monitors.map((monitor) => (
                            <TableRow key={monitor.id}>
                                <TableCell>{monitor.id}</TableCell>
                                <TableCell>{monitor.server_id}</TableCell>
                                <TableCell>{monitor.type}</TableCell>
                                <TableCell>{monitor.name}</TableCell>
                                <TableCell><BooleanIcon value={monitor.is_enabled}/></TableCell>
                                <TableCell><BooleanIcon value={monitor.status ?? true}/></TableCell>
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

            <CustomSnackbar open={snackbarOpen} severity={snackbarSeverity} handleClose={handleCloseSnackBar}
                            message={snackbarMessage}/>
        </div>
    );
}

export default ServerOverview;