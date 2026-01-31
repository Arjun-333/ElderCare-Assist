const CaregiverProfile = require('../models/CaregiverProfile');
const User = require('../models/User');

// @route   GET /api/admin/pending
// @desc    Get all unverified caregivers
// @access  Private (Admin)
exports.getPendingCaregivers = async (req, res) => {
    try {
        const caregivers = await CaregiverProfile.find({ isVerified: false })
            .populate('userId', 'name email')
            .select('-__v');
        res.json(caregivers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   PUT /api/admin/verify/:id
// @desc    Verify a caregiver
// @access  Private (Admin)
exports.verifyCaregiver = async (req, res) => {
    try {
        const profile = await CaregiverProfile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        profile.isVerified = true;
        await profile.save();

        res.json({ message: 'Caregiver verified successfully', profile });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
