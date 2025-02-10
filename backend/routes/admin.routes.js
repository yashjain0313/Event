const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const Registration = require("../models/Registration");
const { protect } = require("../middleware/auth");

// Admin login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if credentials match hardcoded admin values
    if (username !== "admin") {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Verify password
    const isMatch = password === "admin";
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token with 30 minutes expiry
    const token = jwt.sign(
      { id: "admin", role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );

    res.json({
      success: true,
      token,
      expiresIn: 30 * 60 * 1000, // 30 minutes in milliseconds
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all registrations (protected route)
router.get("/registrations", protect, async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json({ success: true, data: registrations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update registration
router.put("/registrations/:id", protect, async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!registration) {
      return res.status(404).json({ error: "Registration not found" });
    }

    res.json({ success: true, data: registration });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete registration
router.delete("/registrations/:id", protect, async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);

    if (!registration) {
      return res.status(404).json({ error: "Registration not found" });
    }

    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add new registration (protected route)
router.post("/registrations", protect, async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    res.status(201).json({ success: true, data: registration });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
