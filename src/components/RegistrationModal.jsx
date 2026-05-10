import React, { useState } from 'react';
import { Dialog, DialogContent, Box, Typography, IconButton, TextField, Button, CircularProgress, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

// Receive isOpen and onClose props from LandingPage
const RegistrationModal = ({ isOpen, onClose }) => {
  // Form state
  const [attendeeName, setAttendeeName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [qrCode, setQrCode] = useState(null);

  // Handle mock purchase logic
  const handlePurchase = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Future PayTech logic will go here
      const response = await axios.post('http://localhost:8080/api/tickets/purchase', { attendeeName, email });
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

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: '#1A1A1A', border: '1px solid rgba(158, 27, 27, 0.5)', borderRadius: 0,
          maxWidth: '450px', width: '100%', backgroundImage: 'none', boxShadow: '0 0 30px rgba(158, 27, 27, 0.3)'
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={onClose} sx={{ color: '#c6c6c7', '&:hover': { color: '#9E1B1B' } }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ px: { xs: 3, md: 5 }, pb: 5, pt: 0, textAlign: 'center' }}>
        {qrCode ? (
          // Success State
          <Box sx={{ animation: 'fadeIn 0.5s ease-in' }}>
            <Typography variant="h4" sx={{ mb: 2, color: '#fff', fontFamily: '"Space Grotesk", sans-serif' }}>
              STATUT : <span style={{ color: '#9E1B1B' }}>AUTORISÉ</span>
            </Typography>
            <Typography variant="body2" sx={{ color: '#c6c6c7', mb: 4 }}>
              Pass généré. Faites une capture d'écran.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <Box sx={{ border: '2px solid #9E1B1B', p: 1, backgroundColor: '#1A1A1A', position: 'relative' }}>
                 <img src={qrCode} alt="Pass QR Code" style={{ width: '180px', height: '180px', display: 'block' }} />
              </Box>
            </Box>
          </Box>
        ) : (
          // Registration Form
          <form onSubmit={handlePurchase}>
            <Typography variant="h3" sx={{ mb: 1, color: '#fff', fontFamily: '"Space Grotesk", sans-serif' }}>
              VOTRE <span style={{ color: '#9E1B1B' }}>PASS</span>
            </Typography>
            <Typography variant="body2" sx={{ color: '#c6c6c7', mb: 4 }}>
              Remplissez les informations pour accéder au paiement.
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 0, textAlign: 'left' }}>{error}</Alert>}

            <Box sx={{ textAlign: 'left', mb: 3 }}>
              <Typography variant="caption" sx={{ color: '#c6c6c7', letterSpacing: '0.1em', display: 'block', mb: 1 }}>NOM OU PSEUDO</Typography>
              <TextField
                variant="standard" fullWidth required value={attendeeName}
                onChange={(e) => setAttendeeName(e.target.value)} disabled={true} placeholder="Inscriptions prochainement"
                sx={{ '& .MuiInput-root': { color: '#fff', borderBottom: '2px solid rgba(255, 255, 255, 0.2)' } }}
              />
            </Box>

            <Box sx={{ textAlign: 'left', mb: 5 }}>
              <Typography variant="caption" sx={{ color: '#c6c6c7', letterSpacing: '0.1em', display: 'block', mb: 1 }}>ADRESSE EMAIL</Typography>
              <TextField
                type="email" variant="standard" fullWidth required value={email}
                onChange={(e) => setEmail(e.target.value)} disabled={true} placeholder="Inscriptions prochainement"
                sx={{ '& .MuiInput-root': { color: '#fff', borderBottom: '2px solid rgba(255, 255, 255, 0.2)' } }}
              />
            </Box>

            <Button 
              type="submit" variant="contained" fullWidth disabled={true}
              sx={{ backgroundColor: '#9E1B1B', height: 56, borderRadius: 0, '&:hover': { backgroundColor: '#fff', color: '#9E1B1B' } }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'PAYER MON TICKET'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModal;