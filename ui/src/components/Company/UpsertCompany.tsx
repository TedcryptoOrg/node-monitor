import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Grid,
  FormControlLabel,
  Switch,
  Card,
  CardContent,
} from '@mui/material';
import { enqueueSnackbar } from "notistack";
import { CompanyInput } from "../../types/Company";
import { useApi } from "../../context/ApiProvider";

type RouteParams = {
  [key: number]: string | undefined;
};

export const UpsertCompany: React.FC = () => {
  const api = useApi();
  const { id } = useParams<RouteParams>() as { id?: number };
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();

  const fetchData = useCallback(() => {
    if (id) {
      api?.get(`/companies/${id}`)
        .then(response => {
          if (!response.ok || !response.body) {
            throw new Error('Failed to fetch company!');
          }
          const data = response.body;
          setName(data.name);
          setIsActive(data.is_active);
        })
        .catch(() => {
          enqueueSnackbar('Failed to load data!', { variant: 'error' });
        });
    }
  }, [id, api]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const company: CompanyInput = {
      name,
      is_active: isActive,
    };

    api?.[id ? 'put' : 'post'](id ? `/companies/${id}` : '/companies', company)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.body?.message || 'Failed to save company');
        }
        enqueueSnackbar(`Company ${id ? 'updated' : 'created'} successfully!`, { variant: 'success' });
        navigate('/companies');
      })
      .catch((error) => {
        console.error('Error:', error);
        enqueueSnackbar(`Failed to ${id ? 'update' : 'create'} company`, { variant: 'error' });
      });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
          {id ? 'Update' : 'Create'} Company
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isActive}
                      onChange={e => setIsActive(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Active"
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    {id ? 'Update' : 'Create'} Company
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/companies')}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};