import React, { createContext, useContext } from 'react';
import ApiClient from "../services/ApiClient";
import { useEnvStore } from '../stores/useEnvStore';
import {useUserStore} from "../stores/useUserStore";

export const ApiContext = createContext<ApiClient | null>(null);

export default function ApiProvider({ children }: { children: React.ReactNode }) {
    const { getEnv } = useEnvStore();
    const userStore = useUserStore();

    const api = new ApiClient(
        userStore,
        getEnv('API_HOST')
    );

    return (
        <ApiContext.Provider value={api}>
            {children}
        </ApiContext.Provider>
    );
}

export function useApi() {
    return useContext(ApiContext);
}