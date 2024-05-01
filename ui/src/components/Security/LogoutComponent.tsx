import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useUserStore} from "../../stores/useUserStore";

export const LogoutComponent: React.FC = () => {
    const { setUser, setApiSecurityTokens } = useUserStore();
    const navigate = useNavigate();

    useEffect(() => {
        setApiSecurityTokens(null);
        setUser(undefined);

        navigate('/login')
    }, [setApiSecurityTokens, setUser, navigate]);

    return null;
};