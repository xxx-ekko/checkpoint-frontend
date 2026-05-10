import React from 'react';
import { Box, Typography } from '@mui/material';

// Import the parallax background image
import transitionBg from '../assets/images/transition-bg.PNG';

const TransitionBanner = () => {
  return (
    <Box 
      sx={{ 
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        mt: { xs: 12, md: 16 },
        mb: { xs: 8, md: 12 },
        py: { xs: 12, md: 18 },
        textAlign: 'center',
        backgroundImage: `linear-gradient(rgba(19, 19, 19, 0.7), rgba(19, 19, 19, 0.95)), url(${transitionBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: { xs: 'scroll', md: 'fixed' }, // Parallax effect
        borderTop: '1px solid rgba(158, 27, 27, 0.3)',
        borderBottom: '1px solid rgba(158, 27, 27, 0.3)',
      }}
    >
      <Typography 
        variant="h3" 
        sx={{ 
          color: '#fff', 
          fontFamily: '"Space Grotesk", sans-serif', 
          fontWeight: 700, 
          letterSpacing: '0.05em',
          textShadow: '0 0 20px rgba(0,0,0,0.8)'
        }}
      >
        READY TO <span style={{ color: '#9E1B1B', textShadow: '0 0 15px rgba(158,27,27,0.5)' }}>PLAY ?</span>
      </Typography>
    </Box>
  );
};

export default TransitionBanner;