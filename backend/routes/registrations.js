const router = require('express').Router();
const Registration = require('../models/Registration');

router.post('/', async (req, res) => {
  try {
    // Check if user already exists with same email or phone
    const existingUser = await Registration.findOne({
      $or: [
        { email: req.body.email },
        { phoneNumber: req.body.phoneNumber }
      ]
    });

    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        error: 'A registration already exists with this email or phone number' 
      });
    }

    // If no existing user, create new registration
    const registration = new Registration(req.body);
    await registration.save();
    
    res.status(201).json({ 
      success: true, 
      data: registration 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Add route to check existing registration
router.post('/check-existing', async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;
    
    const existingUser = await Registration.findOne({
      $or: [
        { email },
        { phoneNumber }
      ]
    });

    res.json({ 
      exists: !!existingUser,
      message: existingUser ? 'User already registered' : 'User not registered'
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router; 