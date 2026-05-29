// src/App.jsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import checkpointTheme from './theme';
import LandingPage from './pages/LandingPage';
import ScannerPage from './pages/ScannerPage';
import MaintenancePage from './pages/MaintenancePage';
import AdminPage from './pages/AdminPage';
import GalleryPage from './pages/GalleryPage';

function App() {
  return (
    <ThemeProvider theme={checkpointTheme}>
      {/* CssBaseline provides a consistent dark background across the app */}
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public maintenance page (Coming Soon) on the root domain */}
          <Route path="/" element={<LandingPage />} />

          <Route path="/admin-panel" element={<AdminPage />} />
          
          {/* Gallery Page */}
          <Route path="/galerie" element={<GalleryPage />} />
          
          {/* Full landing page hidden for the client to review */}
          <Route path="/preprod" element={<MaintenancePage />} />
          
          {/* Standard manual access for event staff */}
          <Route path="/scanner" element={<ScannerPage />} />
          
          {/* Dynamic access when staff scans a QR code with their native camera */}
          <Route path="/scanner/:ticketId" element={<ScannerPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;