import { create } from 'zustand';

type EnvState = {
    getEnv: (key: string) => any
};

export const useEnvStore = create<EnvState>((set, get) => {
    return {
        getEnv: (key: string) => {
            const value = (window as any)['globalConfig'][key] || process.env['REACT_APP_' + key]
            if (value === undefined) {
                throw new Error(`Key ${key} not found in configuration`)
            }

            return value
        }
    };
});
