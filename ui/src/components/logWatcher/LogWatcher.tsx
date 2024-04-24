import React, {useEffect, useState} from 'react';
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Grid, TextField, Card, CardContent, Button
} from '@mui/material';
import WebSocketProvider, {useWebSocket} from "../../context/WebSocketProvider";

interface WebSocketComponentProps {
    type?: string
}

interface LogMessage {
    level: "debug" | "info" | "warn" | "error";
    message: string;
    monitorId?: number;
    configurationId?: number;
    serverId?: number;
    command?: {[key: string]: any};
    timestamp?: string;
}

const LogWatcher: React.FC<WebSocketComponentProps> = ({ type }) => {
    const [allMessages, setAllMessages] = useState<LogMessage[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [messages, setMessages] = useState<LogMessage[]>([]);
    useWebSocket();

    function addMessage(content: string|LogMessage) {
        console.log('Adding message', content);
        if (typeof content === 'string') {
            content = {level: "info", message: content, timestamp: new Date().toISOString()} as LogMessage;
        }
        setAllMessages((prevMessages) => [...prevMessages, content as LogMessage]);
    }

    useEffect(() => {
        if (filter === '') {
            console.log('Showing all messages', allMessages)
            setMessages([...allMessages]);
            return
        }

        console.log(`Filtering messages using ${filter} filter`)
        const logMessages = allMessages.filter((message) => message.message.includes(filter))
        setMessages([...logMessages]);
    }, [allMessages, filter]);

    const onOpen = () => {
        addMessage('WebSocket connection established!');
    }

    const onError = (error?: Event) => {
        addMessage({level: "error", message: `WebSocket error: ${error}`, timestamp: new Date().toISOString()} as LogMessage);
    }

    const onMessage = async (event: MessageEvent) => {
        const message: LogMessage = JSON.parse(await event.data.text())
        addMessage(message);
    }

    function getMessageColor(level: "debug" | "info" | "warn" | "error") {
        switch (level) {
            case "debug":
                return "gray";
            case "info":
                return "blue";
            case "warn":
                return "orange";
            case "error":
                return "red";
            default:
                return "black";
        }
    }

    return (
        <WebSocketProvider onOpen={onOpen} onError={onError} onMessage={onMessage}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <TextField
                            label="Filter messages"
                            variant="outlined"
                            fullWidth
                            size={"small"}
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" size={"small"} color="primary"
                                onClick={() => setAllMessages([])}>
                            Clear
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <List>
                                    {messages.map((message, index) => (
                                        <ListItem key={index} disablePadding={true}>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="body2" style={{ color: getMessageColor(message.level) }}>
                                                        {message.timestamp
                                                            ? (new Date(message.timestamp)).toLocaleTimeString()
                                                            : 'Unknown time'
                                                        } - {message.message}
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </WebSocketProvider>
    );
};

export default LogWatcher;