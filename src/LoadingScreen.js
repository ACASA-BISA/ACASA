import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const LoadingScreen = ({ message = "Loading map..." }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: 1300, // higher than modals
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress
        size={60}
        thickness={5}
        sx={{
          color: theme.palette.primary.main,
          mb: 2,
        }}
      />
      <Typography variant="h6">{message}</Typography>
    </Box>
  );
};

export default LoadingScreen;
