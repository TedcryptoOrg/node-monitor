import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Company } from '../../types/Company';
import BooleanIcon from '../Shared/BooleanIcon';

interface CompanyCardProps {
  company: Company;
  onEdit: (company: Company) => void;
  onDelete: (id: number) => void;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company, onEdit, onDelete }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom fontWeight={600}>
          {company.name}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Status:
            </Typography>
            <BooleanIcon value={company.is_active} />
            <Typography variant="body2" color="text.secondary">
              {company.is_active ? 'Active' : 'Inactive'}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
        <Tooltip title="Edit Company">
          <IconButton size="small" onClick={() => onEdit(company)} color="primary">
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Company">
          <IconButton size="small" onClick={() => onDelete(company.id)} color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};