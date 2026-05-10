import React from 'react';
import { Grid, Typography, Box } from '@mui/material';

// Import the concept image
import conceptImg from '../assets/images/concept-group.PNG';

const Concept = () => {
  return (
    <Grid container spacing={8} sx={{ alignItems: 'center' }} id="concept">
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="h3" sx={{ mb: 4, color: '#fff', fontFamily: '"Space Grotesk", sans-serif' }}>
          <span style={{ color: '#9E1B1B' }}>//</span> L'EXPÉRIENCE
        </Typography>
        <Typography variant="body1" sx={{ color: '#c6c6c7', mb: 3, fontSize: '1.125rem' }}>
          À l'origine pensé comme une émission, <strong>Le Checkpoint</strong> évolue aujourd'hui pour devenir une véritable expérience physique. C'est l'espace où notre communauté active de plus de 1000 passionnés peut enfin se rencontrer dans la vraie vie.
        </Typography>
        <Typography variant="body1" sx={{ color: '#c6c6c7', fontSize: '1.125rem' }}>
          Que vous soyez créateur de contenu, cosplayer, joueur passionné ou simplement amateur d'animes et de mangas, cet événement est pensé pour favoriser les échanges et la création de souvenirs dans un cadre chaleureux et sécurisé.
        </Typography>
      </Grid>
      
      <Grid size={{ xs: 12, md: 6 }}>
        {/* Container for the image with cyber-accents */}
        <Box sx={{ position: 'relative', height: 350, width: '100%' }}>
          <Box sx={{ position: 'absolute', top: 0, right: 0, width: 30, height: 30, borderTop: '2px solid #9E1B1B', borderRight: '2px solid #9E1B1B', zIndex: 10 }} />
          <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: 30, height: 30, borderBottom: '2px solid #9E1B1B', borderLeft: '2px solid #9E1B1B', zIndex: 10 }} />
          <Box sx={{ 
            width: '100%', height: '100%', 
            backgroundColor: '#1A1A1A', 
            backgroundImage: `url(${conceptImg})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            filter: 'contrast(110%)',
            border: '1px solid rgba(255,255,255,0.1)'
          }} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Concept;