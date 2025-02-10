import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Box
} from '@mui/material';
import axios from 'axios';

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(location.state?.message || '');

  useEffect(() => {
    // Clear any existing tokens
    localStorage.removeItem('adminToken');
    localStorage.removeItem('tokenExpiry');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { data } = await axios.post('http://localhost:5000/api/admin/login', credentials);
      
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('tokenExpiry', Date.now() + data.expiresIn);
      
      navigate('/admin/dashboard');
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: 4,
        pb: 6
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{ color: '#1a237e', fontWeight: 'bold', mb: 3 }}
          >
            Admin Login
          </Typography>

          {message && (
            <Alert 
              severity="info" 
              sx={{ mb: 2 }}
              onClose={() => setMessage('')}
            >
              {message}
            </Alert>
          )}

          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 2 }}
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              margin="normal"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                fontSize: '1.1rem',
                backgroundColor: '#FFA500',
                '&:hover': {
                  backgroundColor: '#FF8C00'
                }
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLogin; 