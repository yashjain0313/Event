import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Alert,
  CircularProgress,
  InputAdornment,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  InputLabel,
  Input,
} from "@mui/material";
import {
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Home as AddressIcon,
  Map as StateIcon,
  Pin as PinIcon,
  Cake as AgeIcon,
} from "@mui/icons-material";
import axios from "axios";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    state: "",
    pincode: "",
    age: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    phoneNumber: false,
    pincode: false,
    age: false,
  });

  const validateField = (name, value) => {
    const validations = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      phoneNumber: /^\d{10}$/,
      pincode: /^\d{6}$/,
      age: (value) => value >= 18 && value <= 100,
    };

    if (name in validations) {
      if (typeof validations[name] === "function") {
        return validations[name](value);
      }
      return validations[name].test(value);
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: !validateField(name, value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: !validateField(name, value),
    }));
  };

  const checkExisting = async (field) => {
    if (!formData[field]) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/registrations/check-existing",
        {
          [field]: formData[field],
        }
      );

      if (response.data.exists) {
        setError(`This ${field} is already registered`);
        return true;
      }
    } catch (err) {
      console.error("Check existing error:", err);
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validate all fields
    const newErrors = {
      email: !validateField("email", formData.email),
      phoneNumber: !validateField("phoneNumber", formData.phoneNumber),
      pincode: !validateField("pincode", formData.pincode),
      age: !validateField("age", formData.age),
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error)) return;

    // Check for existing registration
    if ((await checkExisting("email")) || (await checkExisting("phoneNumber")))
      return;

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/registrations", formData);
      setSuccess(true);
      setTimeout(() => navigate("/success"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          background: "linear-gradient(145deg, #ffffff, #f8f8f8)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            mb: 4,
            fontWeight: "bold",
            color: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          TEDx Registration Form
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Registration successful! Redirecting...
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Name Fields */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={errors.phoneNumber}>
                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  error={errors.phoneNumber}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon
                          color={errors.phoneNumber ? "error" : "action"}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.phoneNumber && (
                  <FormHelperText>Must be 10 digits</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={errors.email}>
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  error={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color={errors.email ? "error" : "action"} />
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.email && (
                  <FormHelperText>Invalid email format</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* Address Section */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                multiline
                rows={3}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AddressIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Location Info */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="state-label">State</InputLabel>
                <Select
                  labelId="state-label"
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  displayEmpty
                  input={
                    <Input
                      startAdornment={
                        <InputAdornment position="start">
                          <StateIcon color="action" />
                        </InputAdornment>
                      }
                      sx={{
                        paddingLeft: "40px", // Add space for icon
                        "& .MuiInput-input": {
                          marginLeft: "8px", // Space between icon and text
                        },
                      }}
                    />
                  }
                  sx={{
                    "& .MuiSelect-icon": {
                      right: "14px",
                      top: "calc(50% - 12px)",
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    <em>Select your state</em>
                  </MenuItem>
                  {indianStates.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth error={errors.pincode}>
                <TextField
                  label="Pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  error={errors.pincode}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PinIcon color={errors.pincode ? "error" : "action"} />
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.pincode && (
                  <FormHelperText>6 digits required</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth error={errors.age}>
                <TextField
                  label="Age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  error={errors.age}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AgeIcon color={errors.age ? "error" : "action"} />
                      </InputAdornment>
                    ),
                    inputProps: { min: 18, max: 100 },
                  }}
                />
                {errors.age && <FormHelperText>Age 18-100</FormHelperText>}
              </FormControl>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box sx={{ mt: 4, textAlign: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading || success}
                  sx={{
                    py: 1.5,
                    px: 6,
                    fontSize: "1.1rem",
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 5px 15px rgba(255, 43, 43, 0.3)",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Complete Registration"
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default RegistrationPage;
