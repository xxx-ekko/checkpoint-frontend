import React, { useState, useEffect } from 'react';
import { Fade, Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  // Monitor the scroll position to hide/show the button
  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };
    
    window.addEventListener('scroll', checkScrollTop);
    
    // Clean up event listener on unmount
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  // Handle smooth scroll back to the top
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
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
          borderRadius: 0, // Square design to match the cyber theme
          '&:hover': { backgroundColor: '#fff', color: '#9E1B1B' }
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Fade>
  );
};

export default ScrollToTop;