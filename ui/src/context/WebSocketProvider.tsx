import React, {createContext, useContext, useEffect, useMemo} from 'react';
import {useEnvStore} from "../stores/useEnvStore";
import WebSocketClient from "../services/WebsocketClient";

interface WebSocketContextType {
    webSocketClient: WebSocketClient | null;
    onOpen?: () => void;
    onError?: (event?: Event) => void;
}

// Define the context with a type
export const WebSocketContext = createContext<WebSocketContextType | null>(null);

interface WebSocketProviderProps {
    children: React.ReactNode;
    onOpen?: () => void;
    onError?: (event?: Event) => void;
    onMessage?: (message: MessageEvent) => void;
}

export default function WebSocketProvider({children, onOpen, onError, onMessage}: WebSocketProviderProps) {
    const {getEnv} = useEnvStore();

    const webSocketClient = useMemo(() => new WebSocketClient(getEnv('WEBSOCKET_HOST')), [getEnv]);

    useEffect(() => {
        if (onOpen) {
            webSocketClient.onOpen(onOpen);
        }
        if (onError) {
            webSocketClient.onError(onError);
        }
        webSocketClient.connect();

        if (onMessage) {
          webSocketClient.onMessage(onMessage)
        }

        // Clean up the WebSocket connection when the component unmounts
        return () => {
            webSocketClient.close();
        };
    }, [webSocketClient, onOpen, onError, onMessage]);

    return (
        <WebSocketContext.Provider value={{webSocketClient, onOpen, onError}}>
            {children}
        </WebSocketContext.Provider>
    );
}

export function useWebSocket() {
    return useContext(WebSocketContext);
}