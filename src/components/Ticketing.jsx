import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';

const Ticketing = () => {
  
  // Redirection WhatsApp
  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent("Salut ! Je souhaite acheter un pass pour Le Checkpoint (5000 FCFA).");
    window.open(`https://wa.me/221778791567?text=${message}`, '_blank');
  };

  return (
    <Box id="ticketing" sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Paper square sx={{ 
        p: { xs: 4, md: 8 }, width: '100%', maxWidth: 700, 
        backgroundColor: '#1A1A1A', 
        border: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        textAlign: 'center'
      }}>
        {/* Cyber HUD Accents */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: 15, height: 15, borderTop: '2px solid #9E1B1B', borderLeft: '2px solid #9E1B1B' }} />
        <Box sx={{ position: 'absolute', top: 0, right: 0, width: 15, height: 15, borderTop: '2px solid #9E1B1B', borderRight: '2px solid #9E1B1B' }} />
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: 15, height: 15, borderBottom: '2px solid #9E1B1B', borderLeft: '2px solid #9E1B1B' }} />
        <Box sx={{ position: 'absolute', bottom: 0, right: 0, width: 15, height: 15, borderBottom: '2px solid #9E1B1B', borderRight: '2px solid #9E1B1B' }} />
        
        <Typography variant="h2" sx={{ mb: 2, color: '#fff', fontFamily: '"Space Grotesk", sans-serif', fontSize: { xs: '2rem', md: '2.5rem' } }}>
          RÉSERVEZ VOTRE <span style={{ color: '#9E1B1B', textShadow: '0 0 10px rgba(158,27,27,0.3)' }}>PLACE</span>
        </Typography>
        
        <Typography variant="body1" sx={{ color: '#c6c6c7', mb: 3, fontSize: '1rem' }}>
          Événement privé et communautaire. Les places sont strictement limitées pour garantir une expérience optimale à tous les participants.
        </Typography>

        {/* Bloc Prix clair et net */}
        <Box sx={{ border: '1px dashed rgba(255,255,255,0.2)', p: 3, mb: 4, display: 'inline-block' }}>
          <Typography variant="caption" sx={{ color: '#9E1B1B', letterSpacing: '0.1em', display: 'block', mb: 1 }}>
            TARIF UNIQUE
          </Typography>
          <Typography variant="h3" sx={{ color: '#fff', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 'bold' }}>
            5 000 FCFA
          </Typography>
          <Typography variant="caption" sx={{ color: '#c6c6c7', display: 'block', mt: 1 }}>
            Paiement sécurisé via WAVE
          </Typography>
        </Box>

        <Button 
          onClick={handleWhatsAppRedirect}
          variant="contained" 
          fullWidth
          sx={{ 
            backgroundColor: '#25D366', // Couleur officielle WhatsApp
            color: '#000',
            height: 56, borderRadius: 0, fontFamily: '"Space Grotesk", sans-serif', fontSize: '1.1rem', letterSpacing: '0.05em', fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#fff',
            }
          }}
        >
          RÉSERVER VIA WHATSAPP
        </Button>
      </Paper>
    </Box>
  );
};

export default Ticketing;