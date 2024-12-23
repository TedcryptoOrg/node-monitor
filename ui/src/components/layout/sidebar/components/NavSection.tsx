import React from 'react';
import { Box, Typography, List } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { NavItem } from './NavItem';
import { NavSection as NavSectionType } from '../types';
import { useUserStore } from '../../../../stores/useUserStore';

interface NavSectionProps {
  section: NavSectionType;
}

export const NavSection = ({ section }: NavSectionProps) => {
  const location = useLocation();
  const { user } = useUserStore();

  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="overline"
        sx={{
          px: 3,
          py: 1.5,
          display: 'block',
          color: 'text.secondary',
          fontWeight: 500,
        }}
      >
        {section.title}
      </Typography>
      <List>
        {section.items.map((item) => {
          if (!user || !item.security(user)) return null;
          
          return (
            <NavItem
              key={item.name}
              item={item}
              isActive={location.pathname === item.path}
            />
          );
        })}
      </List>
    </Box>
  );
};