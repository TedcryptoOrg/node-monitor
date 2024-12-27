import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Company } from '../../../types/Company';
import BooleanIcon from '../../Shared/BooleanIcon';

interface CompanyCardProps {
  company: Company;
  onEdit: (company: Company) => void;
  onDelete: (id: number) => void;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company, onEdit, onDelete }) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom fontWeight={600}>
          {company.name}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Status:
            </Typography>
            <Chip 
              icon={<BooleanIcon value={company.is_active} />}
              label={company.is_active ? 'Active' : 'Inactive'}
              size="small"
              color={company.is_active ? 'success' : 'default'}
            />
          </Box>

          <Typography variant="body2" color="text.secondary">
            Created: {new Date(company.created_at!).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
        <Tooltip title="Edit Company">
          <IconButton 
            size="small" 
            onClick={() => onEdit(company)}
            sx={{ color: 'warning.main' }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Company">
          <IconButton 
            size="small" 
            onClick={() => onDelete(company.id)}
            sx={{ color: 'error.main' }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};