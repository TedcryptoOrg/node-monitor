import React, {useEffect, useState} from 'react';
import {
    AlertColor,
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
import Chains from "../Chains";

interface ConfigurationModalProps {
    open: boolean,
    fetchData: () => void;
    configuration: ApiConfiguration|null;
    sendNotification: (message: string, severity: AlertColor) => void;
    handleClose: any;
}
const UpsertConfigurationModal: React.FC<ConfigurationModalProps> = (
    {
        open,
        fetchData,
        configuration,
        sendNotification,
        handleClose
    }) => {
    const [name, setName] = useState(configuration ? configuration.name : '');
    const [chain, setChain] = useState(configuration ? configuration.chain : '');
    const [isEnabled, setIsEnabled] = useState(configuration ? configuration.is_enabled : true);

    useEffect(() => {
        setName(configuration ? configuration.name : '');
        setChain(configuration ? configuration.chain : '');
        setIsEnabled(configuration ? configuration.is_enabled : true);
    }, [configuration]);

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

        if (!name) {
            sendNotification('Please enter a name!', 'error');
            return;
        }
        if (!chain || chain === '') {
            sendNotification('Please enter a chain!', 'error');
            return;
        }

        const configurationInput = {
            name: name,
            chain: chain,
            is_enabled: isEnabled,
        };
        console.log('Form submitted', configurationInput)

        const url = configuration
            ? `${process.env.REACT_APP_API_HOST}/api/configurations/${configuration.id}`
            : `${process.env.REACT_APP_API_HOST}/api/configurations`;
        const method = configuration ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(configurationInput),
        })
            .then(response => {
                if (!response.ok) {
                    sendNotification('Failed to add monitor!', 'error');
                    return;
                }

                return response.json()
            })
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
                        <DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={name}
                                required
                                autoComplete={'off'}
                                onChange={e => setName(e.target.value)}
                            />
                        </DialogContentText>
                        <DialogContentText>
                            <Chains chain={chain} setChain={setChain} />
                        </DialogContentText>
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
                        <Button type="submit">{configuration ? 'Edit' : 'Add'}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default UpsertConfigurationModal;
