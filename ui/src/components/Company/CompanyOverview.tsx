import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  LinearProgress,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Box,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import BooleanIcon from "../Shared/BooleanIcon";
import { enqueueSnackbar } from "notistack";
import { Company } from "../../types/Company";
import CompanyLink from "./CompanyLink";
import { useApi } from "../../context/ApiProvider";

type RouteParams = {
  [key: number]: string;
};

export const CompanyOverview: React.FC = () => {
  const api = useApi();
  const { id } = useParams<RouteParams>() as { id: number };
  const [isLoading, setLoading] = useState(true);
  const [company, setCompany] = useState<Company | null>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    api?.get(`/companies/${id}`)
      .then(response => {
        if (!response.ok || !response.body) {
          throw new Error('Failed to fetch company!');
        }
        return response.body;
      })
      .then(data => setCompany(data))
      .catch((error) => {
        console.error('Error:', error);
        enqueueSnackbar('Failed to fetch!', { variant: 'error' });
        setCompany(null);
      })
      .finally(() => setLoading(false));
  }, [id, api]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (!company) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          Company not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Company Overview
      </Typography>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {company.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Status
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <BooleanIcon value={company.is_active}/>
                <Typography>
                  {company.is_active ? 'Active' : 'Inactive'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Created At
              </Typography>
              <Typography sx={{ mt: 1 }}>
                {company.created_at?.toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Updated At
              </Typography>
              <Typography sx={{ mt: 1 }}>
                {company.updated_at?.toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ p: 2 }}>
          <Button
            variant="contained"
            color="warning"
            href={`/companies/${company.id}/edit`}
          >
            Edit
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};