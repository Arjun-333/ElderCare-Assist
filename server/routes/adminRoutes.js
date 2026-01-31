const express = require('express');
const router = express.Router();
const { getPendingCaregivers, verifyCaregiver } = require('../controllers/adminController');
const auth = require('../middleware/authMiddleware');

// Middleware to check if user is admin (Simple check)
const adminAuth = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    next();
};

router.get('/pending', [auth, adminAuth], getPendingCaregivers);
router.put('/verify/:id', [auth, adminAuth], verifyCaregiver);

module.exports = router;
