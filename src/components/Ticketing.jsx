import React from 'react';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import { keyframes } from '@emotion/react';

const neonPulse = keyframes`
  0% { box-shadow: 0 0 5px rgba(158, 27, 27, 0.2); }
  50% { box-shadow: 0 0 25px rgba(158, 27, 27, 0.6); }
  100% { box-shadow: 0 0 5px rgba(158, 27, 27, 0.2); }
`;

const Ticketing = () => {

// Redirect user directly to the WhatsApp business number with a pre-filled message
  const handleWhatsAppRedirect = () => {
    // Replace with your actual WhatsApp link and message
    const message = encodeURIComponent("Salut ! Je souhaite acheter un pass pour Le Checkpoint.");
    window.open(`https://wa.me/221778791567?text=${message}`, '_blank');
  };

  return (
    <Box id="ticketing" sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Paper square sx={{ 
        p: { xs: 4, md: 8 }, width: '100%', maxWidth: 700, 
        backgroundColor: '#1A1A1A', 
        border: '1px solid rgba(255,255,255,0.05)',
        position: 'relative'
      }}>
        {/* Cyber HUD Accents for Ticket Terminal */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: 15, height: 15, borderTop: '2px solid #9E1B1B', borderLeft: '2px solid #9E1B1B' }} />
        <Box sx={{ position: 'absolute', top: 0, right: 0, width: 15, height: 15, borderTop: '2px solid #9E1B1B', borderRight: '2px solid #9E1B1B' }} />
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: 15, height: 15, borderBottom: '2px solid #9E1B1B', borderLeft: '2px solid #9E1B1B' }} />
        <Box sx={{ position: 'absolute', bottom: 0, right: 0, width: 15, height: 15, borderBottom: '2px solid #9E1B1B', borderRight: '2px solid #9E1B1B' }} />
        
        {/* Default State: Disabled Registration Form for Pre-prod */}
        <form style={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ mb: 2, color: '#fff', fontFamily: '"Space Grotesk", sans-serif', fontSize: { xs: '2rem', md: '2.5rem' } }}>
            RÉSERVEZ VOTRE <span style={{ color: '#9E1B1B', textShadow: '0 0 10px rgba(158,27,27,0.3)' }}>PLACE</span>
          </Typography>
          <Typography variant="body1" sx={{ color: '#c6c6c7', mb: 5, fontSize: '0.9rem' }}>
            Événement privé et communautaire. Les places sont limitées pour garantir une expérience optimale à tous les participants.
          </Typography>

          <Box sx={{ textAlign: 'left', mb: 3 }}>
            <Typography variant="caption" sx={{ color: '#c6c6c7', fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.1em', display: 'block', mb: 1, opacity: 0.5 }}>
              NOM OU PSEUDO (GAMERTAG)
            </Typography>
            <TextField
              variant="standard"
              fullWidth
              disabled={true}
              placeholder="Inscriptions prochainement"
              sx={{
                '& .MuiInput-root': {
                  color: '#fff', borderBottom: '2px solid rgba(255, 255, 255, 0.1)', pb: 1,
                  '&.Mui-disabled:before': { borderBottomStyle: 'solid' }
                }
              }}
            />
          </Box>

          <Box sx={{ textAlign: 'left', mb: 6 }}>
            <Typography variant="caption" sx={{ color: '#c6c6c7', fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.1em', display: 'block', mb: 1, opacity: 0.5 }}>
              ADRESSE EMAIL
            </Typography>
            <TextField
              type="email"
              variant="standard"
              fullWidth
              disabled={true}
              placeholder="Inscriptions prochainement"
              sx={{
                '& .MuiInput-root': {
                  color: '#fff', borderBottom: '2px solid rgba(255, 255, 255, 0.1)', pb: 1,
                  '&.Mui-disabled:before': { borderBottomStyle: 'solid' }
                }
              }}
            />
          </Box>

          <Button 
            type="button" 
            variant="contained" 
            fullWidth
            disabled={true}
            sx={{ 
              height: 56, borderRadius: 0, fontFamily: '"Space Grotesk", sans-serif', fontSize: '1.1rem', letterSpacing: '0.1em',
              '&.Mui-disabled': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'rgba(255, 255, 255, 0.3)',
              }
            }}
          >
            OUVERTURE PROCHAINEMENT
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Ticketing;