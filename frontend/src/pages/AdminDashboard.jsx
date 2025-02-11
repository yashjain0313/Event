import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [editDialog, setEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    checkAuth();
    fetchRegistrations();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return false;
    }
    return true;
  };

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(
        "http://localhost:5000/api/admin/registrations",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRegistrations(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response?.status === 401) {
        handleLogout();
      } else {
        setError("Failed to fetch registrations");
      }
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditDialog(true);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `http://localhost:5000/api/admin/registrations/${selectedUser._id}`,
        selectedUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditDialog(false);
      fetchRegistrations();
    } catch (error) {
      setError("Failed to update registration");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this registration?")) {
      try {
        const token = localStorage.getItem("adminToken");
        await axios.delete(
          `http://localhost:5000/api/admin/registrations/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        fetchRegistrations();
      } catch (error) {
        setError("Failed to delete registration");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.text("TEDx Registrations", 15, 20);
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 15, 28);

    // Table data
    const tableData = registrations.map((reg) => [
      `${reg.firstName} ${reg.lastName}`,
      reg.email,
      reg.phoneNumber,
      reg.age,
      reg.state,
      reg.pincode,
      new Date(reg.createdAt).toLocaleDateString(),
    ]);

    // Create table
    doc.autoTable({
      head: [
        ["Name", "Email", "Phone", "Age", "State", "Pincode", "Registered On"],
      ],
      body: tableData,
      startY: 35,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [255, 43, 43] },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 40 },
        2: { cellWidth: 30 },
        3: { cellWidth: 15 },
        4: { cellWidth: 25 },
        5: { cellWidth: 20 },
        6: { cellWidth: 30 },
      },
    });

    doc.save(`registrations_${Date.now()}.pdf`);
  };

  const filteredRegistrations = registrations.filter((registration) => {
    const searchStr =
      `${registration.firstName} ${registration.lastName} ${registration.email} ${registration.phoneNumber} ${registration.state} ${registration.pincode}`.toLowerCase();
    return searchStr.includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          backgroundColor: "white",
          borderRadius: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h1">
            Registrations
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleDownloadPDF}
              startIcon={<DownloadIcon />}
              sx={{
                backgroundColor: "#ff2b2b",
                "&:hover": { backgroundColor: "#cc0000" },
              }}
            >
              Export PDF
            </Button>
            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{
                backgroundColor: "#ff2b2b",
                "&:hover": { backgroundColor: "#cc0000" },
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by name, email, phone, state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              maxWidth: "400px",
              mr: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
          <Button
            variant="contained"
            onClick={() => navigate("/admin/analysis")}
            sx={{
              backgroundColor: "#ff2b2b",
              "&:hover": { backgroundColor: "#cc0000" },
              ml: 2,
            }}
          >
            View Analysis
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TableContainer
          component={Paper}
          sx={{
            marginTop: "20px",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Age</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>State</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Pincode</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Registration Date
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRegistrations.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>{user.state}</TableCell>
                  <TableCell>{user.pincode}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(user)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(user._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={editDialog} onClose={() => setEditDialog(false)}>
          <DialogTitle>Edit Registration</DialogTitle>
          <DialogContent>
            {selectedUser && (
              <>
                <TextField
                  fullWidth
                  label="First Name"
                  value={selectedUser.firstName}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      firstName: e.target.value,
                    })
                  }
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  value={selectedUser.lastName}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      lastName: e.target.value,
                    })
                  }
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Phone"
                  value={selectedUser.phoneNumber}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      phoneNumber: e.target.value,
                    })
                  }
                  margin="normal"
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialog(false)}>Cancel</Button>
            <Button onClick={handleUpdate} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
