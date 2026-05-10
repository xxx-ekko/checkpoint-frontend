import React from 'react';
import { Grid, Typography, Box } from '@mui/material';

// Import the spot/location image
import spotImg from '../assets/images/spot-gaming.PNG';

const Location = () => {
  return (
    <Grid container spacing={8} sx={{ alignItems: 'center' }} id="arena">
      <Grid size={{ xs: 12, md: 5 }}>
        <Typography variant="h3" sx={{ mb: 2, color: '#fff', fontFamily: '"Space Grotesk", sans-serif' }}>
          <span style={{ color: '#9E1B1B' }}>//</span> LE SPOT
        </Typography>
        <Typography variant="h6" sx={{ color: '#c6c6c7', fontSize: '0.85rem', mb: 3, fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.1em' }}>
          ÉDITION DAKAR - RUBEN HOUSE
        </Typography>
        <Typography variant="body1" sx={{ color: '#c6c6c7', mb: 4, fontSize: '1.125rem' }}>
          Un cadre privé spécialement aménagé pour la communauté. Une ambiance lumineuse tamisée, idéale pour créer du contenu esthétique, discuter autour d'un jeu de société, ou s'affronter sur console.
        </Typography>
        
        {/* Clickable Google Maps link */}
        <Box 
          component="a" 
          href="https://maps.app.goo.gl/DVrzFga4WMkCv8xc9?g_st=ic" 
          target="_blank"
          rel="noopener noreferrer"
          sx={{ 
            display: 'flex', gap: 2, alignItems: 'flex-start', 
            textDecoration: 'none', cursor: 'pointer',
            '&:hover p': { color: '#fff' } 
          }}
        >
          <Typography sx={{ color: '#9E1B1B', fontSize: '1.5rem', lineHeight: 1 }}>⌖</Typography>
          <Typography variant="body2" sx={{ color: '#c6c6c7', letterSpacing: '0.05em', transition: 'color 0.2s' }}>
            Ruben House, Dakar<br/>Samedi 23 Mai<br/>
            <span style={{ color: '#9E1B1B', fontSize: '0.8rem', textDecoration: 'underline' }}>Ouvrir dans Maps</span>
          </Typography>
        </Box>
      </Grid>

      <Grid size={{ xs: 12, md: 7 }}>
        <Box sx={{ position: 'relative', height: 400, width: '100%' }}>
          <Box sx={{ position: 'absolute', bottom: -10, right: -10, width: 30, height: 30, borderBottom: '2px solid #9E1B1B', borderRight: '2px solid #9E1B1B', zIndex: 1 }} />
          <Box sx={{ 
            width: '100%', height: '100%', 
            backgroundColor: '#1A1A1A', 
            backgroundImage: `url(${spotImg})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            filter: 'contrast(110%)',
            border: '1px solid rgba(255,255,255,0.1)'
          }} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Location;