import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useUserStore} from "../../stores/useUserStore";

export const LogoutComponent: React.FC = () => {
    const { setAccessToken, setRefreshToken, setUser } = useUserStore();
    const navigate = useNavigate();

    useEffect(() => {
        setAccessToken(null);
        setRefreshToken(null);
        setUser(undefined);

        navigate('/login')
    }, []);

    return null;
};