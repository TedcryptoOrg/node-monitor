import {
    Button,
    LinearProgress,
    Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import React, {useCallback, useEffect, useRef, useState} from "react";
import BooleanIcon from "../Shared/BooleanIcon";
import {enqueueSnackbar} from "notistack";
import {ApiConfiguration} from "../../types/ApiConfiguration";
import {ApiConfigurationNotificationChannel} from "../../types/ApiConfigurationNotificationChannel";
import {eventEmitter} from "../../services/Events/EventEmitter";
import {EventsEnum} from "../../services/Events/EventsEnum";
import {useApi} from "../../context/ApiProvider";

export interface NotificationChannelsListProps {
    configuration: ApiConfiguration
}

const ConfigurationNotificationChannelsList: React.FC<NotificationChannelsListProps> = ({configuration}) => {
    const api = useApi();
    const [notificationChannels, setNotificationChannels] = useState<ApiConfigurationNotificationChannel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const isFirstRender = useRef(true);

    eventEmitter.on(EventsEnum.NOTIFICATION_CHANNEL_ASSOCIATED, () => {
        fetchData()
    });

    const fetchData = useCallback(() => {
        setIsLoading(true)
        api?.get(`/configurations/${configuration.id}/notification-channels`)
            .then(response => {
                if (!response.ok) {
                    throw Error('Failed to fetch')
                }

                return response.body
            })
            .then(data => setNotificationChannels(data))
            .catch((error) => {
                console.error('Error:', error);
                setNotificationChannels([])
            })
            .finally(() => setIsLoading(false))
        ;
    }, [configuration.id, setNotificationChannels, setIsLoading, api])

    useEffect(() => {
        if (isFirstRender.current) {
            fetchData()
            isFirstRender.current = false
        }
    }, [fetchData]);

    const handleRemove = (id: number) => {
        api?.delete(`/configurations/${configuration.id}/notification-channels/${id}`).then(() => {
            fetchData()
            enqueueSnackbar(`Notification channel removed successfully`, {variant: 'success'})
        }).catch((error) => {
            console.error('Error:', error)
            enqueueSnackbar(`Error when deleting notification channel`, {variant: 'error'});
        });
    };

    return (
        <>
            <Typography typography={"h5"}>Configuration Notification Channels</Typography>
            {isLoading ? <LinearProgress/> : (<>
                {isLoading ? <LinearProgress /> : <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Enabled</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {notificationChannels.map((notificationChannel) => (
                                <TableRow key={notificationChannel.id}>
                                    <TableCell>{notificationChannel.id}</TableCell>
                                    <TableCell>{notificationChannel.notification_channel.type}</TableCell>
                                    <TableCell>{notificationChannel.notification_channel.name}</TableCell>
                                    <TableCell>
                                        <BooleanIcon value={notificationChannel.notification_channel.is_enabled} />
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="secondary"
                                                onClick={() => handleRemove(notificationChannel.id ?? 0)}>
                                            Remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>}
            </>)}
        </>
    )
}

export default ConfigurationNotificationChannelsList;
