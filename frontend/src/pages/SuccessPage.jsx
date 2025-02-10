import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <CheckCircleOutlineIcon 
          sx={{ 
            fontSize: 80, 
            color: 'success.main', 
            mb: 2 
          }} 
        />
        <Typography variant="h4" component="h1" gutterBottom>
          Registration Successful!
        </Typography>
        <Typography variant="body1" paragraph>
          Thank you for registering for the ISKCON event. 
          We look forward to seeing you!
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{ mt: 3 }}
        >
          Return to Home
        </Button>
      </Box>
    </Container>
  );
};

export default SuccessPage; 