import React from "react";
import {TextField} from "@mui/material";
import {TelegramBotConfiguration} from "./TelegramBotConfiguration";

interface TelegramProps {
    configurationObject: TelegramBotConfiguration;
    setConfigurationObject: any;
}

const Telegram: React.FC<TelegramProps> = (
    {
        configurationObject,
        setConfigurationObject
    }) => {
    return (
        <>
            <TextField
                label="Bot Token"
                variant="outlined"
                helperText={"You can get your bot token by sending /newbot to @BotFather"}
                fullWidth
                required
                margin="normal"
                value={configurationObject.bot_token ?? ''}
                onChange={(event) => setConfigurationObject({...configurationObject, bot_token: event.target.value})}
            />
            <TextField
                label="Chat ID"
                variant="outlined"
                helperText={"You can get your chat ID by sending /my_id to @get_id_bot"}
                fullWidth
                required
                margin="normal"
                value={configurationObject.chat_id ?? ''}
                onChange={(event) => setConfigurationObject({...configurationObject, chat_id: event.target.value})}
            />
            <TextField
                label="Topic ID"
                variant="outlined"
                helperText={"You can get your topic ID by copying a message link and extracting the topic_id parameter. For example, in the link https://t.me/c/123/456, the topic_id is 456."}
                fullWidth
                margin="normal"
                value={configurationObject.topic_id ?? ''}
                onChange={(event) => setConfigurationObject({...configurationObject, topic_id: event.target.value})}
            />
        </>
    )
}

export default Telegram;