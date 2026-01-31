import React, { useEffect, useState } from 'react';
import api from '../services/api';

const CaregiverDashboard = () => {
    const [profile, setProfile] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    const fetchData = async () => {
        try {
            const profileRes = await api.get('/caregivers/me');
            setProfile(profileRes.data);
            setFormData(profileRes.data);

            const bookingsRes = await api.get('/bookings');
            setBookings(bookingsRes.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put('/caregivers/profile', formData);
            fetchData();
            setIsEditing(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleBookingStatus = async (id, status) => {
        try {
            await api.put(`/bookings/${id}`, { status });
            // local update
            setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
        } catch (err) {
            console.error(err);
        }
    };

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Section */}
            <div>
                <h2 className="text-2xl font-bold mb-4">My Profile</h2>
                <div className="bg-white shadow rounded-lg p-6">
                    {!isEditing ? (
                        <div>
                            <p className="mb-2"><strong>Status:</strong> <span className={profile.isVerified ? "text-green-600" : "text-yellow-600"}>{profile.isVerified ? "Verified" : "Pending Verification"}</span></p>
                            <p className="mb-2"><strong>Specialization:</strong> {profile.specialization}</p>
                            <p className="mb-2"><strong>Experience:</strong> {profile.experience} Years</p>
                            <p className="mb-2"><strong>Bio:</strong> {profile.details}</p>
                            <button onClick={() => setIsEditing(true)} className="mt-4 bg-gray-600 text-white px-4 py-2 rounded">Edit Profile</button>
                        </div>
                    ) : (
                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                            <input name="specialization" value={formData.specialization} onChange={(e) => setFormData({ ...formData, specialization: e.target.value })} className="border p-2 w-full rounded" />
                            <input name="experience" type="number" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className="border p-2 w-full rounded" />
                            <textarea name="details" value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} className="border p-2 w-full rounded" />
                            <div className="flex space-x-2">
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                                <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            {/* Bookings Section */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Booking Requests</h2>
                <div className="bg-white shadow overflow-hidden rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {bookings.map(booking => (
                            <li key={booking._id} className="px-6 py-4">
                                <div className="mb-2">
                                    <p className="text-sm font-medium text-blue-600">Patient: {booking.patientId?.name}</p>
                                    <p className="text-sm text-gray-500">Date: {new Date(booking.date).toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-500">Note: {booking.notes}</p>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className={`text-xs font-semibold uppercase ${booking.status === 'accepted' ? 'text-green-600' : booking.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                                        {booking.status}
                                    </span>
                                    {booking.status === 'pending' && (
                                        <div className="space-x-2">
                                            <button onClick={() => handleBookingStatus(booking._id, 'accepted')} className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600">Accept</button>
                                            <button onClick={() => handleBookingStatus(booking._id, 'rejected')} className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600">Reject</button>
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                        {bookings.length === 0 && <li className="px-6 py-4 text-gray-500">No requests received.</li>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CaregiverDashboard;
