// src/pages/ScannerPage.jsx
import React, { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, CircularProgress } from '@mui/material';
import { keyframes } from '@emotion/react';
import { Scanner } from '@yudiel/react-qr-scanner';
import axios from 'axios';

// --- ANIMATIONS ---
const pulseGreen = keyframes`
  0% { box-shadow: 0 0 10px rgba(57, 255, 20, 0.2); }
  50% { box-shadow: 0 0 30px rgba(57, 255, 20, 0.8); }
  100% { box-shadow: 0 0 10px rgba(57, 255, 20, 0.2); }
`;

const pulseRed = keyframes`
  0% { box-shadow: 0 0 10px rgba(158, 27, 27, 0.2); }
  50% { box-shadow: 0 0 30px rgba(158, 27, 27, 0.8); }
  100% { box-shadow: 0 0 10px rgba(158, 27, 27, 0.2); }
`;

const ScannerPage = () => {
   
  // LOGIN PROTECTION
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);  

  // State management: 'idle', 'loading', 'success', 'fraud', 'error'
  const [scanStatus, setScanStatus] = useState('idle');
  const [attendeeData, setAttendeeData] = useState(null);
  const [manualId, setManualId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fonction de validation du mot de passe via le .env
  const handleLogin = (e) => {
    e.preventDefault();
    // Vite utilise import.meta.env pour lire le fichier .env
    if (passwordInput === import.meta.env.VITE_SCANNER_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
      setPasswordInput('');
    }
  };

     // Handle the raw text extracted from the QR code
    const handleScan = async (scannedText) => {
    // Prevent multiple scans if already processing
    if (scanStatus !== 'idle') return;
    if (!scannedText) return;

    // Show a popup on your iPhone to see exactly what the QR code contains
    //alert("DATA LU : " + scannedText);

    setScanStatus('loading');

    // Expected format is now: CHECKPOINT_{ID}_{Name}
    const parts = scannedText.split('_');
    
    // Basic validation
    if (parts[0] !== 'CHECKPOINT' || !parts[1]) {
      // Display the wrong text on the error screen so we understand why it failed
      setErrorMessage('FORMAT INVALIDE : ' + scannedText);
      setScanStatus('error');
      return;
    }

    const ticketId = parts[1];
    await verifyTicketWithBackend(ticketId);
  };

  // The actual API call to your backend
  const verifyTicketWithBackend = async (ticketId) => {
    setScanStatus('loading');
    try {
      // Dynamically uses your Mac's network IP instead of 'localhost'
     // Use relative path to let the Vite proxy handle the network routing securely
    const response = await axios.post('/api/tickets/verify', {
      ticketId: ticketId
    });

      if (response.data.success) {
        // Ticket is valid and was just marked as SCANNED
        setAttendeeData(response.data.ticket);
        setScanStatus('success');
      } else {
        // Ticket is fake or database error
        setErrorMessage(response.data.message || 'ERREUR INCONNUE');
        setScanStatus('error');
      }
    } catch (err) {
      // Backend returned an error (e.g., 400 Bad Request for ALREADY SCANNED)
      if (err.response && err.response.status === 403) {
        setAttendeeData(err.response.data.ticket);
        setErrorMessage(err.response.data.message);
        setScanStatus('fraud');
      } else {
        console.error(err);
        setErrorMessage('ERREUR SERVEUR DE VÉRIFICATION');
        setScanStatus('error');
      }
    }
  };

  // Reset the scanner for the next person
  const resetScanner = () => {
    setScanStatus('idle');
    setAttendeeData(null);
    setErrorMessage('');
    setManualId('');
  };

  // Helper to test without using the camera
  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualId) verifyTicketWithBackend(manualId);
  };

  // SI NON AUTHENTIFIÉ -> AFFICHER L'ÉCRAN DE LOGIN
  if (!isAuthenticated) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#131313', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <Paper sx={{ p: 4, width: '100%', maxWidth: 400, backgroundColor: '#1A1A1A', border: '1px solid #9E1B1B', borderRadius: 0, textAlign: 'center' }}>
          <Box sx={{ width: 50, height: 50, borderRadius: '50%', border: '2px solid #9E1B1B', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
            <Typography sx={{ color: '#9E1B1B', fontSize: '1.5rem' }}>🔒</Typography>
          </Box>
          <Typography variant="h5" sx={{ color: '#fff', mb: 1, fontFamily: '"Space Grotesk", sans-serif' }}>
            ACCÈS RESTREINT
          </Typography>
          <Typography variant="body2" sx={{ color: '#c6c6c7', mb: 4 }}>
            Veuillez saisir le code d'autorisation sécurité.
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              type="password"
              fullWidth
              placeholder="Code d'accès..."
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              error={loginError}
              helperText={loginError ? "Code d'accès incorrect" : ""}
              sx={{ 
                mb: 3, 
                input: { color: '#fff', textAlign: 'center', letterSpacing: '0.2em' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: loginError ? '#9E1B1B' : 'rgba(255,255,255,0.2)' },
                  '&:hover fieldset': { borderColor: '#fff' },
                  '&.Mui-focused fieldset': { borderColor: '#9E1B1B' }
                }
              }}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5, backgroundColor: '#9E1B1B', borderRadius: 0, '&:hover': { backgroundColor: '#fff', color: '#9E1B1B' } }}>
              DÉVERROUILLER LE TERMINAL
            </Button>
          </form>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#131313', display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER */}
      <Box sx={{ backgroundColor: '#1A1A1A', borderBottom: '2px solid #9E1B1B', p: 3, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ color: '#fff', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, letterSpacing: '0.1em' }}>
          TERMINAL SÉCURITÉ
        </Typography>
        <Typography variant="caption" sx={{ color: '#c6c6c7', letterSpacing: '0.2em' }}>
          LE CHECKPOINT - ACCÈS DAKAR
        </Typography>
      </Box>

      {/* MAIN CONTENT AREA */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        
        {scanStatus === 'idle' && (
          <Box sx={{ width: '100%', maxWidth: 500 }}>
            {/* The Camera Viewfinder */}
            <Box sx={{ 
              border: '2px solid #9E1B1B', p: 1, backgroundColor: '#000', mb: 4, position: 'relative'
            }}>
               <Box sx={{ position: 'absolute', top: -4, left: -4, width: 15, height: 15, borderTop: '4px solid #9E1B1B', borderLeft: '4px solid #9E1B1B', zIndex: 10 }} />
               <Box sx={{ position: 'absolute', top: -4, right: -4, width: 15, height: 15, borderTop: '4px solid #9E1B1B', borderRight: '4px solid #9E1B1B', zIndex: 10 }} />
               <Box sx={{ position: 'absolute', bottom: -4, left: -4, width: 15, height: 15, borderBottom: '4px solid #9E1B1B', borderLeft: '4px solid #9E1B1B', zIndex: 10 }} />
               <Box sx={{ position: 'absolute', bottom: -4, right: -4, width: 15, height: 15, borderBottom: '4px solid #9E1B1B', borderRight: '4px solid #9E1B1B', zIndex: 10 }} />
               
                <Scanner 
                 // FIX: Updated to the new API 'onScan' which returns an array of results
                 onScan={(detectedCodes) => {
                   if (detectedCodes && detectedCodes.length > 0) {
                     handleScan(detectedCodes[0].rawValue);
                   }
                 }} 
                 onError={(error) => console.log(error?.message)}
                 // Force the scanner to only look for QR codes to make it faster
                 formats={['qr_code']}
                 components={{
                   audio: false,
                   finder: true,
                 }}
               />
            </Box>

            {/* Manual Override Form (For testing or broken QR codes) */}
            <Paper sx={{ p: 3, backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 0 }}>
              <Typography variant="caption" sx={{ color: '#c6c6c7', mb: 2, display: 'block', textAlign: 'center' }}>
                SAISIE MANUELLE (OVERRIDE)
              </Typography>
              <form onSubmit={handleManualSubmit} style={{ display: 'flex', gap: '10px' }}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="ID du Ticket (ex: 12)"
                  value={manualId}
                  onChange={(e) => setManualId(e.target.value)}
                  sx={{ input: { color: '#fff', backgroundColor: '#131313' } }}
                />
                <Button type="submit" variant="contained" sx={{ backgroundColor: '#333', borderRadius: 0 }}>
                  VÉRIFIER
                </Button>
              </form>
            </Paper>
          </Box>
        )}

        {scanStatus === 'loading' && (
          <CircularProgress size={80} sx={{ color: '#9E1B1B' }} />
        )}

        {/* SUCCESS STATE - Big Green Screen */}
        {scanStatus === 'success' && (
          <Paper sx={{ 
            p: 4, width: '100%', maxWidth: 500, textAlign: 'center', 
            backgroundColor: 'rgba(57, 255, 20, 0.1)', border: '2px solid #39FF14',
            animation: `${pulseGreen} 2s infinite`, borderRadius: 0
          }}>
            <Typography variant="h2" sx={{ color: '#39FF14', fontWeight: 800, mb: 2 }}>
              OK
            </Typography>
            <Typography variant="h5" sx={{ color: '#fff', mb: 1, fontFamily: '"Space Grotesk", sans-serif' }}>
              ACCÈS VALIDÉ
            </Typography>
            <Typography variant="body1" sx={{ color: '#c6c6c7', mb: 4 }}>
             Participant : <strong style={{ color: '#fff', fontSize: '1.2rem' }}>{attendeeData?.attendeeName}</strong>            </Typography>            
            <Typography variant="caption" sx={{ display: 'block', color: '#39FF14', mb: 4, p: 2, border: '1px dashed #39FF14' }}>
              ACTION REQUISE : Remettez le bracelet / tampon au participant.
            </Typography>

            <Button variant="contained" fullWidth onClick={resetScanner} sx={{ py: 2, backgroundColor: '#39FF14', color: '#000', fontWeight: 'bold', fontSize: '1.2rem', borderRadius: 0, '&:hover': { backgroundColor: '#fff' } }}>
              SCAN SUIVANT
            </Button>
          </Paper>
        )}

        {/* FRAUD STATE - Big Red Screen */}
        {scanStatus === 'fraud' && (
          <Paper sx={{ 
            p: 4, width: '100%', maxWidth: 500, textAlign: 'center', 
            backgroundColor: 'rgba(158, 27, 27, 0.1)', border: '2px solid #9E1B1B',
            animation: `${pulseRed} 1s infinite`, borderRadius: 0
          }}>
            <Typography variant="h2" sx={{ color: '#9E1B1B', fontWeight: 800, mb: 2 }}>
              STOP
            </Typography>
            <Typography variant="h5" sx={{ color: '#fff', mb: 1, fontFamily: '"Space Grotesk", sans-serif' }}>
              TICKET DÉJÀ SCANNÉ
            </Typography>
            <Typography variant="body1" sx={{ color: '#c6c6c7', mb: 4 }}>
              Ce pass appartient à <strong style={{ color: '#fff' }}>{attendeeData?.attendeeName}</strong> et a déjà été utilisé.            </Typography>  
            <Typography variant="caption" sx={{ display: 'block', color: '#9E1B1B', mb: 4, p: 2, border: '1px dashed #9E1B1B' }}>
              ALERTE FRAUDE : Si la personne sort, elle doit présenter son tampon physique, pas le QR Code.
            </Typography>

            <Button variant="contained" fullWidth onClick={resetScanner} sx={{ py: 2, backgroundColor: '#9E1B1B', color: '#fff', fontWeight: 'bold', fontSize: '1.2rem', borderRadius: 0, '&:hover': { backgroundColor: '#fff', color: '#9E1B1B' } }}>
              SCAN SUIVANT
            </Button>
          </Paper>
        )}

        {/* ERROR STATE - Invalid format or server issue */}
        {scanStatus === 'error' && (
          <Paper sx={{ p: 4, width: '100%', maxWidth: 500, textAlign: 'center', backgroundColor: '#1A1A1A', border: '1px solid #555', borderRadius: 0 }}>
            <Typography variant="h4" sx={{ color: '#ffcc00', mb: 2 }}>⚠️ ERREUR</Typography>
            <Typography variant="body1" sx={{ color: '#fff', mb: 4 }}>{errorMessage}</Typography>
            <Button variant="outlined" fullWidth onClick={resetScanner} sx={{ py: 2, color: '#fff', borderColor: '#555', borderRadius: 0 }}>
              RÉESSAYER
            </Button>
          </Paper>
        )}

      </Box>
    </Box>
  );
};

export default ScannerPage;