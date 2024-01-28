import React, {useState, useEffect, useCallback} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    LinearProgress, Typography, Grid, Card, CardContent, CardActions
} from '@mui/material';
import {useParams} from 'react-router-dom';
import { ApiConfiguration } from '../../types/ApiConfiguration';
import { ApiServer } from '../../types/ApiServer';
import UpsertServerModal from '../servers/UpsertServerModal';
import BooleanIcon from "../shared/BooleanIcon";
import UpsertConfigurationModal from "./UpsertConfigurationModal";
import ServerLink from "../servers/ServerLink";
import MonitorsStatus from "../monitors/MonitorsStatus";
import MonitorsList from "../monitors/MonitorsList";
import {enqueueSnackbar} from "notistack";
import AssociateNotificationChannel from "./AssociateNotificationChannel";
import ConfigurationNotificationChannelsList from "./ConfigurationNotificationChannelsList";

type RouteParams = {
    [key: number]: string;
};

const ConfigurationOverview: React.FC = () => {
    const { id } = useParams<RouteParams>() as { id: number };
    const [isLoadingConfiguration, setLoadingConfiguration] = useState(true);
    const [configuration, setConfiguration] = useState<ApiConfiguration | null>(null);
    const [isLoadingServers, setLoadingServers] = useState(true);
    const [servers, setServers] = useState<ApiServer[]>([]);
    const firstRender = React.useRef(true);

    const fetchServers = useCallback(() => {
        setLoadingServers(true)
        fetch(`${process.env.REACT_APP_API_HOST}/api/configurations/${id}/servers`)
            .then(response => response.json())
            .then(data => setServers(data))
            .catch((error) => {
                console.error('Error:', error);
                enqueueSnackbar('Failed to fetch server data!', {variant: 'error'});
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
                enqueueSnackbar('Failed to fetch configuration data!', {variant: 'error'});
                setConfiguration(null)
            })
            .finally(() => setLoadingConfiguration(false))
        ;
    }, [id]);

    useEffect(() => {
        if (firstRender.current) {
            fetchData();
            fetchServers();
            firstRender.current = false
        }
    }, [fetchData, fetchServers]);

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
            enqueueSnackbar(`No server found with id ${id}!`, {variant: 'error'});
        }
    };

    const handleRemoveServer = (id: number) => {
        fetch(`${process.env.REACT_APP_API_HOST}/api/servers/${id}`, {
            method: 'DELETE',
        }).then(() => {
            fetchServers()
            enqueueSnackbar('Server removed successfully!', {variant: 'success'});
        }).catch((error) => {
            console.error('Error:', error)
            enqueueSnackbar('Failed to remove server!', {variant: 'error'});
        });
    };

    return (
        <div>
            <Grid container spacing={1}>
                <Grid xs={12}>
                    <Typography variant="h5">Configuration Overview</Typography>
                </Grid>
                <Grid xs={12} md={4}>
                    {isLoadingConfiguration ? <LinearProgress /> : (configuration && (
                        <>
                            <UpsertConfigurationModal
                                open={openConfigurationModal}
                                fetchData={fetchData}
                                configuration={configuration}
                                handleClose={() => {setOpenConfigurationModal(false)}}
                            />
                            <Card>
                                <CardContent>
                                    <p>Name: {configuration.name}</p>
                                    <p>Chain: {configuration.chain}</p>
                                    <p>Is Enabled: <BooleanIcon value={configuration.is_enabled}/></p>
                                    <p>Created At: {new Date(configuration.createdAt).toLocaleString()}</p>
                                    <p>Updated At: {new Date(configuration.updatedAt).toLocaleString()}</p>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" size={"small"} color="warning" onClick={() => {setOpenConfigurationModal(true)}}>
                                        Edit
                                    </Button>
                                </CardActions>
                            </Card>
                        </>
                    ))}
                </Grid>
                <Grid xs={0} md={1}></Grid>
                <Grid xs={12} md={6}>
                    {configuration ? <>
                        <ConfigurationNotificationChannelsList configuration={configuration} />
                        <AssociateNotificationChannel configuration={configuration} />
                    </>: <LinearProgress />}
                </Grid>
            </Grid>

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
            {configuration ? <MonitorsList configuration={configuration} /> : <LinearProgress />}
        </div>
    );
}

export default ConfigurationOverview;