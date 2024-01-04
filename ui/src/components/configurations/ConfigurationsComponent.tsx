import React, { useState, useEffect, useCallback } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import UpsertMonitorModal from './UpsertMonitorModal';
import CustomSnackbar from "../shared/CustomSnackbar";
import { AlertColor } from '@mui/material';
import { Link } from 'react-router-dom';

const ConfigurationsComponent: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const [configurationsData, setConfigurationsData] = useState([]);
    const [editMonitor, setEditMonitor] = useState(null);

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
        fetch(`${process.env.REACT_APP_API_HOST}/api/configurations`)
            .then(response => {
                if (!response.ok) {
                    sendNotification('Failed to fetch configuration data!', 'error')
                }
                return response.json();
            })
            .then(data => setConfigurationsData(data));
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
        fetchData();
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
                Add Monitor
            </Button>
            <UpsertMonitorModal open={openModal} fetchData={fetchData} editMonitor={editMonitor} handleClose={handleModalClose}/>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Chain</TableCell>
                            <TableCell>Is Enabled</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {configurationsData.map((row: any) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.chain}</TableCell>
                                <TableCell>{row.is_enabled ? 'Yes' : 'No'}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" component={Link} to={`/configurations/${row.id}`}>
                                        View
                                    </Button>
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
            </TableContainer>
            <CustomSnackbar open={snackbarOpen} severity={snackbarSeverity} handleClose={handleCloseSnackBar} message={snackbarMessage} />
        </div>
    );
}

export default ConfigurationsComponent;