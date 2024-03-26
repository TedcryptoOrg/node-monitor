import axios from "axios";
import {AlertChannel} from "../../../Domain/Alerter/AlertChannel";

export default class Telegram implements AlertChannel {
    constructor(
        private readonly token: string,
        private readonly chatId: string,
        private readonly threadId?: string,
    ) {
    }

    async alert(message: string): Promise<void> {
        console.debug('Sending telegram alert. Message: ' + message)
        await axios.post(`https://api.telegram.org/bot${this.token}/sendMessage`, {
            chat_id: this.chatId,
            text: message,
            reply_to_message_id: this.threadId,
        });
    }
}