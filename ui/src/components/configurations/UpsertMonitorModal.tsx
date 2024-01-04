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
import {ApiConfiguration} from "../../types/ApiConfiguration";
import Switch from '@mui/material/Switch';

interface AddMonitorModalProps {
    open: boolean,
    fetchData: () => void;
    editMonitor: ApiConfiguration|null;
    handleClose: any;
}
const UpsertMonitorModal: React.FC<AddMonitorModalProps> = (
    {
        open,
        fetchData,
        editMonitor,
        handleClose
    }) => {
    const [name, setName] = useState(editMonitor ? editMonitor.name : '');
    const [chain, setChain] = useState(editMonitor ? editMonitor.chain : '');
    const [isEnabled, setIsEnabled] = useState(editMonitor ? editMonitor.is_enabled : true);

    useEffect(() => {
        setName(editMonitor ? editMonitor.name : '');
        setChain(editMonitor ? editMonitor.chain : '');
        setIsEnabled(editMonitor ? editMonitor.is_enabled : true);
    }, [editMonitor]);

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsEnabled(event.target.checked);
    };

    const customHandleClose = () => {
        setName('');
        setChain('');
        setIsEnabled(true);
        handleClose();
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const monitor = {
            name: name,
            chain: chain,
            is_enabled: isEnabled,
        };

        const url = editMonitor
            ? `${process.env.REACT_APP_API_HOST}/api/configurations/${editMonitor.id}`
            : `${process.env.REACT_APP_API_HOST}/api/configurations`;
        const method = editMonitor ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(monitor),
        })
            .then(response => response.json())
            .then(data => {
                fetchData();
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        customHandleClose();
    };

    return (
        <>
            <Dialog open={open} onClose={customHandleClose}>
                <DialogTitle>Add Monitor</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <DialogContentText>
                            Please enter the name and chain for the monitor.
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
                            id="chain"
                            label="Chain"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={chain}
                            onChange={e => setChain(e.target.value)}
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
                        <Button type="submit">{editMonitor ? 'Edit' : 'Add'}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default UpsertMonitorModal;
