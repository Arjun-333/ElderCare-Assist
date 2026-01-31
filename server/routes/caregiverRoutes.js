const express = require('express');
const router = express.Router();
const { getAllCaregivers, updateProfile, getMyProfile } = require('../controllers/caregiverController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, getAllCaregivers);
router.get('/me', auth, getMyProfile);
router.put('/profile', auth, updateProfile);

module.exports = router;
