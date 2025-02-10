import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import SuccessPage from './pages/SuccessPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFA500',
      dark: '#FF8C00'
    }
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", sans-serif'
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;