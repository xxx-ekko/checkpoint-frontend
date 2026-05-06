// src/pages/MaintenancePage.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';

// Define the neon pulse animation for the text
const pulseNeon = keyframes`
  0% { text-shadow: 0 0 5px rgba(158, 27, 27, 0.2); }
  50% { text-shadow: 0 0 20px rgba(158, 27, 27, 0.8); }
  100% { text-shadow: 0 0 5px rgba(158, 27, 27, 0.2); }
`;

// Define a subtle glitch effect for the sub-header
const glitch = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`;

const MaintenancePage = () => {
  return (
    // Main wrapper covering the full viewport height
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#131313', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      p: 3,
      backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
      backgroundSize: '40px 40px',
    }}>
      
      {/* Central content container with a cyber-themed border */}
      <Box sx={{ 
        position: 'relative', 
        p: { xs: 4, md: 8 }, 
        backgroundColor: '#1A1A1A', 
        border: '1px solid rgba(255,255,255,0.05)', 
        textAlign: 'center', 
        maxWidth: 600 
      }}>
         {/* Cyber HUD Accents (Corners) */}
         <Box sx={{ position: 'absolute', top: 0, left: 0, width: 20, height: 20, borderTop: '2px solid #9E1B1B', borderLeft: '2px solid #9E1B1B' }} />
         <Box sx={{ position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, borderBottom: '2px solid #9E1B1B', borderRight: '2px solid #9E1B1B' }} />

         {/* Main status indicator */}
         <Typography variant="h2" sx={{ 
           color: '#fff', 
           fontFamily: '"Space Grotesk", sans-serif', 
           fontWeight: 800, 
           mb: 2, 
           animation: `${pulseNeon} 2s infinite` 
         }}>
           SYSTEM <span style={{ color: '#9E1B1B' }}>OFFLINE</span>
         </Typography>

         <Typography variant="h6" sx={{ 
           color: '#c6c6c7', 
           letterSpacing: '0.3em', 
           mb: 4, 
           fontFamily: '"Space Grotesk", sans-serif',
           '&:hover': { animation: `${glitch} 0.2s linear` }
         }}>
           DÉPLOIEMENT EN COURS
         </Typography>

         {/* Contextual message for the users */}
         <Typography variant="body1" sx={{ color: '#888', lineHeight: 1.8 }}>
           Les serveurs de billetterie du <strong>Checkpoint</strong> sont actuellement en cours de sécurisation et d'optimisation. 
           <br /><br />
           Revenez très bientôt pour générer votre pass d'accès. La Safe Zone sera bientôt prête.
         </Typography>
         
         {/* Decorative progress or loading indicator */}
         <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center', gap: 1 }}>
            <Box sx={{ width: 10, height: 10, backgroundColor: '#9E1B1B', animation: 'pulse 1.5s infinite alternate' }} />
            <Box sx={{ width: 10, height: 10, backgroundColor: '#9E1B1B', animation: 'pulse 1.5s infinite alternate 0.5s' }} />
            <Box sx={{ width: 10, height: 10, backgroundColor: '#9E1B1B', animation: 'pulse 1.5s infinite alternate 1s' }} />
         </Box>
      </Box>
    </Box>
  );
};

export default MaintenancePage;