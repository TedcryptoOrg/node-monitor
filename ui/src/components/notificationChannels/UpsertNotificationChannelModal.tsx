import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl,
    FormControlLabel, FormLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Stack,
    TextField
} from '@mui/material';
import Switch from '@mui/material/Switch';
import {ApiNotificationChannel, ApiNotificationChannelInput} from "../../types/ApiNotificationChannel";
import {NotificationChannelTypeEnum} from "./NotificationChannelType";
import {useSnackbar} from "notistack";

interface UpsertNotificationChannelModalProps {
    open: boolean,
    fetchData: () => void;
    notificationChannel: ApiNotificationChannel|null;
    handleClose: any;
}
const UpsertNotificationChannelModal: React.FC<UpsertNotificationChannelModalProps> = (
    {
        open,
        fetchData,
        notificationChannel,
        handleClose
    }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [name, setName] = useState(notificationChannel ? notificationChannel.name : '');
    const [type, setType] = useState<NotificationChannelTypeEnum|null>(notificationChannel ? notificationChannel.type : null);
    const [configurationObject, setConfigurationObject] = useState(notificationChannel ? notificationChannel.configuration_object : {});
    const [isEnabled, setIsEnabled] = useState(notificationChannel ? notificationChannel.is_enabled : true);

    useEffect(() => {
        setName(notificationChannel ? notificationChannel.name : '');
        setType(notificationChannel ? notificationChannel.type : null);
        setConfigurationObject(notificationChannel ? notificationChannel.configuration_object : {});
        setIsEnabled(notificationChannel ? notificationChannel.is_enabled : true);
    }, [notificationChannel]);

    const customHandleClose = () => {
        setName('')
        setType(null)
        setConfigurationObject({})
        setIsEnabled(true);

        handleClose();
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!name) {
            enqueueSnackbar('Please enter a name!', {variant: 'error'});
            return;
        }
        if (type === null) {
            enqueueSnackbar('Please select a type!', {variant: 'error'});
            return;
        }

        const notificationChannelInput: ApiNotificationChannelInput = {
            name: name,
            type: type,
            configuration_object: JSON.stringify(configurationObject ?? {}),
            is_enabled: isEnabled,
        };

        const url = notificationChannel
            ? `${process.env.REACT_APP_API_HOST}/api/notification-channels/${notificationChannel.id}`
            : `${process.env.REACT_APP_API_HOST}/api/notification-channels`;
        const method = notificationChannel ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(notificationChannelInput),
        })
            .then(response => {
                if (!response.ok) {
                    enqueueSnackbar('Failed to add notification channel!', {variant:'error'});
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
                <DialogTitle>Add Notification Channel</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Stack spacing={2}>
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
                            <FormControl fullWidth>
                                <InputLabel id="type-select-label">Type*</InputLabel>
                                <Select
                                    labelId="type-select-label"
                                    id="demo-simple-select"
                                    value={type ?? ''}
                                    required
                                    label="Type*"
                                    onChange={(event: SelectChangeEvent) => setType(event.target.value as NotificationChannelTypeEnum)}
                                >
                                    {Object.values(NotificationChannelTypeEnum).map((value) => (
                                        <MenuItem key={value} value={value}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControlLabel
                                label="Is Enabled"
                                control={
                                    <Switch
                                        checked={isEnabled}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setIsEnabled(event.target.checked)}
                                        name="isEnabled"
                                        color="primary"
                                    />
                                }
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={customHandleClose}>Cancel</Button>
                        <Button type="submit">{notificationChannel ? 'Edit' : 'Add'}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default UpsertNotificationChannelModal;
