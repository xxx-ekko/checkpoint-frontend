import React, { useState } from 'react';
import { 
  Container, Box, Typography, TextField, Button, 
  CircularProgress, Alert, Grid, Paper
} from '@mui/material';
import { keyframes } from '@emotion/react';
import axios from 'axios';
// Import the katana logo from your assets
import logoImg from '../assets/logo.jpeg'; 

// --- CYBER-RONIN ANIMATIONS ---
// Simulates a breathing neon light bloom
const neonPulse = keyframes`
  0% { box-shadow: 0 0 5px rgba(158, 27, 27, 0.2); }
  50% { box-shadow: 0 0 25px rgba(158, 27, 27, 0.6); }
  100% { box-shadow: 0 0 5px rgba(158, 27, 27, 0.2); }
`;

// Subtle mechanical glitch for hover states
const glitch = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-1px, 1px); }
  40% { transform: translate(-1px, -1px); }
  60% { transform: translate(1px, 1px); }
  80% { transform: translate(1px, -1px); }
  100% { transform: translate(0); }
`;

const LandingPage = () => {
  // Form state management for ticket generation
  const [attendeeName, setAttendeeName] = useState('');
  const [email, setEmail] = useState('');
  
  // UI state management
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [qrCode, setQrCode] = useState(null);

  // Handle the form submission to your local backend
  const handlePurchase = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/tickets/purchase', {
        attendeeName,
        email
      });

      if (response.data.success) {
        setQrCode(response.data.qrCode);
      }
    } catch (err) {
      console.error(err);
      setError('ERREUR SYSTÈME : Impossible de vérifier les autorisations.');
    } finally {
      setLoading(false);
    }
  };

  // Program details updated with Karaoke, Manga, and Pop Culture based on the PDF
  const programDetails = [
    {
      title: "JEUX VIDÉO",
      desc: "Des consoles en libre accès pour jouer librement dans une ambiance détendue et chill.",
      time: "FREE PLAY"
    },
    {
      title: "JEUX DE SOCIÉTÉ",
      desc: "Uno, Loup-Garou, Guess Up. Des jeux interactifs pour briser la glace et favoriser les échanges.",
      time: "CO-OP / VERSUS"
    },
    {
      title: "ÉMISSION EN LIVE",
      desc: "Une édition spéciale de Checkpoint. Prenez la parole et débattez sur l'actu manga et pop culture !",
      time: "TALK SHOW"
    },
    {
      title: "KARAOKÉ & BLIND TEST",
      desc: "Chantez vos openings d'anime préférés et testez vos connaissances musicales et geeks.",
      time: "CHALLENGE"
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#131313', pb: 10, overflowX: 'hidden' }}>
      
      {/* NAVBAR */}
      <Box sx={{ 
        borderBottom: '1px solid rgba(255,255,255,0.1)', py: 2, px: { xs: 2, md: 4 }, 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(19, 19, 19, 0.9)', backdropFilter: 'blur(10px)'
      }}>
        <Typography variant="h6" sx={{ color: '#fff', letterSpacing: '0px', fontFamily: '"Space Grotesk", sans-serif' }}>
          LE CHECKPOINT
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
          <Typography variant="body2" sx={{ cursor: 'pointer', fontWeight: 600, borderBottom: '2px solid #9E1B1B', color: '#fff' }} onClick={() => document.getElementById('concept').scrollIntoView({ behavior: 'smooth' })}>LE CONCEPT</Typography>
          <Typography variant="body2" sx={{ cursor: 'pointer', color: '#c6c6c7', transition: 'color 0.2s', '&:hover': { color: '#fff' } }} onClick={() => document.getElementById('program').scrollIntoView({ behavior: 'smooth' })}>PROGRAMME</Typography>
          <Typography variant="body2" sx={{ cursor: 'pointer', color: '#c6c6c7', transition: 'color 0.2s', '&:hover': { color: '#fff' } }} onClick={() => document.getElementById('arena').scrollIntoView({ behavior: 'smooth' })}>LE LIEU</Typography>
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          size="small" 
          onClick={() => document.getElementById('ticketing').scrollIntoView({ behavior: 'smooth' })}
          sx={{ py: 1, px: 2, borderRadius: 0, '&:hover': { animation: `${glitch} 0.2s linear` } }}
        >
          S'INSCRIRE
        </Button>
      </Box>

      {/* HERO SECTION */}
      <Box 
        sx={{ 
          position: 'relative',
          pt: 12, pb: 16, px: 2,
          textAlign: 'center',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      >
        <Container maxWidth="md">
          {/* Mockup Logo Container with Cyber Brackets */}
          <Box sx={{ position: 'relative', display: 'inline-block', mb: 8, p: 3, backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.05)' }}>
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: 20, height: 20, borderTop: '2px solid #9E1B1B', borderLeft: '2px solid #9E1B1B' }} />
            <Box sx={{ position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, borderBottom: '2px solid #9E1B1B', borderRight: '2px solid #9E1B1B' }} />
            <Box component="img" src={logoImg} alt="Le Checkpoint Logo" sx={{ width: 140, display: 'block' }} />
          </Box>

          <Typography variant="h2" sx={{ mb: 3, color: '#fff', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 }}>
            VOTRE NOUVELLE <span style={{ color: '#9E1B1B', textShadow: '0 0 20px rgba(158, 27, 27, 0.5)' }}>SAFE ZONE</span>
          </Typography>
          <Typography variant="body1" sx={{ color: '#c6c6c7', maxWidth: 750, mx: 'auto', mb: 8, fontSize: '1.125rem' }}>
            Le point de rencontre incontournable de la communauté Otaku, Gaming et Pop Culture au Sénégal. Passez du digital au réel dans une ambiance immersive, chill et conviviale.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            onClick={() => document.getElementById('ticketing').scrollIntoView({ behavior: 'smooth' })}
            sx={{ 
              animation: `${neonPulse} 2.5s infinite`, borderRadius: 0, px: 5, py: 2, fontSize: '1.1rem',
              '&:hover': { animation: 'none', backgroundColor: '#fff', color: '#9E1B1B' } 
            }}
          >
            GÉNÉRER MON PASS
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 12, md: 16 } }}>
        
        {/* THE CONCEPT SECTION */}
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
            <Box sx={{ position: 'relative', height: 350, width: '100%' }}>
              <Box sx={{ position: 'absolute', top: 0, right: 0, width: 30, height: 30, borderTop: '2px solid #9E1B1B', borderRight: '2px solid #9E1B1B', zIndex: 10 }} />
              <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: 30, height: 30, borderBottom: '2px solid #9E1B1B', borderLeft: '2px solid #9E1B1B', zIndex: 10 }} />
              <Box sx={{ 
                width: '100%', height: '100%', 
                backgroundColor: '#1A1A1A', 
                backgroundImage: 'url("https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")',
                backgroundSize: 'cover', backgroundPosition: 'center',
                filter: 'grayscale(100%) contrast(120%)',
                border: '1px solid rgba(255,255,255,0.1)'
              }} />
            </Box>
          </Grid>
        </Grid>

        {/* THE PROGRAM SECTION */}
        <Box id="program">
          <Typography variant="h3" sx={{ mb: 8, textAlign: 'center', color: '#fff', fontFamily: '"Space Grotesk", sans-serif' }}>
            <span style={{ color: '#9E1B1B' }}>//</span> LE PROGRAMME
          </Typography>
          <Grid container spacing={3}>
            {programDetails.map((prog, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                <Paper square sx={{ 
                  p: 4, height: '100%', backgroundColor: '#1A1A1A', 
                  border: idx === 0 ? '1px solid #9E1B1B' : '1px solid rgba(255,255,255,0.1)', 
                  boxShadow: idx === 0 ? '0 0 15px rgba(158, 27, 27, 0.2)' : 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': { border: '1px solid #9E1B1B', boxShadow: '0 0 15px rgba(158, 27, 27, 0.4)' }
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

        {/* THE LOCATION SECTION */}
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
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Typography sx={{ color: '#9E1B1B', fontSize: '1.5rem', lineHeight: 1 }}>⌖</Typography>
              <Typography variant="body2" sx={{ color: '#c6c6c7', letterSpacing: '0.05em' }}>
                Ruben House, Dakar<br/>Samedi 18 Avril
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ position: 'relative', height: 400, width: '100%' }}>
              <Box sx={{ position: 'absolute', bottom: -10, right: -10, width: 30, height: 30, borderBottom: '2px solid #9E1B1B', borderRight: '2px solid #9E1B1B', zIndex: 1 }} />
              <Box sx={{ 
                width: '100%', height: '100%', 
                backgroundColor: '#1A1A1A', 
                backgroundImage: 'url("https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")',
                backgroundSize: 'cover', backgroundPosition: 'center',
                filter: 'grayscale(100%) contrast(120%)',
                border: '1px solid rgba(255,255,255,0.1)'
              }} />
            </Box>
          </Grid>
        </Grid>

        {/* SECURE ACCESS (Ticketing System) */}
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
            
            {qrCode ? (
              // Success State: Ticket Generated
              <Box sx={{ textAlign: 'center', animation: 'fadeIn 0.5s ease-in' }}>
                <Typography variant="h3" sx={{ mb: 2, color: '#fff', fontFamily: '"Space Grotesk", sans-serif' }}>
                  STATUT : <span style={{ color: '#9E1B1B' }}>ACCÈS AUTORISÉ</span>
                </Typography>
                <Typography variant="body1" sx={{ color: '#c6c6c7', mb: 4 }}>
                  Pass généré pour <strong style={{ color: '#fff' }}>{attendeeName}</strong>. Faites une capture d'écran de ce QR code pour l'entrée.
                </Typography>
                
<Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                  <Box sx={{ border: '2px solid #9E1B1B', p: 1, backgroundColor: '#1A1A1A', position: 'relative', boxShadow: '0 0 15px rgba(158, 27, 27, 0.3)' }}>
                     {/* Decorative corner markers on the QR code */}
                     <Box sx={{ position: 'absolute', top: -4, left: -4, width: 8, height: 8, backgroundColor: '#9E1B1B' }} />
                     <Box sx={{ position: 'absolute', bottom: -4, right: -4, width: 8, height: 8, backgroundColor: '#9E1B1B' }} />
                     
                     {/* FIX: Removed grayscale filter, added drop-shadow for the neon glow */}
                     <img 
                       src={qrCode} 
                       alt="Pass QR Code" 
                       style={{ 
                         width: '200px', 
                         height: '200px', 
                         display: 'block',
                         filter: 'drop-shadow(0px 0px 5px rgba(158, 27, 27, 0.5))' 
                       }} 
                     />
                  </Box>
                </Box>

                <Button 
                  variant="outlined" 
                  fullWidth 
                  onClick={() => { setQrCode(null); setAttendeeName(''); setEmail(''); }} 
                  sx={{ 
                    borderRadius: 0, borderColor: 'rgba(255,255,255,0.2)', color: '#fff', 
                    py: 1.5, fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.1em',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: '#fff' } 
                  }}
                >
                  GÉNÉRER UN AUTRE PASS
                </Button>
              </Box>
            ) : (
              // Default State: Registration Form
              <form onSubmit={handlePurchase} style={{ textAlign: 'center' }}>
                <Typography variant="h2" sx={{ mb: 2, color: '#fff', fontFamily: '"Space Grotesk", sans-serif', fontSize: { xs: '2rem', md: '2.5rem' } }}>
                  RÉSERVEZ VOTRE <span style={{ color: '#9E1B1B', textShadow: '0 0 10px rgba(158,27,27,0.3)' }}>PLACE</span>
                </Typography>
                <Typography variant="body1" sx={{ color: '#c6c6c7', mb: 5, fontSize: '0.9rem' }}>
                  Événement privé et communautaire. Les places sont limitées pour garantir une expérience optimale à tous les participants.
                </Typography>

                {error && (
                  <Alert severity="error" sx={{ mb: 4, borderRadius: 0, backgroundColor: 'rgba(158, 27, 27, 0.1)', color: '#ffb4ab', border: '1px solid #9E1B1B' }}>
                    {error}
                  </Alert>
                )}

                <Box sx={{ textAlign: 'left', mb: 3 }}>
                  <Typography variant="caption" sx={{ color: '#c6c6c7', fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.1em', display: 'block', mb: 1 }}>
                    NOM OU PSEUDO (GAMERTAG)
                  </Typography>
                  <TextField
                    variant="standard"
                    fullWidth
                    required
                    value={attendeeName}
                    onChange={(e) => setAttendeeName(e.target.value)}
                    placeholder="Ex: Modou Ndiaye"
                    sx={{
                      '& .MuiInput-root': {
                        color: '#fff', borderBottom: '2px solid rgba(255, 255, 255, 0.2)', pb: 1,
                        '&:hover:not(.Mui-disabled):before': { borderBottom: '2px solid rgba(255, 255, 255, 0.5)' },
                        '&:after': { borderBottom: '2px solid #9E1B1B' }
                      }
                    }}
                  />
                </Box>

                <Box sx={{ textAlign: 'left', mb: 6 }}>
                  <Typography variant="caption" sx={{ color: '#c6c6c7', fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.1em', display: 'block', mb: 1 }}>
                    ADRESSE EMAIL
                  </Typography>
                  <TextField
                    type="email"
                    variant="standard"
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hokage@konoha.com"
                    sx={{
                      '& .MuiInput-root': {
                        color: '#fff', borderBottom: '2px solid rgba(255, 255, 255, 0.2)', pb: 1,
                        '&:hover:not(.Mui-disabled):before': { borderBottom: '2px solid rgba(255, 255, 255, 0.5)' },
                        '&:after': { borderBottom: '2px solid #9E1B1B' }
                      }
                    }}
                  />
                </Box>

                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  size="large" 
                  fullWidth
                  disabled={loading}
                  sx={{ 
                    animation: loading ? 'none' : `${neonPulse} 2s infinite`, 
                    height: 56, borderRadius: 0, fontFamily: '"Space Grotesk", sans-serif', fontSize: '1.1rem', letterSpacing: '0.1em',
                    '&:hover': { backgroundColor: '#fff', color: '#9E1B1B', animation: 'none' }
                  }}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'OBTENIR MON PASS'}
                </Button>
              </form>
            )}
          </Paper>
        </Box>
      </Container>

      {/* FOOTER */}
      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 16, pt: 4, px: { xs: 2, md: 8 }, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 3 }}>
        <Typography variant="h6" sx={{ fontSize: '1rem', color: '#fff', fontFamily: '"Space Grotesk", sans-serif' }}>
          OTAKU SENEGAL
        </Typography>
        <Box sx={{ display: 'flex', gap: { xs: 2, md: 4 } }}>
          <Typography variant="caption" sx={{ color: '#c6c6c7', cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.1em', '&:hover': { color: '#fff' } }}>MIND7 COMPANY</Typography>
          <Typography variant="caption" sx={{ color: '#c6c6c7', cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.1em', '&:hover': { color: '#fff' } }}>CONTACT</Typography>
        </Box>
        <Typography variant="caption" sx={{ color: '#515050', fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.1em' }}>
          © 2026 LE CHECKPOINT
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;