import { useMemo } from 'react';
import { navbarItems } from '../../../../Navbar';

export const useNavItems = () => {
    return useMemo(() => {
        const mainItems = navbarItems.filter(item =>
            ['Dashboard', 'Configurations', 'Network Status', 'Notification channels', 'Users', 'Company'].includes(item.name)
        );

        const systemItems = navbarItems.filter(item =>
            ['Tail log', 'Audit'].includes(item.name)
        );

        const accountItems = navbarItems.filter(item =>
            ['Logout'].includes(item.name)
        );

        return { mainItems, systemItems, accountItems };
    }, []);
};