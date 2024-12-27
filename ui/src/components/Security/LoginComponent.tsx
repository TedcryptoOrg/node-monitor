import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  ThemeProvider,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { enqueueSnackbar } from 'notistack';
import { useApi } from "../../context/ApiProvider";
import { useUserStore } from "../../stores/useUserStore";
import { theme } from '../../theme';

const LoginComponent: React.FC = () => {
  const api = useApi();
  const { handleLoginResponse } = useUserStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await api?.post('/login', {
        username: username,
        password: password
      });

      if (!response?.ok || !response?.body) {
        throw new Error(response?.body?.message || 'Login failed');
      }

      handleLoginResponse(response);
      
      // Fetch user data immediately after successful login
      const userResponse = await api?.get('/users/me');
      if (!userResponse?.ok || !userResponse?.body) {
        throw new Error('Failed to fetch user data');
      }

      useUserStore.getState().setUser(userResponse.body);
    } catch (error: any) {
      console.error('Login error:', error);
      enqueueSnackbar(error.message || 'Failed to log in', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(circle, rgba(0,184,148,0.1) 0%, rgba(0,184,148,0) 70%)',
            top: '-20%',
            right: '-20%',
            borderRadius: '50%',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '40%',
            height: '40%',
            background: 'radial-gradient(circle, rgba(45,52,54,0.1) 0%, rgba(45,52,54,0) 70%)',
            bottom: '-10%',
            left: '-10%',
            borderRadius: '50%',
          },
        }}
      >
        <Card
          sx={{
            maxWidth: 400,
            width: '90%',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box component="form" onSubmit={handleLogin}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  mb: 4,
                  textAlign: 'center',
                  background: 'linear-gradient(45deg, #2D3436 30%, #00B894 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Node Monitor
              </Typography>

              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                autoComplete="username"
                autoFocus
                sx={{ mb: 2 }}
              />

              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: 'primary.main' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isLoading}
                sx={{
                  background: 'linear-gradient(45deg, #2D3436 30%, #00B894 90%)',
                  color: 'white',
                  height: 48,
                }}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default LoginComponent;