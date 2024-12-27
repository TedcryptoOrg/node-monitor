import React from 'react';
import { Card, CardContent, Typography, Box, Tooltip, Skeleton } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: SvgIconComponent;
  color: string;
  trend?: string;
  trendLabel?: string;
  positive?: boolean;
  isLoading?: boolean;
}

const StatusCard: React.FC<StatusCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  color,
  trend,
  trendLabel,
  positive,
  isLoading = false
}) => {
  return (
    <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
      <CardContent>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                bgcolor: `${color}15`,
                borderRadius: '12px',
                p: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <Icon sx={{ color: color, fontSize: 24 }} />
            </Box>
            <Typography variant="subtitle1" color="text.secondary" fontWeight={500}>
              {title}
            </Typography>
          </Box>
          
          {isLoading ? (
            <Skeleton variant="text" width="60%" height={60} />
          ) : (
            <Typography variant="h4" component="div" sx={{ 
              fontWeight: 'bold',
              mb: trend ? 1 : 0
            }}>
              {value}
            </Typography>
          )}

          {trend && !isLoading && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Tooltip title={trendLabel || ''}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {trend}
                  {trendLabel && (
                    <span style={{ marginLeft: '4px', opacity: 0.8 }}>
                      {trendLabel}
                    </span>
                  )}
                </Typography>
              </Tooltip>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatusCard;