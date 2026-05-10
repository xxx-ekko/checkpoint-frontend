import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 16, pt: 4, px: { xs: 2, md: 8 }, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 3 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem', color: '#fff', fontFamily: '"Space Grotesk", sans-serif' }}>
        LE CHECKPOINT
      </Typography>
      
      {/* Social links and contact */}
      <Box sx={{ display: 'flex', gap: { xs: 2, md: 4 } }}>
        <Typography 
          component="a" 
          href="https://www.instagram.com/mind7company" 
          target="_blank"
          rel="noopener noreferrer"
          variant="caption" 
          sx={{ color: '#c6c6c7', textDecoration: 'none', cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.1em', '&:hover': { color: '#fff' } }}
        >
          MIND7 COMPANY
        </Typography>

        <Typography 
          component="a" 
          href="https://www.instagram.com/fanglamarque" 
          target="_blank"
          rel="noopener noreferrer"
          variant="caption" 
          sx={{ color: '#c6c6c7', textDecoration: 'none', cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.1em', '&:hover': { color: '#fff' } }}
        >
          FANG LA MARQUE
        </Typography>

        <Typography 
          component="a" 
          href="tel:221778791567" 
          target="_blank"
          rel="noopener noreferrer"
          variant="caption" 
          sx={{ color: '#c6c6c7', textDecoration: 'none', cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.1em', '&:hover': { color: '#fff' } }}
        >
          CONTACT : +221 77 879 15 67
        </Typography>
      </Box>
      
      {/* Copyright text */}
      <Typography variant="caption" sx={{ color: '#515050', fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.1em' }}>
        © 2026 LE CHECKPOINT
      </Typography>
    </Box>
  );
};

export default Footer;