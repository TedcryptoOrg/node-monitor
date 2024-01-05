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

    const fetchServices = useCallback(() => {
        fetch(`${process.env.REACT_APP_API_HOST}/api/servers/${id}/services`)
            .then(response => response.json())
            .then(data => setServices(data));
    }, [id]);

    const fetchConfiguration = useCallback((id: number) => {
        fetch(`${process.env.REACT_APP_API_HOST}/api/configurations/${id}`)
            .then(response => response.json())
            .then(data => setConfiguration(data))
            .catch((error) => {
                sendNotification(`Error: ${error}`, 'error')
            });
    }, [setConfiguration])

    const fetchData = useCallback(() => {
        fetch(`${process.env.REACT_APP_API_HOST}/api/servers/${id}`)
            .then(response => response.json())
            .then(data => {
                setServer(data)
                fetchConfiguration(data.configuration_id)
            })
            .catch((error) => {
                sendNotification(`Error: ${error}`, 'error')
            });
    }, [id, fetchConfiguration]);

    useEffect(() => {
        fetchData();
        fetchServices();
    }, [fetchData, fetchServices]);

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

    return (
        <div>
            <h2>Server Overview</h2>
            {server && (
                <div>
                    <p>Configuration: <Link to={`/configurations/${server.configuration_id}`}>{configuration?.name}</Link></p>
                    <p>Name: {server.name}</p>
                    <p>Address: {server.address}</p>
                    <p>Is Enabled: {server.is_enabled ? 'Yes' : 'No'}</p>
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
                fetchData={fetchServices}
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
                                <TableCell>{service.is_enabled ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{service.type}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleEditService(service.id ?? 0)}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleRemoveService(service.id ?? 0)}>
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

export default ServerOverview;