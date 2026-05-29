import React, { useState, useEffect, useCallback } from 'react';
import { Box, Container, Typography, Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Use Vite's import.meta.glob to dynamically import all images from the gallery directory
const imageModules = import.meta.glob('../assets/gallery/*.{png,jpg,jpeg,svg,webp}', { eager: true });
const initialImages = Object.values(imageModules).map((mod) => mod.default);

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    // Shuffle images on component mount so it's always random
    setImages(shuffleArray(initialImages));
  }, []);

  const handleOpenImage = (index) => {
    setSelectedIndex(index);
  };

  const handleCloseImage = () => {
    setSelectedIndex(null);
  };

  const handlePrev = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') handleCloseImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext]);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#131313', pb: 10, overflowX: 'hidden' }}>
      <Navbar />
      
      <Container maxWidth="lg" sx={{ mt: { xs: 14, md: 18 }, mb: 8 }}>
        <Typography 
          variant="h3" 
          component="h1"
          sx={{ 
            color: '#fff', 
            fontFamily: '"Space Grotesk", sans-serif', 
            fontWeight: 700,
            mb: 6,
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          Galerie
        </Typography>
        
        {images.length > 0 ? (
          <Box 
            sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, 
              gap: 3 
            }}
          >
            {images.map((imgUrl, index) => (
              <Box 
                key={index} 
                onClick={() => handleOpenImage(index)}
                sx={{ 
                  width: '100%', 
                  overflow: 'hidden', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              >
                <img
                  src={imgUrl}
                  alt={`Gallery image ${index + 1}`}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#c6c6c7', 
              textAlign: 'center',
              mt: 8,
              fontFamily: '"Inter", sans-serif'
            }}
          >
            La galerie est vide pour le moment.
          </Typography>
        )}
      </Container>
      
      {/* Lightbox Dialog for full-screen image view */}
      <Dialog 
        open={selectedIndex !== null} 
        onClose={handleCloseImage}
        fullScreen
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }
        }}
      >
        <IconButton 
          onClick={handleCloseImage}
          sx={{ 
            position: 'absolute', 
            top: { xs: 16, sm: 24 }, 
            right: { xs: 16, sm: 24 }, 
            color: '#fff',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(4px)',
            '&:hover': { backgroundColor: 'rgba(158, 27, 27, 0.9)' },
            zIndex: 1300
          }}
        >
          <CloseIcon />
        </IconButton>
        
        {selectedIndex !== null && (
          <Box 
            sx={{ 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              p: { xs: 2, sm: 6, md: 10 },
              position: 'relative'
            }}
            onClick={handleCloseImage}
          >
            {/* Prev Button */}
            <IconButton 
              onClick={handlePrev}
              sx={{ 
                position: 'absolute', 
                left: { xs: 8, sm: 24, md: 40 }, 
                color: '#fff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(4px)',
                '&:hover': { backgroundColor: 'rgba(158, 27, 27, 0.9)' },
                zIndex: 1300
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            <img 
              src={images[selectedIndex]} 
              alt="Enlarged gallery view" 
              onClick={(e) => e.stopPropagation()} // Prevent click from bubbling up to the Box
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%', 
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
                userSelect: 'none'
              }} 
            />

            {/* Next Button */}
            <IconButton 
              onClick={handleNext}
              sx={{ 
                position: 'absolute', 
                right: { xs: 8, sm: 24, md: 40 }, 
                color: '#fff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(4px)',
                '&:hover': { backgroundColor: 'rgba(158, 27, 27, 0.9)' },
                zIndex: 1300
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        )}
      </Dialog>
      
      <Footer />
    </Box>
  );
};

export default GalleryPage;
