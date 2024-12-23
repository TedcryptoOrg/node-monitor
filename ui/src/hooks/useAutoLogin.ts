import { useEffect } from 'react';
import { useUserStore } from '../stores/useUserStore';
import { useApi } from '../context/ApiProvider';

export const useAutoLogin = () => {
    const { securityTokens, setUser } = useUserStore();
    const api = useApi();

    useEffect(() => {
        const loadUser = async () => {
            if (securityTokens && !useUserStore.getState().user) {
                try {
                    const response = await api?.get('/users/me');
                    if (response?.ok && response.body) {
                        setUser(response.body);
                    } else {
                        useUserStore.getState().logout();
                    }
                } catch (error) {
                    console.error('Failed to load user:', error);
                    useUserStore.getState().logout();
                }
            }
        };

        loadUser();
    }, [api, securityTokens, setUser]);
};