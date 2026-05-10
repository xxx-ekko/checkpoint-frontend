import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

// Program details data array
const programDetails = [
  {
    title: "JEUX VIDÉO",
    desc: "Des consoles en libre accès pour jouer librement dans une ambiance détendue et chill.",
    time: "FREE PLAY",
    // Gaming controller with neon lights
    bgImage: "https://images.unsplash.com/photo-1675701299008-7958c985f955?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "JEUX DE SOCIÉTÉ",
    desc: "Uno, Loup-Garou, Guess Up. Des jeux interactifs pour briser la glace et favoriser les échanges.",
    time: "CO-OP / VERSUS",
    // Dice and board games in dark aesthetic
    bgImage: "https://images.unsplash.com/photo-1770160116616-2f7284d55f25?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "ÉMISSION EN LIVE",
    desc: "Une édition spéciale de Checkpoint. Prenez la parole et débattez sur l'actu manga et pop culture !",
    time: "TALK SHOW",
    // Professional microphone with dark/neon background
    bgImage: "https://images.unsplash.com/photo-1644767479973-a053733ef283?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "KARAOKÉ & BLIND TEST",
    desc: "Chantez vos openings d'anime préférés et testez vos connaissances musicales et geeks.",
    time: "CHALLENGE",
    // Neon music vibe
    bgImage: "https://images.unsplash.com/photo-1543148845-4b19c48482fd?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const Program = () => {
  return (
    <Box id="program">
      <Typography variant="h3" sx={{ mb: 8, textAlign: 'center', color: '#fff', fontFamily: '"Space Grotesk", sans-serif' }}>
        <span style={{ color: '#9E1B1B' }}>//</span> LE PROGRAMME
      </Typography>
      <Grid container spacing={3}>
        {programDetails.map((prog, idx) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
            <Paper square sx={{ 
              p: 4, height: '100%', 
              
              // Reduced the opacity so the background image is clearly visible
              backgroundImage: `linear-gradient(rgba(19, 19, 19, 0.5), rgba(19, 19, 19, 0.8)), url(${prog.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              
              // Fallback background color just in case the image takes time to load
              backgroundColor: '#1A1A1A', 
              
              border: idx === 0 ? '1px solid #9E1B1B' : '1px solid rgba(255,255,255,0.1)', 
              boxShadow: idx === 0 ? '0 0 15px rgba(158, 27, 27, 0.2)' : 'none',
              transition: 'all 0.3s ease',
              
              // Highlight effect on hover
              '&:hover': { 
                border: '1px solid #9E1B1B', 
                boxShadow: '0 0 15px rgba(158, 27, 27, 0.4)',
                // Slight reveal effect on hover by making the gradient lighter
                backgroundImage: `linear-gradient(rgba(19, 19, 19, 0.3), rgba(19, 19, 19, 0.7)), url(${prog.bgImage})`
              }
            }}>
              <Typography variant="h6" sx={{ color: '#9E1B1B', fontSize: '0.85rem', mb: 2, fontFamily: '"Space Grotesk", sans-serif' }}>
                ZONE 0{idx + 1}
              </Typography>
              <Typography variant="h4" sx={{ mb: 2, fontSize: '1.25rem', color: '#fff', fontFamily: '"Space Grotesk", sans-serif' }}>
                {prog.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#c6c6c7', mb: 4, minHeight: '80px' }}>
                {prog.desc}
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, color: '#fff', letterSpacing: '0.05em' }}>
                ◷ {prog.time}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Program;