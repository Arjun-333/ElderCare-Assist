const CaregiverProfile = require('../models/CaregiverProfile');
const User = require('../models/User');

// @route   GET /api/caregivers
// @desc    Get all verified caregivers
// @access  Private (Patient/Admin)
exports.getAllCaregivers = async (req, res) => {
    try {
        const caregivers = await CaregiverProfile.find({ isVerified: true })
            .populate('userId', 'name email')
            .select('-__v');
        res.json(caregivers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET /api/caregivers/me
// @desc    Get current caregiver profile
// @access  Private (Caregiver)
exports.getMyProfile = async (req, res) => {
    try {
        const profile = await CaregiverProfile.findOne({ userId: req.user.id });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   PUT /api/caregivers/profile
// @desc    Update caregiver profile
// @access  Private (Caregiver)
exports.updateProfile = async (req, res) => {
    const { specialization, experience, details, availability } = req.body;

    const profileFields = {};
    if (specialization) profileFields.specialization = specialization;
    if (experience) profileFields.experience = experience;
    if (details) profileFields.details = details;
    if (availability !== undefined) profileFields.availability = availability;

    try {
        let profile = await CaregiverProfile.findOne({ userId: req.user.id });

        if (profile) {
            // Update
            profile = await CaregiverProfile.findOneAndUpdate(
                { userId: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile);
        }

        // Create (Should have been created at register, but just in case)
        profileFields.userId = req.user.id;
        profile = new CaregiverProfile(profileFields);
        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
