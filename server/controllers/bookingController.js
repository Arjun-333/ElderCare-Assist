const Booking = require('../models/Booking');
const CaregiverProfile = require('../models/CaregiverProfile');

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Private (Patient)
exports.createBooking = async (req, res) => {
    try {
        const { caregiverProfileId, date, notes } = req.body;

        const caregiverProfile = await CaregiverProfile.findById(caregiverProfileId);
        if (!caregiverProfile) {
            return res.status(404).json({ message: 'Caregiver not found' });
        }

        const booking = new Booking({
            patientId: req.user.id,
            caregiverId: caregiverProfile.userId,
            caregiverProfileId,
            date,
            notes
        });

        await booking.save();
        res.json(booking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET /api/bookings
// @desc    Get bookings for current user (Patient or Caregiver)
// @access  Private
exports.getBookings = async (req, res) => {
    try {
        let bookings;
        if (req.user.role === 'caregiver') {
            bookings = await Booking.find({ caregiverId: req.user.id })
                .populate('patientId', 'name email')
                .sort({ date: 1 });
        } else {
            bookings = await Booking.find({ patientId: req.user.id })
                .populate('caregiverId', 'name') // User info of caregiver
                .populate('caregiverProfileId', 'specialization') // Profile info
                .sort({ date: 1 });
        }
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   PUT /api/bookings/:id
// @desc    Update booking status
// @access  Private
exports.updateBookingStatus = async (req, res) => {
    const { status } = req.body;
    try {
        let booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Check verification (Simple check: User must be involved involved)
        if (booking.patientId.toString() !== req.user.id && booking.caregiverId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        booking.status = status;
        await booking.save();
        res.json(booking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
