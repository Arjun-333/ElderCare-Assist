import React, { useState } from 'react';
import api from '../services/api';

const BookingModal = ({ caregiver, isOpen, onClose }) => {
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/bookings', {
                caregiverProfileId: caregiver._id,
                date,
                notes
            });
            alert('Booking request sent!');
            onClose();
        } catch (err) {
            console.error(err);
            alert('Failed to book.');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="bg-white p-5 rounded-lg shadow-xl w-96">
                <h3 className="text-lg font-bold mb-4">Book {caregiver.userId.name}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Date</label>
                        <input type="date" required className="border p-2 w-full rounded" value={date} onChange={e => setDate(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Problem Description / Notes</label>
                        <textarea className="border p-2 w-full rounded" value={notes} onChange={e => setNotes(e.target.value)} />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Confirm Booking</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
