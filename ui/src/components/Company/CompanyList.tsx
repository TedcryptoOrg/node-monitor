import React, { useState } from 'react';
import { Grid, Box, Typography, LinearProgress } from '@mui/material';
import { Company } from '../../types/Company';
import { CompanyCard } from './cards/CompanyCard';
import { UpsertCompanyModal } from './modals/UpsertCompanyModal';

interface CompanyListProps {
  companies: Company[];
  isLoading: boolean;
  onDelete: (id: number) => void;
  onUpdate: () => void;
}

export const CompanyList: React.FC<CompanyListProps> = ({ 
  companies, 
  isLoading, 
  onDelete, 
  onUpdate 
}) => {
  const [editCompany, setEditCompany] = useState<Company | null>(null);
  const [openModal, setOpenModal] = useState(false);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (companies.length === 0) {
    return (
      <Box 
        sx={{ 
          textAlign: 'center',
          py: 8,
          bgcolor: 'background.paper',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No companies found
        </Typography>
        <Typography color="text.secondary">
          Add your first company to get started
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        {companies.map((company) => (
          <Grid item xs={12} sm={6} md={4} key={company.id}>
            <CompanyCard
              company={company}
              onEdit={(company: Company) => {
                setEditCompany(company);
                setOpenModal(true);
              }}
              onDelete={onDelete}
            />
          </Grid>
        ))}
      </Grid>

      <UpsertCompanyModal
        open={openModal}
        handleClose={() => {
          setEditCompany(null);
          setOpenModal(false);
        }}
        company={editCompany}
        onSuccess={onUpdate}
      />
    </>
  );
};