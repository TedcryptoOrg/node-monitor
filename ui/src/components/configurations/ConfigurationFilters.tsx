import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
} from '@mui/material';
import { Company } from '../../types/Company';

interface ConfigurationFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  selectedCompany: string;
  setSelectedCompany: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  companies: Company[];
}

const ConfigurationFilters: React.FC<ConfigurationFiltersProps> = ({
  search,
  setSearch,
  selectedCompany,
  setSelectedCompany,
  selectedStatus,
  setSelectedStatus,
  companies,
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Search configurations"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or chain..."
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Company</InputLabel>
            <Select
              value={selectedCompany}
              label="Company"
              onChange={(e) => setSelectedCompany(e.target.value)}
            >
              <MenuItem value="">All Companies</MenuItem>
              {companies.map((company) => (
                <MenuItem key={company.id} value={company.id.toString()}>
                  {company.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={selectedStatus}
              label="Status"
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="healthy">Healthy</MenuItem>
              <MenuItem value="warning">Warning</MenuItem>
              <MenuItem value="error">Error</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConfigurationFilters;