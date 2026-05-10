import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { keyframes } from '@emotion/react';

// Subtle mechanical glitch for hover states
const glitch = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-1px, 1px); }
  40% { transform: translate(-1px, -1px); }
  60% { transform: translate(1px, 1px); }
  80% { transform: translate(1px, -1px); }
  100% { transform: translate(0); }
`;

// Receive the onOpenModal prop from LandingPage
const Navbar = ({ onOpenModal }) => {
  // Burger menu state
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileAnchorEl);
  
  const handleMenuOpen = (event) => setMobileAnchorEl(event.currentTarget);
  const handleMenuClose = () => setMobileAnchorEl(null);

  // Helper to scroll smoothly
  const scrollToSection = (id) => {
    handleMenuClose();
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  // Redirect user directly to the WhatsApp business number with a pre-filled message
  const handleWhatsAppRedirect = () => {
    // Replace with your actual WhatsApp link and message
    const message = encodeURIComponent("Salut ! Je souhaite acheter un pass pour Le Checkpoint.");
    window.open(`https://wa.me/221778791567?text=${message}`, '_blank');
  };

  return (
    <>
      {/* FIXED NAVBAR */}
      <Box sx={{ 
        borderBottom: '1px solid rgba(255,255,255,0.1)', py: 2, px: { xs: 2, md: 4 }, 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, 
        backgroundColor: 'rgba(19, 19, 19, 0.9)', backdropFilter: 'blur(10px)'
      }}>
        <Typography variant="h6" sx={{ color: '#fff', letterSpacing: '0px', fontFamily: '"Space Grotesk", sans-serif' }}>
          LE CHECKPOINT
        </Typography>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
          <Typography variant="body2" sx={{ cursor: 'pointer', fontWeight: 600, borderBottom: '2px solid #9E1B1B', color: '#fff' }} onClick={() => scrollToSection('concept')}>LE CONCEPT</Typography>
          <Typography variant="body2" sx={{ cursor: 'pointer', color: '#c6c6c7', transition: 'color 0.2s', '&:hover': { color: '#fff' } }} onClick={() => scrollToSection('program')}>PROGRAMME</Typography>
          <Typography variant="body2" sx={{ cursor: 'pointer', color: '#c6c6c7', transition: 'color 0.2s', '&:hover': { color: '#fff' } }} onClick={() => scrollToSection('arena')}>LE LIEU</Typography>
        </Box>

        {/* Action Button & Burger */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="small" 
            onClick={onOpenModal}
            sx={{ py: 1, px: 2, borderRadius: 0, '&:hover': { animation: `${glitch} 0.2s linear` } }}
          >
            ACHETER
          </Button>

          <IconButton onClick={handleMenuOpen} sx={{ display: { xs: 'flex', md: 'none' }, color: '#fff' }}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      {/* MOBILE MENU */}
      <Menu
        anchorEl={mobileAnchorEl}
        open={isMobileMenuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 0, mt: 1, width: '200px' }
        }}
      >
        <MenuItem onClick={() => scrollToSection('concept')} sx={{ color: '#fff', fontFamily: '"Space Grotesk", sans-serif' }}>LE CONCEPT</MenuItem>
        <MenuItem onClick={() => scrollToSection('program')} sx={{ color: '#fff', fontFamily: '"Space Grotesk", sans-serif' }}>PROGRAMME</MenuItem>
        <MenuItem onClick={() => scrollToSection('arena')} sx={{ color: '#fff', fontFamily: '"Space Grotesk", sans-serif' }}>LE LIEU</MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;