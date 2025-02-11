import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const Analysis = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [ageGroupData, setAgeGroupData] = useState([]);
  const [pincodeData, setPincodeData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(
        "http://localhost:5000/api/admin/registrations",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRegistrations(response.data);
      processData(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  const processData = (data) => {
    // Process state data
    const stateCount = data.reduce((acc, reg) => {
      acc[reg.state] = (acc[reg.state] || 0) + 1;
      return acc;
    }, {});
    setStateData(
      Object.entries(stateCount).map(([state, count]) => ({
        state,
        count,
      }))
    );

    // Process age groups
    const ageGroups = {
      "Under 18": 0,
      "18-25": 0,
      "26-35": 0,
      "36-50": 0,
      "Over 50": 0,
    };
    data.forEach((reg) => {
      const age = parseInt(reg.age);
      if (age < 18) ageGroups["Under 18"]++;
      else if (age <= 25) ageGroups["18-25"]++;
      else if (age <= 35) ageGroups["26-35"]++;
      else if (age <= 50) ageGroups["36-50"]++;
      else ageGroups["Over 50"]++;
    });
    setAgeGroupData(
      Object.entries(ageGroups).map(([range, count]) => ({
        range,
        count,
      }))
    );

    // Process pincode data
    const pincodeCount = data.reduce((acc, reg) => {
      acc[reg.pincode] = (acc[reg.pincode] || 0) + 1;
      return acc;
    }, {});
    setPincodeData(
      Object.entries(pincodeCount)
        .map(([pincode, count]) => ({
          pincode,
          count,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
    );
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: "15px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4">Registration Analysis</Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/admin/dashboard")}
            sx={{
              backgroundColor: "#ff2b2b",
              "&:hover": { backgroundColor: "#cc0000" },
            }}
          >
            Back to Dashboard
          </Button>
        </Box>

        <Grid container spacing={4}>
          {/* State Distribution Chart */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2, height: "400px" }}>
              <Typography variant="h6" gutterBottom>
                Registration by State
              </Typography>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={stateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="state" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Age Distribution Chart */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2, height: "400px" }}>
              <Typography variant="h6" gutterBottom>
                Age Distribution
              </Typography>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={ageGroupData}
                    dataKey="count"
                    nameKey="range"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    label
                  >
                    {ageGroupData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Top Pincodes Chart */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 2, height: "400px" }}>
              <Typography variant="h6" gutterBottom>
                Top 5 Pincodes
              </Typography>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={pincodeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="pincode" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Summary Statistics */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Quick Statistics
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                  <Typography variant="subtitle1">Total Registrations</Typography>
                  <Typography variant="h4">{registrations.length}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="subtitle1">Unique States</Typography>
                  <Typography variant="h4">{stateData.length}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="subtitle1">Average Age</Typography>
                  <Typography variant="h4">
                    {Math.round(
                      registrations.reduce((acc, reg) => acc + parseInt(reg.age), 0) /
                        registrations.length
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="subtitle1">Unique Pincodes</Typography>
                  <Typography variant="h4">
                    {new Set(registrations.map((reg) => reg.pincode)).size}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Analysis; 