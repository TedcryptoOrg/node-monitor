import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Select,
    MenuItem,
    FormControlLabel,
    FormControl, FormLabel
} from '@mui/material';
import { ApiService } from '../../types/ApiService';
import { ServiceTypeEnum } from '../../types/ServiceTypeEnum';
import {ApiServer} from "../../types/ApiServer";
import Switch from "@mui/material/Switch";
import { SelectChangeEvent } from '@mui/material';

interface UpsertServiceModalProps {
    open: boolean;
    fetchData: () => void;
    editService: ApiService | null;
    handleClose: () => void;
    server: ApiServer;
}

const UpsertServiceModal: React.FC<UpsertServiceModalProps> = (
    {
        open,
        fetchData,
        editService,
        handleClose,
        server
    }) => {
    const [name, setName] = useState(editService ? editService.name : '');
    const [address, setAddress] = useState(editService ? editService.address : '');
    const [isEnabled, setIsEnabled] = useState(editService ? editService.is_enabled : false);
    const [type, setType] = useState(editService ? editService.type : ServiceTypeEnum.RPC);

    useEffect(() => {
        setName(editService ? editService.name : '');
        setAddress(editService ? editService.address : server.address);
        setIsEnabled(editService ? editService.is_enabled : true);
        setType(editService ? editService.type : ServiceTypeEnum.RPC);
        if (editService === null) {
            setName(ServiceTypeEnum.RPC);
            setAddress(server.address + ':26657');
        }
    }, [editService, server]);

    const handleChangeType = (event: SelectChangeEvent) => {
        const selectedType = event.target.value as ServiceTypeEnum;

        if (name.length === 0 || name === type) {
            setName(selectedType);
        }

        switch (selectedType) {
            case ServiceTypeEnum.RPC:
                setAddress(server.address + ':26657');
                break;
            case ServiceTypeEnum.REST:
                setAddress(server.address + ':1317');
                break;
            case ServiceTypeEnum.PROMETHEUS:
                setAddress(server.address + ':26660');
                break;
            case ServiceTypeEnum.NODE_EXPORTER:
                setAddress(server.address + ':9100');
                break;
        }

        setType(selectedType);
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const service: ApiService = {
            name: name,
            address: address,
            is_enabled: isEnabled,
            type: type,
            server_id: server.id ?? 0,
        };

        const url = editService
            ? `${process.env.REACT_APP_API_HOST}/api/services/${editService.id}`
            : `${process.env.REACT_APP_API_HOST}/api/services`;
        const method = editService ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(service),
        })
            .then(response => {
                if (response.ok) {
                    fetchData();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        handleClose();
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editService ? 'Edit' : 'Add'} Service</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <DialogContentText>
                            Please enter the details for the service.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={name}
                            autoComplete={'off'}
                            onChange={e => setName(e.target.value)}
                        />
                        <FormControl>
                            <FormLabel>Type</FormLabel>
                            <Select
                                value={type}
                                onChange={handleChangeType}
                            >
                                {Object.values(ServiceTypeEnum).map((value) => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            margin="dense"
                            id="address"
                            label="Address"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={address}
                            autoComplete={'off'}
                            onChange={e => setAddress(e.target.value)}
                        />
                        <FormControlLabel
                            label="Is Enabled"
                            control={
                                <Switch
                                    checked={isEnabled}
                                    onChange={e => setIsEnabled(e.target.checked)}
                                    name="isEnabled"
                                    color="primary"
                                />
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">{editService ? 'Edit' : 'Add'}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default UpsertServiceModal;