import React, { useState, useEffect } from 'react';
import { 
  Container, Box, Typography, TextField, Button, 
  CircularProgress, Alert, Grid, Paper,
  IconButton, Menu, MenuItem, Fab, Fade
} from '@mui/material';
import { keyframes } from '@emotion/react';
import axios from 'axios';
import logoImg from '../assets/logo.jpeg'; 
import heroBg from '../assets/images/hero-bg.PNG';
import conceptImg from '../assets/images/concept-group.PNG';
import spotImg from '../assets/images/spot-gaming.PNG';
import transitionBg from '../assets/images/transition-bg.PNG';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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

  // 👇 --- NOUVEAUX STATES POUR LE MENU ET LE SCROLL --- 👇
  // Menu Burger
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileAnchorEl);
  const handleMenuOpen = (event) => setMobileAnchorEl(event.currentTarget);
  const handleMenuClose = () => setMobileAnchorEl(null);

  // Bouton Retour en haut
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  // 👆 ------------------------------------------------ 👆

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

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#131313', pb: 10, overflowX: 'hidden' }}>
      
{/* NAVBAR FIXE */}
      <Box sx={{ 
        borderBottom: '1px solid rgba(255,255,255,0.1)', py: 2, px: { xs: 2, md: 4 }, 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, // Passé en fixed et zIndex très haut
        backgroundColor: 'rgba(19, 19, 19, 0.9)', backdropFilter: 'blur(10px)'
      }}>
        <Typography variant="h6" sx={{ color: '#fff', letterSpacing: '0px', fontFamily: '"Space Grotesk", sans-serif' }}>
          LE CHECKPOINT
        </Typography>

        {/* Menu Desktop (Caché sur mobile) */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
          <Typography variant="body2" sx={{ cursor: 'pointer', fontWeight: 600, borderBottom: '2px solid #9E1B1B', color: '#fff' }} onClick={() => document.getElementById('concept').scrollIntoView({ behavior: 'smooth' })}>LE CONCEPT</Typography>
          <Typography variant="body2" sx={{ cursor: 'pointer', color: '#c6c6c7', transition: 'color 0.2s', '&:hover': { color: '#fff' } }} onClick={() => document.getElementById('program').scrollIntoView({ behavior: 'smooth' })}>PROGRAMME</Typography>
          <Typography variant="body2" sx={{ cursor: 'pointer', color: '#c6c6c7', transition: 'color 0.2s', '&:hover': { color: '#fff' } }} onClick={() => document.getElementById('arena').scrollIntoView({ behavior: 'smooth' })}>LE LIEU</Typography>
        </Box>

        {/* Bouton Inscription + Burger Menu */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="small" 
            onClick={() => document.getElementById('ticketing').scrollIntoView({ behavior: 'smooth' })}
            sx={{ py: 1, px: 2, borderRadius: 0, '&:hover': { animation: `${glitch} 0.2s linear` } }}
          >
            S'INSCRIRE
          </Button>

          {/* Icône Burger (Visible uniquement sur mobile) */}
          <IconButton 
            onClick={handleMenuOpen}
            sx={{ display: { xs: 'flex', md: 'none' }, color: '#fff' }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      {/* COMPOSANT MENU DÉROULANT MOBILE */}
      <Menu
        anchorEl={mobileAnchorEl}
        open={isMobileMenuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { 
            backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: 0, mt: 1, width: '200px'
          }
        }}
      >
        <MenuItem onClick={() => { handleMenuClose(); document.getElementById('concept').scrollIntoView({ behavior: 'smooth' }); }} sx={{ color: '#fff', fontFamily: '"Space Grotesk", sans-serif' }}>LE CONCEPT</MenuItem>
        <MenuItem onClick={() => { handleMenuClose(); document.getElementById('program').scrollIntoView({ behavior: 'smooth' }); }} sx={{ color: '#fff', fontFamily: '"Space Grotesk", sans-serif' }}>PROGRAMME</MenuItem>
        <MenuItem onClick={() => { handleMenuClose(); document.getElementById('arena').scrollIntoView({ behavior: 'smooth' }); }} sx={{ color: '#fff', fontFamily: '"Space Grotesk", sans-serif' }}>LE LIEU</MenuItem>
      </Menu>

      {/* HERO SECTION */}
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
          {/* Mockup Logo Container with Cyber Brackets */}
          {/* <Box sx={{ position: 'relative', display: 'inline-block', mb: 8, p: 3, backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.05)' }}> */}
            {/* <Box sx={{ position: 'absolute', top: 0, left: 0, width: 20, height: 20, borderTop: '2px solid #9E1B1B', borderLeft: '2px solid #9E1B1B' }} /> */}
            {/* <Box sx={{ position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, borderBottom: '2px solid #9E1B1B', borderRight: '2px solid #9E1B1B' }} /> */}
            {/* <Box component="img" src={logoImg} alt="Le Checkpoint Logo" sx={{ width: 140, display: 'block' }} /> */}
          {/* </Box> */}

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

      <Container maxWidth="lg" sx={{ mt: { xs: 10, md: 16 }, display: 'flex', flexDirection: 'column', gap: { xs: 12, md: 16 } }}>
        
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
            {/* C'est CE Box là (height: 350) qui avait sauté ! */}
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

        {/* THE PROGRAM SECTION */}
        <Box id="program">
          <Typography variant="h3" sx={{ mb: 8, textAlign: 'center', color: '#fff', fontFamily: '"Space Grotesk", sans-serif' }}>
            <span style={{ color: '#9E1B1B' }}>//</span> LE PROGRAMME
          </Typography>
          <Grid container spacing={3}>
            {programDetails.map((prog, idx) => (
<Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                <Paper square sx={{ 
                  p: 4, height: '100%', 
                  
                  // Reduced the opacity to 0.5 and 0.8 so the background image is clearly visible
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
            <Box 
              component="a" 
              href="https://maps.app.goo.gl/DVrzFga4WMkCv8xc9?g_st=ic" 
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                display: 'flex', gap: 2, alignItems: 'flex-start', 
                textDecoration: 'none', cursor: 'pointer',
                // 👇 Petit effet visuel : le texte s'éclaire quand on passe la souris
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
            {/* Ici c'était height: 400 ! */}
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

        <Box 
          sx={{ 
            width: '100vw',
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            mt: { xs: 12, md: 16 },
            mb: { xs: 8, md: 12 },
            py: { xs: 12, md: 18 },
            textAlign: 'center',
            backgroundImage: `linear-gradient(rgba(19, 19, 19, 0.7), rgba(19, 19, 19, 0.95)), url(${transitionBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: { xs: 'scroll', md: 'fixed' },
            borderTop: '1px solid rgba(158, 27, 27, 0.3)',
            borderBottom: '1px solid rgba(158, 27, 27, 0.3)',
          }}
        >
          <Typography 
            variant="h3" 
            sx={{ 
              color: '#fff', 
              fontFamily: '"Space Grotesk", sans-serif', 
              fontWeight: 700, 
              letterSpacing: '0.05em',
              textShadow: '0 0 20px rgba(0,0,0,0.8)'
            }}
          >
            READY TO <span style={{ color: '#9E1B1B', textShadow: '0 0 15px rgba(158,27,27,0.5)' }}>PLAY ?</span>
          </Typography>
        </Box>

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
                    placeholder="Inscriptions prochainement"
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
                    placeholder="Inscriptions prochainement"
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
                  disabled={true}
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
          LE CHECKPOINT
        </Typography>
<       Box sx={{ display: 'flex', gap: { xs: 2, md: 4 } }}>
          <Typography 
            component="a" 
            href="https://www.instagram.com/mind7company" 
            target="_blank"
            rel="noopener noreferrer"
            variant="caption" 
            sx={{ color: '#c6c6c7', textDecoration: 'none', cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.1em', '&:hover': { color: '#fff' } }}
          >
            MIND7 COMPANY
          </Typography>

          <Typography 
            component="a" 
            href="https://www.instagram.com/fanglamarque" 
            target="_blank"
            rel="noopener noreferrer"
            variant="caption" 
            sx={{ color: '#c6c6c7', textDecoration: 'none', cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.1em', '&:hover': { color: '#fff' } }}
          >
            FANG LA MARQUE
          </Typography>

          <Typography 
            component="a" 
            href="tel:221778791567" 
            target="_blank"
            rel="noopener noreferrer"
            variant="caption" 
            sx={{ color: '#c6c6c7', textDecoration: 'none', cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.1em', '&:hover': { color: '#fff' } }}
          >
            CONTACT : +221 77 879 15 67
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: '#515050', fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.1em' }}>
          © 2026 LE CHECKPOINT
        </Typography>
      </Box>
      {/* BOUTON RETOUR EN HAUT */}
      <Fade in={showScroll}>
        <Fab 
          onClick={scrollTop}
          sx={{
            position: 'fixed', 
            bottom: { xs: 20, md: 40 }, 
            right: { xs: 20, md: 40 }, 
            zIndex: 1000,
            backgroundColor: '#9E1B1B',
            color: '#fff',
            borderRadius: 0, // Design carré pour rester dans le thème Cyber
            '&:hover': { backgroundColor: '#fff', color: '#9E1B1B' }
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Fade>
    </Box>
  );
};

export default LandingPage;