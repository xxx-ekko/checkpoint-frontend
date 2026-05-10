import React, { useState } from 'react';
import { Box, Container } from '@mui/material';

// Import all separated components
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Concept from '../components/Concept';
import Program from '../components/Program';
import Location from '../components/Location';
import TransitionBanner from '../components/TransitionBanner';
import Ticketing from '../components/Ticketing'; // <--- ADD THIS
import Footer from '../components/Footer';
//import RegistrationModal from '../components/RegistrationModal';
import ScrollToTop from '../components/ScrollToTop';

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#131313', pb: 10, overflowX: 'hidden' }}>
      
      <Navbar onOpenModal={handleModalOpen} />
      <Hero onOpenModal={handleModalOpen} />

      <Container maxWidth="lg" sx={{ mt: { xs: 10, md: 16 }, display: 'flex', flexDirection: 'column', gap: { xs: 12, md: 16 } }}>
        <Concept />
        <Program />
        <Location />
        <TransitionBanner />
        <Ticketing />
        
      </Container>

      <Footer />
      <ScrollToTop />
      {/*<RegistrationModal isOpen={isModalOpen} onClose={handleModalClose} />*/}

    </Box>
  );
};

export default LandingPage;