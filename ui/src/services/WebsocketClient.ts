export default class WebSocketClient {
    private ws: WebSocket | null = null;
    private handlers: { [event: string]: (event?: Event) => void } = {};

    constructor(private url: string) {}

    connect() {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
            console.log('Connected to WebSocket server');
            if (this.handlers['open']) {
                this.handlers['open']();
            }
        };

        this.ws.onerror = (error: Event) => {
            console.error(`WebSocket error: ${error}`, error);
            if (this.handlers['error']) {
                this.handlers['error'](error);
            }
        };
    }

    onOpen(callback: () => void) {
        this.handlers['open'] = callback;
    }

    onError(callback: (error?: Event) => void) {
        this.handlers['error'] = callback;
    }

    onMessage(callback: (message: MessageEvent) => void) {
        if (!this.ws) {
            throw new Error('WebSocket connection is not established');
        }

        this.ws.onmessage = callback;
    }

    close() {
        if (this.ws) {
            console.log('Closing connection...')
            this.ws.close();
        }
    }
}