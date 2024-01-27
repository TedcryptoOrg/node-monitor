import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    TextField
} from '@mui/material';
import {ApiServer, ApiServerInput} from "../../types/ApiServer";
import Switch from '@mui/material/Switch';
import {enqueueSnackbar} from "notistack";

interface UpsertServerModalProps {
    open: boolean,
    fetchData: () => void;
    configurationId: number;
    editServer?: ApiServer|null;
    handleClose: any;
}

const UpsertServerModal: React.FC<UpsertServerModalProps> = (
    {
        open,
        fetchData,
        editServer,
        handleClose,
        configurationId
    }) => {
    const [name, setName] = useState(editServer ? editServer.name : '');
    const [isEnabled, setIsEnabled] = useState(editServer ? editServer.is_enabled : true);
    const [address, setAddress] = useState(editServer ? editServer.address : '');

    useEffect(() => {
        setName(editServer ? editServer.name : '');
        setIsEnabled(editServer ? editServer.is_enabled : true);
        setAddress(editServer ? editServer.address : '');
    }, [editServer]);

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsEnabled(event.target.checked);
    };

    const customHandleClose = () => {
        setName('');
        setIsEnabled(true);
        setAddress('');
        handleClose();
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const server: ApiServerInput = {
            name: name,
            is_enabled: isEnabled,
            address: address,
            configuration_id: configurationId
        };

        const url = editServer
            ? `${process.env.REACT_APP_API_HOST}/api/servers/${editServer.id}`
            : `${process.env.REACT_APP_API_HOST}/api/servers`
        const method = editServer ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(server),
        })
            .then(response => {
                if (!response.ok) {
                    enqueueSnackbar(`Failed to ${editServer ? 'edit' : 'add'} server.`, {variant: 'error'});
                } else {
                    enqueueSnackbar(`${editServer ? 'Edited' : 'Added'} server successfully!`, {variant: 'success'});
                }
                fetchData();

                return response;
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        customHandleClose();
    };

    return (
        <>
            <Dialog open={open} onClose={customHandleClose}>
                <DialogTitle>{editServer ? 'Edit' : 'Add' } Server</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <DialogContentText>
                            Please enter details to {editServer ? 'edit' : 'add'} a server.
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
                                    onChange={handleSwitchChange}
                                    name="isEnabled"
                                    color="primary"
                                />
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={customHandleClose}>Cancel</Button>
                        <Button type="submit">{editServer ? 'Edit' : 'Add'}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default UpsertServerModal;