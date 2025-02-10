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
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState("");
  const [editDialog, setEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchRegistrations();

    // Add interval to check token expiration
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("adminToken");
    const expiry = localStorage.getItem("tokenExpiry");

    if (!token || !expiry || Date.now() > parseInt(expiry)) {
      handleLogout();
      return false;
    }
    return true;
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("tokenExpiry");
    navigate("/admin/login", {
      state: { message: "Session expired. Please login again." },
    });
  };

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/registrations",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRegistrations(data.data);
    } catch (error) {
      if (error.response?.status === 401) {
        handleLogout();
      } else {
        setError("Failed to fetch registrations");
      }
    } finally {
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
      if (error.response?.status === 401) {
        handleLogout();
      } else {
        setError("Failed to update registration");
      }
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
        if (error.response?.status === 401) {
          handleLogout();
        } else {
          setError("Failed to delete registration");
        }
      }
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Registrations
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{ float: "right" }}
          >
            Logout
          </Button>
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {registrations.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.state}</TableCell>
                  <TableCell>{user.age}</TableCell>
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
