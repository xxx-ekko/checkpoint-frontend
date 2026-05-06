// src/theme.js
import { createTheme } from '@mui/material/styles';

const checkpointTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#9E1B1B', // Primary Crimson
        },
        background: {
            default: '#131313', // Deep Black Void
            paper: '#1A1A1A',   // Surface Black
        },
        text: {
            primary: '#FFFFFF', // Stark White
            secondary: '#c6c6c7', // Cool Gray
        },
    },
    typography: {
        fontFamily: '"Inter", sans-serif',
        h1: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, letterSpacing: '-0.04em' },
        h2: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, letterSpacing: '-0.02em', textTransform: 'uppercase' },
        h3: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, textTransform: 'uppercase' },
        h4: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, textTransform: 'uppercase' },
        h5: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, textTransform: 'uppercase' },
        h6: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' },
        body1: { fontSize: '1.125rem', lineHeight: 1.6 },
        body2: { fontSize: '1rem', lineHeight: 1.5 },
    },
    shape: {
        borderRadius: 0, // CRITICAL: Sharp edges only (0px)
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: '"Space Grotesk", sans-serif',
                    borderRadius: 0,
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    padding: '12px 32px',
                    boxShadow: 'none',
                    transition: 'all 0.1s ease-in-out',
                    border: '1px solid transparent',
                    '&:hover': {
                        backgroundColor: '#FFFFFF',
                        color: '#9E1B1B',
                        borderColor: '#9E1B1B',
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none', // Remove default MUI overlay
                    borderRadius: 0,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 0,
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                        '&:hover fieldset': { borderColor: '#FFFFFF' },
                        '&.Mui-focused fieldset': { borderColor: '#9E1B1B', borderWidth: '1px' },
                    },
                },
            },
        },
    },
});

export default checkpointTheme;