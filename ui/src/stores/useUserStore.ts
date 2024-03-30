import { create } from 'zustand';
import { User } from '../types/User';

type UserState = {
    accessToken: string | null;
    refreshToken: string | null;
    user: User | undefined;
    setUser: (user: User | undefined) => void;
    setAccessToken: (accessToken: string | null) => void;
    setRefreshToken: (refreshToken: string | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    user: undefined,
    setUser: (user) => set({ user }),
    setAccessToken: (accessToken: string|null) => {
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
        } else {
            localStorage.removeItem('accessToken');
        }
        set({ accessToken });
    },
    setRefreshToken: (refreshToken: string|null) => {
        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        } else {
            localStorage.removeItem('refreshToken');
        }
        set({ refreshToken });
    },
}));