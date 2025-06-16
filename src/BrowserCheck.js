import { useEffect, useState, useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { Box, Typography, Backdrop, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function BrowserCheck() {
  const [showWarning, setShowWarning] = useState(false);
  const [browser, setBrowser] = useState('Unknown');
  const { mode } = useContext(ThemeContext); 

  useEffect(() => {
    const ua = navigator.userAgent;
    const detectedBrowser = (() => {
      if (ua.includes('Chrome') && !ua.includes('Edg') && !ua.includes('OPR')) return 'Chrome';
      if (ua.includes('Firefox')) return 'Firefox';
      if (ua.includes('Edg')) return 'Edge';
      if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
      if (ua.includes('OPR') || ua.includes('Opera')) return 'Opera';
      return 'Unknown';
    })();

    setBrowser(detectedBrowser);

    const preferred = ['Chrome'];
    if (!preferred.includes(detectedBrowser)) {
      setShowWarning(true);
    }
  }, []);

  if (!showWarning) return null;

  const isDark = mode === 'dark';

  return (
    <Backdrop
      open
      sx={{
        zIndex: 1300,
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      }}
    >
      <Box
  sx={{
    position: 'relative',
    backgroundColor: isDark ? '#25292e' : '#fff',
    color: isDark ? '#e0e0e0' : '#000',
    padding: 4,
    borderRadius: 2,
    maxWidth: 400,
    width: '90%',
    boxShadow: 6,
    textAlign: 'center',
  }}
>
  <IconButton
    aria-label="close"
    onClick={() => setShowWarning(false)}
    sx={{
      position: 'absolute',
      top: 8,
      right: 8,
      color: isDark ? '#e0e0e0' : '#000',
    }}
  >
    <CloseIcon />
  </IconButton>

  <Typography variant="h5" sx={{ color: isDark ? "#81c784" : "#4b9e44", mb: 2 }}>
    Unsupported browser
  </Typography>
  <Typography>
    Your browser (<strong>{browser}</strong>) is not fully supported.
    <br /><br />
    For the best experience, please use <strong>Chrome</strong>.
  </Typography>
</Box>

    </Backdrop>
  );
}

export default BrowserCheck;
