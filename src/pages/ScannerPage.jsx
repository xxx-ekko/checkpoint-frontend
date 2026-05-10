import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';

const ScannerPage = () => {
  // Extract ticket ID from the URL scanned by the phone camera
  const { ticketId } = useParams();

  // State management for ticket verification
  const [loading, setLoading] = useState(true);
  const [attendeeData, setAttendeeData] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  useEffect(() => {
    // If someone manually goes to /scanner without an ID in the URL
    if (!ticketId) {
      setError("Aucun QR Code détecté.");
      setLoading(false);
      return;
    }

    verifyTicketInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketId]);

  // Fetch the attendee information based on the unique ticket ID
  const verifyTicketInfo = async () => {
    try {
      // Backend should check if ID exists. If yes, return data. If no, return 404.
      const response = await axios.get(`${API_URL}/api/tickets/info/${ticketId}`);
      
      
      if (response.data.success) {
        setAttendeeData(response.data.ticket);
      } else {
        setError("QR CODE INVALIDE OU NON RECONNU.");
      }
    } catch (err) {
      console.error(err);
      setError("QR CODE INVALIDE : Ce pass n'existe pas dans la base de données.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#131313', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      
      {/* Header */}
      <Box sx={{ position: 'absolute', top: 0, width: '100%', borderBottom: '2px solid #9E1B1B', p: 2, textAlign: 'center', backgroundColor: '#1A1A1A' }}>
        <Typography variant="h6" sx={{ color: '#fff', fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.1em' }}>
          VERIFICATION ENTRY
        </Typography>
      </Box>

      {/* Loading State */}
      {loading && <CircularProgress size={60} sx={{ color: '#9E1B1B' }} />}

      {/* Error State (Fake QR Code or changed URL) */}
      {!loading && error && (
        <Paper sx={{ p: 4, width: '100%', maxWidth: 400, textAlign: 'center', backgroundColor: '#1A1A1A', border: '2px solid #9E1B1B', borderRadius: 0 }}>
          <Typography sx={{ fontSize: '4rem', mb: 1 }}>❌</Typography>
          <Typography variant="h5" sx={{ color: '#fff', mb: 2, fontFamily: '"Space Grotesk", sans-serif' }}>
            ACCÈS REFUSÉ
          </Typography>
          <Typography variant="body1" sx={{ color: '#9E1B1B', fontWeight: 'bold' }}>
            {error}
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', color: '#c6c6c7', mt: 3 }}>
            Le lien a potentiellement été falsifié.
          </Typography>
        </Paper>
      )}

      {/* Success State (Real QR Code) */}
      {!loading && attendeeData && (
        <Paper sx={{ p: 4, width: '100%', maxWidth: 400, textAlign: 'center', backgroundColor: 'rgba(57, 255, 20, 0.05)', border: '2px solid #39FF14', borderRadius: 0 }}>
          <Typography sx={{ fontSize: '4rem', mb: 1 }}>✅</Typography>
          <Typography variant="h5" sx={{ color: '#fff', mb: 3, fontFamily: '"Space Grotesk", sans-serif' }}>
            PASS VALIDE
          </Typography>
          
          <Box sx={{ textAlign: 'left', backgroundColor: '#1A1A1A', p: 3, border: '1px solid rgba(255,255,255,0.1)' }}>
            <Typography variant="caption" sx={{ color: '#c6c6c7', letterSpacing: '0.1em' }}>PRÉNOM & NOM</Typography>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2, textTransform: 'uppercase' }}>
              {attendeeData.attendeeName}
            </Typography>

            <Typography variant="caption" sx={{ color: '#c6c6c7', letterSpacing: '0.1em' }}>ID UNIQUE</Typography>
            <Typography variant="body1" sx={{ color: '#39FF14', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
              {ticketId}
            </Typography>
          </Box>
        </Paper>
      )}

    </Box>
  );
};

export default ScannerPage;