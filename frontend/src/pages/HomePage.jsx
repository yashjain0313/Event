import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: "#f5f5f5" }}>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          background:
            'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/tedx-bg.jpeg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          display: "flex",
          alignItems: "center",
          color: "white",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{ display: "flex", flexDirection: "column", maxWidth: "600px" }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                fontWeight: "bold",
                mb: 2,
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              TEDx Talk with Striver
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.5rem", sm: "2rem" },
                mb: 4,
                color: "#ff2b2b",
              }}
            >
              From Code to Success: A Journey of Persistence
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/register")}
              sx={{
                py: 2,
                px: 4,
                fontSize: "1.2rem",
                backgroundColor: "#ff2b2b",
                width: "fit-content",
                "&:hover": {
                  backgroundColor: "#cc0000",
                },
              }}
            >
              Register Now
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Event Details Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          <Box flex={1} minWidth={280}>
            <Paper sx={{ p: 3, textAlign: "center", height: "100%" }}>
              <CalendarTodayIcon
                sx={{ fontSize: 40, color: "#ff2b2b", mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>
                Date
              </Typography>
              <Typography>March 13, 2025</Typography>
            </Paper>
          </Box>
          <Box flex={1} minWidth={280}>
            <Paper sx={{ p: 3, textAlign: "center", height: "100%" }}>
              <LocationOnIcon sx={{ fontSize: 40, color: "#ff2b2b", mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Venue
              </Typography>
              <Typography>
                Auditorium, Ajay Kumar Garg Engineering College, Ghaziabad
              </Typography>
            </Paper>
          </Box>
          <Box flex={1} minWidth={280}>
            <Paper sx={{ p: 3, textAlign: "center", height: "100%" }}>
              <AccessTimeIcon sx={{ fontSize: 40, color: "#ff2b2b", mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Time
              </Typography>
              <Typography>10:00 AM - 1:00 PM</Typography>
            </Paper>
          </Box>
        </Box>
      </Container>

      {/* About Speaker Section */}
      <Box sx={{ backgroundColor: "#fff", py: 8 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              alignItems: "center",
            }}
          >
            <Box sx={{ flex: "1 1 400px" }}>
              <Box
                component="img"
                src="/striver.jpeg"
                alt="Striver"
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Box>
            <Box sx={{ flex: "1 1 400px" }}>
              <Typography variant="h3" gutterBottom color="primary">
                Meet Raj Vikramaditya
              </Typography>
              <Typography variant="h5" gutterBottom color="text.secondary">
                Known as Striver in the Tech Community
              </Typography>
              <Typography paragraph>
                A visionary in the tech education space, Raj Vikramaditya
                (Striver) has transformed the way students approach competitive
                programming and DSA learning. With over 200,000 students
                benefiting from his guidance, he's become a beacon of hope for
                aspiring software engineers.
              </Typography>
              <Typography paragraph>
                An IIT Roorkee graduate, Striver has worked with leading tech
                giants and has created one of the most comprehensive DSA
                courses, the renowned "Striver's SDE Sheet," which has become a
                go-to resource for tech interviews.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* What to Expect Section */}
      <Box sx={{ backgroundColor: "#f8f8f8", py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom color="primary">
            What to Expect
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, mt: 4 }}>
            <Box sx={{ flex: "1 1 300px" }}>
              <Paper elevation={3} sx={{ p: 4, height: "100%" }}>
                <Typography variant="h5" gutterBottom color="primary">
                  Tech Journey
                </Typography>
                <Typography>
                  Learn about Striver's journey from college to becoming a
                  prominent figure in the tech education space.
                </Typography>
              </Paper>
            </Box>
            <Box sx={{ flex: "1 1 300px" }}>
              <Paper elevation={3} sx={{ p: 4, height: "100%" }}>
                <Typography variant="h5" gutterBottom color="primary">
                  Success Principles
                </Typography>
                <Typography>
                  Discover the mindset and strategies that helped him impact
                  thousands of tech careers.
                </Typography>
              </Paper>
            </Box>
            <Box sx={{ flex: "1 1 300px" }}>
              <Paper elevation={3} sx={{ p: 4, height: "100%" }}>
                <Typography variant="h5" gutterBottom color="primary">
                  Interactive Session
                </Typography>
                <Typography>
                  Engage in a Q&A session and get your questions answered by
                  Striver himself.
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          backgroundColor: "#ff2b2b",
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            Don't Miss This Opportunity
          </Typography>
          <Typography paragraph sx={{ mb: 4 }}>
            Join us for an inspiring session that could change your tech career
            trajectory. Limited seats available!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/register")}
            sx={{
              backgroundColor: "white",
              color: "#ff2b2b",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            Register Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
