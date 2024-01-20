import React, { useState, useEffect, useCallback } from 'react';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    LinearProgress
} from '@mui/material';
import UpsertConfigurationModal from './UpsertConfigurationModal';
import CustomSnackbar from "../shared/CustomSnackbar";
import { AlertColor } from '@mui/material';
import BooleanIcon from "../shared/BooleanIcon";
import ConfigurationLink from "./ConfigurationLink";
import MonitorsStatus from "../monitors/MonitorsStatus";

const ConfigurationsComponent: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [configurationsData, setConfigurationsData] = useState([]);
    const [editMonitor, setEditMonitor] = useState(null);
    const firstRender = React.useRef(true);

    // snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('error');

    const sendNotification = (message: string, severity: AlertColor) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    }

    const fetchData = useCallback(() => {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_HOST}/api/configurations`)
            .then(response => {
                if (!response.ok) {
                    sendNotification('Failed to fetch configuration data!', 'error')
                }
                return response.json();
            })
            .then(data => setConfigurationsData(data))
            .catch((error) => {
                console.error('Error:', error);
                setConfigurationsData([])
            })
            .finally(() => setIsLoading(false));
    }, []);

    const handleModalOpen = () => {
        setOpenModal(true);
    }

    const handleModalClose = () => {
        setOpenModal(false)
        setEditMonitor(null)
    };

    const handleCloseSnackBar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    useEffect(() => {
        if (firstRender.current) {
            fetchData();
            firstRender.current = false;
        }
    }, [fetchData]);

    const handleEdit = (id: number) => {
        console.log('edit' , id , configurationsData)
        const monitor = configurationsData.find((monitor: any) => monitor.id === id);
        if (monitor) {
            setEditMonitor(monitor)
            setOpenModal(true)
        } else {
            console.error(`No monitor found with id ${id}`);
        }
    };

    const handleRemove = (id: number) => {
        fetch(`${process.env.REACT_APP_API_HOST}/api/configurations/${id}`, {
            method: 'DELETE',
        }).then(() => {
            fetchData()
            sendNotification('Monitor removed successfully!', 'success')
        }).catch((error) => {
            console.error('Error:', error)
        });
    };

    return (
        <div>
            <h2>Configurations</h2>
            <p>Your main configurations</p>
            <Button variant="outlined" onClick={handleModalOpen}>
                Add Configuration
            </Button>
            <UpsertConfigurationModal
                open={openModal}
                fetchData={fetchData}
                configuration={editMonitor}
                sendNotification={sendNotification}
                handleClose={handleModalClose}
            />
            {isLoading ? <LinearProgress /> : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Chain</TableCell>
                                <TableCell>Is Enabled</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {configurationsData.map((row: any) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>
                                        <ConfigurationLink configuration={row} />
                                    </TableCell>
                                    <TableCell>{row.chain}</TableCell>
                                    <TableCell>
                                        <BooleanIcon value={row.is_enabled} />
                                    </TableCell>
                                    <TableCell>
                                        <MonitorsStatus monitors={row.monitors} />
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => handleEdit(row.id)}>
                                            Edit
                                        </Button>
                                        <Button variant="contained" color="secondary" onClick={() => handleRemove(row.id)}>
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

export default ConfigurationsComponent;