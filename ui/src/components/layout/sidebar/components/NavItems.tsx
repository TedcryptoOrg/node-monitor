import React from 'react';
import { List } from '@mui/material';
import { NavItem } from './NavItem';
import { useLocation } from 'react-router-dom';
import { NavItem as NavItemType } from '../types';
import { useUserStore } from '../../../../stores/useUserStore';

interface NavItemsProps {
    items: NavItemType[];
    isCollapsed: boolean;
}

export const NavItems = ({ items, isCollapsed }: NavItemsProps) => {
    const location = useLocation();
    const { user } = useUserStore();

    return (
        <List sx={{ py: 0.5 }}>
            {items.map((item) => {
                if (!user || !item.security(user)) return null;

                return (
                    <NavItem
                        key={item.name}
                        item={item}
                        isActive={location.pathname === item.path}
                        isCollapsed={isCollapsed}
                    />
                );
            })}
        </List>
    );
};