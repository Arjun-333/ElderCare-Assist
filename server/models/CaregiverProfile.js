const mongoose = require('mongoose');

const caregiverProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    specialization: {
        type: String, // e.g., 'Nurse', 'Physiotherapist'
        required: true,
    },
    experience: {
        type: Number, // Years of experience
        required: true,
    },
    details: {
        type: String, // Bio or description
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    availability: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model('CaregiverProfile', caregiverProfileSchema);
