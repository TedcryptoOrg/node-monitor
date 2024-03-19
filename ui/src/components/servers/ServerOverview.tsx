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
    DialogContent, DialogContentText, LinearProgress
} from '@mui/material';
import {useParams} from 'react-router-dom';
import { ApiServer } from '../../types/ApiServer';
import { ApiService } from '../../types/ApiService';
import UpsertServiceModal from '../services/UpsertServiceModal';
import BooleanIcon from "../shared/BooleanIcon";
import UpsertServerModal from "./UpsertServerModal";
import ConfigurationLink from "../configurations/ConfigurationLink";
import MonitorsList from "../monitors/MonitorsList";
import {enqueueSnackbar} from "notistack";

type RouteParams = {
    [key: string]: string;
};

const ServerOverview: React.FC = () => {
    const { id } = useParams<RouteParams>() as { id: string };
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
            .catch((error) => enqueueSnackbar(`Failed to fetch server data: ${error}`, {variant: 'error'}))
    }, [id]);

    useEffect(() => {
        if (firstRender.current) {
            fetchData();
            fetchServices();
            firstRender.current = false
        }
    }, [id, fetchData, fetchServices]);

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
            enqueueSnackbar(`No service found with id ${id}`, {variant: 'error'});
        }
    };

    const handleRemoveService = (id: number) => {
        fetch(`${process.env.REACT_APP_API_HOST}/api/services/${id}`, {
            method: 'DELETE',
        }).then(() => {
            enqueueSnackbar('Service removed.', {variant: 'success'})
            fetchServices()
        }).catch((error) => {
            enqueueSnackbar(`Failed to remove service: ${error}`, {variant: 'error'});
        });
    };

    // Server
    const [openServerModal, setOpenServerModal] = useState(false);

    return (
        <div>
            <h2>Server Overview</h2>
            {server && (
                <DialogContent>
                    <DialogContentText>
                        <p>
                            Configuration: {server.configuration && <ConfigurationLink configuration={server.configuration} />}
                        </p>
                        <p>Name: {server.name}</p>
                        <p>Address: {server.address}</p>
                        <p>Is Enabled: <BooleanIcon value={server.is_enabled}/></p>
                        <p>Created At: {server.created_at ? new Date(server.created_at).toLocaleString() : 'unknown'}</p>
                        <p>Updated At: {server.updated_at ? new Date(server.updated_at).toLocaleString() : 'unknown'}</p>
                    </DialogContentText>
                    <DialogContentText>
                        <UpsertServerModal
                            open={openServerModal}
                            fetchData={fetchData}
                            configurationId={server.configuration?.id}
                            handleClose={() => {setOpenServerModal(false)}}
                            editServer={server}
                        />
                        <Button variant="contained" color="primary" onClick={() => {setOpenServerModal(true)}}>
                            Edit
                        </Button>
                    </DialogContentText>
                </DialogContent>
            )}

            <h3>Services</h3>
            <Button variant="outlined" onClick={handleServiceModalOpen}>
                Add Service
            </Button>
            <UpsertServiceModal
                open={openServiceModal}
                fetchData={() => {fetchServices();}}
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
                                <TableCell>
                                    <BooleanIcon value={service.is_enabled}/>
                                </TableCell>
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
            {server.configuration ? <MonitorsList configuration={server.configuration} /> : <LinearProgress />}
        </div>
    );
}

export default ServerOverview;