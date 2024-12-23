import React from 'react';
import { Box } from '@mui/material';
import { CompanyHeader } from './CompanyHeader';
import { CompanyList } from './CompanyList';
import { useCompanies } from './hooks/useCompanies';

const CompanyComponent: React.FC = () => {
  const { companies, isLoading, deleteCompany, fetchCompanies } = useCompanies();

  return (
    <Box>
      <CompanyHeader onCompanyAdded={fetchCompanies} />
      <Box sx={{ mt: 4 }}>
        <CompanyList 
          companies={companies}
          isLoading={isLoading}
          onDelete={deleteCompany}
          onUpdate={fetchCompanies}
        />
      </Box>
    </Box>
  );
};

export default CompanyComponent;