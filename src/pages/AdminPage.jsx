import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Divider,
} from "@mui/material";
import axios from "axios";

const AdminPage = () => {
  // --- AUTHENTICATION STATE ---
  // Initialize state directly from localStorage to prevent cascading re-renders
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("checkpoint_admin_auth") === "true";
  });
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);

  // --- ADMIN DATA STATE ---
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState("");

  const [recentTickets, setRecentTickets] = useState([]);
  const [showTrash, setShowTrash] = useState(false);
  const [trashTickets, setTrashTickets] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  // --- API FUNCTIONS ---
  const fetchRecentTickets = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/recent-tickets`);
      if (response.data.success) {
        setRecentTickets(response.data.tickets);
      }
    } catch (err) {
      console.error("Impossible de charger l'historique", err);
    }
  };

  const fetchTrashTickets = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/trash-tickets`);
      if (response.data.success) {
        setTrashTickets(response.data.tickets);
      }
    } catch (err) {
      console.error("Impossible de charger la corbeille", err);
    }
  };

  // Fetch data on mount if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchRecentTickets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Admin Login
  const handleLogin = (e) => {
    e.preventDefault();

    const SECRET_PASS = import.meta.env.VITE_ADMIN_PASSWORD;

    if (passwordInput === SECRET_PASS) {
      setIsAuthenticated(true);
      setLoginError(false);
      localStorage.setItem("checkpoint_admin_auth", "true"); // Save session to browser
      fetchRecentTickets(); // Fetch the history immediately
    } else {
      setLoginError(true);
      setPasswordInput(""); // Clear the wrong password
    }
  };

  // Handle Logout (Locks the page and clears session)
  const handleLogout = () => {
    localStorage.removeItem("checkpoint_admin_auth");
    setIsAuthenticated(false);
    setQrCode(null);
    setRecentTickets([]);
    setTrashTickets([]);
  };

  const handleGenerateTicket = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setQrCode(null);

    try {
      const response = await axios.post(
        `${API_URL}/api/admin/generate-ticket`,
        {
          firstName,
          lastName,
        },
      );

      if (response.data.success) {
        setQrCode(response.data.qrCode);
        fetchRecentTickets(); // Refresh the history list after a new generation
      } else {
        setError("Erreur lors de la génération.");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewOldQr = (ticketId) => {
    const frontendUrl = window.location.origin;
    const scannerUrl = `${frontendUrl}/scanner/${ticketId}`;

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(scannerUrl)}&color=9E1B1B&bgcolor=FFFFFF`;
    setQrCode(qrUrl);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll back to top to view QR
  };

  const handleDeleteTicket = async (id, name) => {
    if (
      !window.confirm(`Êtes-vous sûr de vouloir supprimer le pass de ${name} ?`)
    )
      return;
    try {
      const response = await axios.delete(
        `${API_URL}/api/admin/delete-ticket/${id}`,
      );
      if (response.data.success) {
        setRecentTickets(recentTickets.filter((ticket) => ticket.id !== id));
        setQrCode(null);
        fetchTrashTickets();
      }
    } catch (err) {
      console.error("Erreur lors de la suppression", err);
      alert("Erreur lors de la suppression du pass.");
    }
  };

  const handleRestoreTicket = async (id, name) => {
    if (!window.confirm(`Voulez-vous vraiment restaurer le pass de ${name} ?`))
      return;
    try {
      const response = await axios.put(
        `${API_URL}/api/admin/restore-ticket/${id}`,
      );
      if (response.data.success) {
        fetchTrashTickets(); // Refresh trash
        fetchRecentTickets(); // Refresh main list
      }
    } catch (err) {
      console.error("Erreur restauration", err);
    }
  };

  // ---------------------------------------------------------------------------
  // RENDER: LOGIN SCREEN (If not authenticated)
  // ---------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#131313",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Paper
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 400,
            backgroundColor: "#1A1A1A",
            border: "1px solid #9E1B1B",
            borderRadius: 0,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              border: "2px solid #9E1B1B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <Typography sx={{ color: "#9E1B1B", fontSize: "1.5rem" }}>
              🔐
            </Typography>
          </Box>
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              mb: 1,
              fontFamily: '"Space Grotesk", sans-serif',
            }}
          >
            ADMIN ACCESS
          </Typography>
          <Typography variant="body2" sx={{ color: "#c6c6c7", mb: 4 }}>
            Zone restreinte. Identification requise.
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              type="password"
              fullWidth
              placeholder="Mot de passe..."
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              error={loginError}
              helperText={loginError ? "Mot de passe incorrect" : ""}
              sx={{
                mb: 3,
                input: {
                  color: "#fff",
                  textAlign: "center",
                  letterSpacing: "0.2em",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: loginError
                      ? "#9E1B1B"
                      : "rgba(255,255,255,0.2)",
                  },
                  "&:hover fieldset": { borderColor: "#fff" },
                  "&.Mui-focused fieldset": { borderColor: "#9E1B1B" },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                backgroundColor: "#9E1B1B",
                borderRadius: 0,
                "&:hover": { backgroundColor: "#fff", color: "#9E1B1B" },
              }}
            >
              DÉVERROUILLER
            </Button>
          </form>
        </Paper>
      </Box>
    );
  }

  // ---------------------------------------------------------------------------
  // RENDER: ADMIN DASHBOARD (If authenticated)
  // ---------------------------------------------------------------------------
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#131313",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      {/* Header with Logout Button */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <Button
          onClick={handleLogout}
          sx={{
            color: "#c6c6c7",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 0,
            "&:hover": { color: "#9E1B1B", borderColor: "#9E1B1B" },
          }}
        >
          DÉCONNEXION
        </Button>
      </Box>

      <Paper
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 500,
          backgroundColor: "#1A1A1A",
          border: "1px solid #9E1B1B",
          borderRadius: 0,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            mb: 1,
            fontFamily: '"Space Grotesk", sans-serif',
            textAlign: "center",
          }}
        >
          ADMIN <span style={{ color: "#9E1B1B" }}>PORTAL</span>
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#c6c6c7", mb: 4, textAlign: "center" }}
        >
          Générateur de Pass manuel après réception du paiement.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {qrCode ? (
          // Success State: Show the generated QR Code
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h6" sx={{ color: "#39FF14", mb: 2 }}>
              PASS PRÊT !
            </Typography>
            <Box
              sx={{
                p: 2,
                backgroundColor: "#fff",
                display: "inline-block",
                mb: 3,
              }}
            >
              <img
                src={qrCode}
                alt="Generated QR"
                style={{ width: "200px", height: "200px" }}
              />
            </Box>
            <Typography variant="body2" sx={{ color: "#c6c6c7", mb: 3 }}>
              Faites une capture d'écran et envoyez ce QR Code au client sur
              WhatsApp.
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setQrCode(null);
                setFirstName("");
                setLastName("");
              }}
              sx={{ color: "#fff", borderColor: "rgba(255,255,255,0.2)" }}
            >
              GÉNÉRER UN AUTRE PASS
            </Button>
          </Box>
        ) : (
          // Input Form for the Admin
          <form onSubmit={handleGenerateTicket}>
            <TextField
              variant="standard"
              fullWidth
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Prénom (ex: Modou)"
              sx={{
                mb: 3,
                "& .MuiInput-root": {
                  color: "#fff",
                  borderBottom: "2px solid rgba(255, 255, 255, 0.2)",
                },
              }}
            />
            <TextField
              variant="standard"
              fullWidth
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Nom (ex: Ndiaye)"
              sx={{
                mb: 4,
                "& .MuiInput-root": {
                  color: "#fff",
                  borderBottom: "2px solid rgba(255, 255, 255, 0.2)",
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ backgroundColor: "#9E1B1B", height: 50, borderRadius: 0 }}
            >
              {loading ? "GÉNÉRATION..." : "GÉNÉRER LE QR CODE"}
            </Button>
          </form>
        )}

        {/* --- RECENT TICKETS HISTORY & TRASH --- */}
        <Box sx={{ mt: 6 }}>
          <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)", mb: 3 }} />

          {/* Header of the list with the Toggle Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: "#c6c6c7", letterSpacing: "0.1em" }}
            >
              {showTrash
                ? "CORBEILLE (PASS SUPPRIMÉS)"
                : "DERNIERS PASS GÉNÉRÉS"}
            </Typography>
            <Button
              size="small"
              onClick={() => {
                if (!showTrash) fetchTrashTickets();
                setShowTrash(!showTrash);
              }}
              sx={{ color: showTrash ? "#c6c6c7" : "#9E1B1B" }}
            >
              {showTrash ? "RETOUR À L'HISTORIQUE" : "VOIR LA CORBEILLE 🗑️"}
            </Button>
          </Box>

          {/* Scrollable Container for Tickets and Trash */}
          <Box
            sx={{
              maxHeight: "350px",
              overflowY: "auto",
              pr: 1,
              // Custom scrollbar styling
              "&::-webkit-scrollbar": { width: "6px" },
              "&::-webkit-scrollbar-track": {
                background: "rgba(255,255,255,0.02)",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(158, 27, 27, 0.5)",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": { background: "#9E1B1B" },
            }}
          >
            {/* TRASH VIEW */}
            {showTrash ? (
              trashTickets.length === 0 ? (
                <Typography
                  variant="body2"
                  sx={{ color: "#555", fontStyle: "italic" }}
                >
                  La corbeille est vide.
                </Typography>
              ) : (
                trashTickets.map((ticket) => (
                  <Box
                    key={ticket.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 1.5,
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      backgroundColor: "rgba(158, 27, 27, 0.05)",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#fff",
                          textTransform: "uppercase",
                          fontSize: "0.9rem",
                          textDecoration: "line-through",
                          opacity: 0.5,
                        }}
                      >
                        {ticket.attendeeName}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "#555", fontFamily: "monospace" }}
                      >
                        ID: {ticket.id}
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      onClick={() =>
                        handleRestoreTicket(ticket.id, ticket.attendeeName)
                      }
                      sx={{
                        color: "#39FF14",
                        border: "1px solid rgba(57, 255, 20, 0.3)",
                        borderRadius: 0,
                        "&:hover": {
                          backgroundColor: "rgba(57, 255, 20, 0.1)",
                        },
                      }}
                    >
                      ♻️ RESTAURER
                    </Button>
                  </Box>
                ))
              )
            ) : /* NORMAL RECENT TICKETS VIEW */
            recentTickets.length === 0 ? (
              <Typography
                variant="body2"
                sx={{ color: "#555", fontStyle: "italic" }}
              >
                Aucun pass généré pour le moment.
              </Typography>
            ) : (
              recentTickets.map((ticket) => (
                <Box
                  key={ticket.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 1.5,
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.02)" },
                  }}
                >
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#fff",
                        textTransform: "uppercase",
                        fontSize: "0.9rem",
                      }}
                    >
                      {ticket.attendeeName}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "#9E1B1B", fontFamily: "monospace" }}
                    >
                      ID: {ticket.id}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      size="small"
                      onClick={() => handleViewOldQr(ticket.id)}
                      sx={{
                        color: "#c6c6c7",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: 0,
                        "&:hover": { backgroundColor: "#fff", color: "#000" },
                      }}
                    >
                      VOIR QR
                    </Button>
                    <Button
                      size="small"
                      onClick={() =>
                        handleDeleteTicket(ticket.id, ticket.attendeeName)
                      }
                      sx={{
                        color: "#ffb4ab",
                        border: "1px solid rgba(158, 27, 27, 0.5)",
                        borderRadius: 0,
                        "&:hover": {
                          backgroundColor: "#9E1B1B",
                          color: "#fff",
                        },
                      }}
                    >
                      🗑️
                    </Button>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminPage;
