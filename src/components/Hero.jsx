import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { keyframes } from '@emotion/react';
import heroBg from '../assets/images/hero-bg.PNG';

const neonPulse = keyframes`
  0% { box-shadow: 0 0 5px rgba(158, 27, 27, 0.2); }
  50% { box-shadow: 0 0 25px rgba(158, 27, 27, 0.6); }
  100% { box-shadow: 0 0 5px rgba(158, 27, 27, 0.2); }
`;

const Hero = () => {
  
  // La fameuse redirection WhatsApp avec le message pré-rempli
  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent("Salut ! Je souhaite acheter un pass pour Le Checkpoint (5000 FCFA).");
    window.open(`https://wa.me/221778791567?text=${message}`, '_blank');
  };

  return (
    <Box 
      sx={{ 
        position: 'relative',
        mt: { xs: '68px', md: '76px' }, 
        pt: { xs: 8, md: 12 }, 
        pb: { xs: 10, md: 16 }, 
        px: 2,
        textAlign: 'center',
        backgroundImage: `linear-gradient(rgba(19, 19, 19, 0.57), rgba(19, 19, 19, 0.95)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: { xs: '70% center', md: 'center' },
        backgroundAttachment: { xs: 'scroll', md: 'fixed' },
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h2" sx={{ mb: 3, color: '#fff', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 }}>
          VOTRE NOUVELLE <span style={{ color: '#9E1B1B', textShadow: '0 0 20px rgba(158, 27, 27, 0.5)' }}>SAFE ZONE</span>
        </Typography>
        <Typography variant="body1" sx={{ color: '#c6c6c7', maxWidth: 750, mx: 'auto', mb: 8, fontSize: '1.125rem' }}>
          Le point de rencontre incontournable de la communauté Otaku, Gaming et Pop Culture au Sénégal. Passez du digital au réel dans une ambiance immersive, chill et conviviale.
        </Typography>
        
        {/* Bouton mis à jour avec le prix et l'action WhatsApp */}
        <Button 
          variant="contained" 
          onClick={handleWhatsAppRedirect}
          sx={{ 
            backgroundColor: '#9E1B1B',
            animation: `${neonPulse} 2.5s infinite`, 
            borderRadius: 0, px: 5, py: 2, fontSize: '1.1rem',
            '&:hover': { animation: 'none', backgroundColor: '#fff', color: '#9E1B1B' } 
          }}
        >
          ACHETER MON PASS - 5000 FCFA
        </Button>
      </Container>
    </Box>
  );
};

export default Hero;