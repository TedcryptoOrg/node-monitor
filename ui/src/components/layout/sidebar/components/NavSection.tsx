import React from 'react';
import { Box, Typography, List } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { NavItem } from './NavItem';
import { NavSection as NavSectionType } from '../types';
import { useUserStore } from '../../../../stores/useUserStore';

interface NavSectionProps {
    section: NavSectionType;
    isCollapsed: boolean;
}

export const NavSection = ({ section, isCollapsed }: NavSectionProps) => {
    const location = useLocation();
    const { user } = useUserStore();

    return (
        <Box sx={{ mb: 1 }}>
            {!isCollapsed && (
                <Typography
                    variant="overline"
                    sx={{
                        px: 3,
                        py: 1,
                        display: 'block',
                        color: 'text.secondary',
                        fontWeight: 500,
                        fontSize: '0.75rem',
                        opacity: 0.7,
                    }}
                >
                    {section.title}
                </Typography>
            )}
            <List sx={{ py: 0 }}>
                {section.items.map((item) => {
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
        </Box>
    );
};