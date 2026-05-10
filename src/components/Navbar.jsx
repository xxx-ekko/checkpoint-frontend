import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';

const Navbar = () => {
  // State to handle navbar background transparency on scroll
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // WhatsApp redirect function
  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent("Salut ! Je souhaite acheter un pass pour Le Checkpoint (5000 FCFA).");
    window.open(`https://wa.me/221778791567?text=${message}`, '_blank');
  };

  return (
    <AppBar 
      position="fixed" 
      elevation={scrolled ? 4 : 0}
      sx={{ 
        backgroundColor: scrolled ? 'rgba(19, 19, 19, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(158, 27, 27, 0.3)' : '1px solid transparent',
        transition: 'all 0.3s ease'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: { xs: '68px', md: '76px' } }}>
          
          {/* Logo / Brand Name */}
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              color: '#fff', 
              fontFamily: '"Space Grotesk", sans-serif', 
              fontWeight: 700,
              letterSpacing: '0.05em',
              cursor: 'pointer'
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            LE <span style={{ color: '#9E1B1B' }}>CHECKPOINT</span>
          </Typography>

          {/* Desktop Navigation Links & Action Button */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            
            <Typography 
              variant="caption" 
              sx={{ 
                display: { xs: 'none', md: 'block' },
                color: '#c6c6c7', 
                cursor: 'pointer',
                letterSpacing: '0.1em',
                '&:hover': { color: '#9E1B1B' }
              }}
              onClick={() => document.getElementById('program')?.scrollIntoView({ behavior: 'smooth' })}
            >
              PROGRAMME
            </Typography>

            <Typography 
              variant="caption" 
              sx={{ 
                display: { xs: 'none', md: 'block' },
                color: '#c6c6c7', 
                cursor: 'pointer',
                letterSpacing: '0.1em',
                '&:hover': { color: '#9E1B1B' }
              }}
              onClick={() => document.getElementById('arena')?.scrollIntoView({ behavior: 'smooth' })}
            >
              LE SPOT
            </Typography>

            {/* Main Call to Action - Now redirects to WhatsApp */}
            <Button 
              variant="outlined" 
              onClick={handleWhatsAppRedirect}
              sx={{ 
                color: '#fff', 
                borderColor: '#9E1B1B',
                borderRadius: 0,
                fontFamily: '"Space Grotesk", sans-serif',
                letterSpacing: '0.05em',
                '&:hover': {
                  backgroundColor: '#9E1B1B',
                  borderColor: '#9E1B1B'
                }
              }}
            >
              ACHETER (5000F)
            </Button>
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;