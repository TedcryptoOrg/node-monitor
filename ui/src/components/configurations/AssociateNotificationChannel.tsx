import React, { useEffect, useState } from 'react';
import {Button, Grid} from '@mui/material';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import { ApiNotificationChannel } from '../../types/ApiNotificationChannel';
import { ApiConfiguration } from '../../types/ApiConfiguration';
import {enqueueSnackbar} from "notistack";
import {ApiConfigurationNotificationChannelInput} from "../../types/ApiConfigurationNotificationChannel";
import {eventEmitter} from "../../services/Events/EventEmitter";
import {EventsEnum} from "../../services/Events/EventsEnum";

interface AssociateNotificationChannelProps {
    configuration: ApiConfiguration;
}

const AssociateNotificationChannel: React.FC<AssociateNotificationChannelProps> = ({ configuration }) => {
    const [notificationChannels, setNotificationChannels] = useState<ApiNotificationChannel[]>([]);
    const [selectedChannel, setSelectedChannel] = useState<ApiNotificationChannel | null>(null);
    const firstRender = React.useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            fetch(`${process.env.REACT_APP_API_HOST}/api/notification-channels`)
                .then(response => response.json())
                .then(data => setNotificationChannels(data));
            firstRender.current = false;
        }
    }, [setNotificationChannels, firstRender]);

    const handleAdd = () => {
        if (!selectedChannel) {
            enqueueSnackbar('Please select a notification channel!', {variant: 'error'});
            return;
        }
        const configurationNotificationChannel: ApiConfigurationNotificationChannelInput = {
            configuration_id: configuration.id,
            notification_channel_id: selectedChannel.id,
        }
        fetch(`${process.env.REACT_APP_API_HOST}/api/configurations/${configuration.id}/notification-channels`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(configurationNotificationChannel),
        })
            .then(async (response) => {
                if (!response.ok) {
                    const data = await response.json()
                    throw new Error(data.message ?? response.statusText)
                }

                return response
            })
            .then(response => response.json())
            .then(data => {
                setSelectedChannel(null);
                eventEmitter.emit(EventsEnum.NOTIFICATION_CHANNEL_ASSOCIATED);
                enqueueSnackbar(`Successfully associated notification channel`, {variant: 'success'})
            })
            .catch((error) => enqueueSnackbar(`Failed to associate notification channel: ${error}`, {variant: 'error'}))
        ;
    };

    return (
        <Grid container spacing={0} paddingTop={2}>
            <Grid xs={12}>
                <Autocomplete
                    options={notificationChannels}
                    getOptionLabel={(option) => option.name}
                    value={selectedChannel}
                    onChange={(event, newValue) => {
                        setSelectedChannel(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Notification Channels" required variant="outlined" />}
                />
            </Grid>
            <Grid xs={12}>
                <Button variant="contained" color="primary" fullWidth onClick={handleAdd}>
                    Add
                </Button>
            </Grid>
        </Grid>
    );
};

export default AssociateNotificationChannel;