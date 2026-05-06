// src/App.jsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import checkpointTheme from './theme';
import LandingPage from './pages/LandingPage';
import ScannerPage from './pages/ScannerPage';
import MaintenancePage from './pages/MaintenancePage';

function App() {
  return (
    <ThemeProvider theme={checkpointTheme}>
      {/* CssBaseline provides a consistent dark background across the app */}
      <CssBaseline />
      <Router>
        <Routes>
          {/* Main public page for users to buy tickets */}
          <Route path="/" element={<MaintenancePage />} />
          <Route path="/preprod" element={<LandingPage />} />
          
          
          {/* Hidden page for event staff to scan QR codes */}
          <Route path="/scanner" element={<ScannerPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;