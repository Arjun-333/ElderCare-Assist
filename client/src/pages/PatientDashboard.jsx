import React, { useEffect, useState } from 'react';
import api from '../services/api';
import CaregiverCard from '../components/CaregiverCard';
import BookingModal from '../components/BookingModal';

const PatientDashboard = () => {
    const [caregivers, setCaregivers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCaregiver, setSelectedCaregiver] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [caregiversRes, bookingsRes] = await Promise.all([
                    api.get('/caregivers'),
                    api.get('/bookings')
                ]);
                setCaregivers(caregiversRes.data);
                setBookings(bookingsRes.data);
            } catch (err) {
                console.error("Error fetching data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [selectedCaregiver]); // Refresh on modal close ideally, but simplicity for now

    const getStatusColor = (status) => {
        switch (status) {
            case 'accepted': return 'text-green-600';
            case 'rejected': return 'text-red-600';
            case 'pending': return 'text-yellow-600';
            default: return 'text-gray-600';
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Available Caregivers Section */}
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Find a Caregiver</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {caregivers.map(cg => (
                    <CaregiverCard key={cg._id} caregiver={cg} onBook={() => setSelectedCaregiver(cg)} />
                ))}
            </div>

            {/* My Bookings Section */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>
            <div className="bg-white shadow overflow-hidden rounded-md">
                <ul className="divide-y divide-gray-200">
                    {bookings.map(booking => (
                        <li key={booking._id} className="px-6 py-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-blue-600">
                                        {booking.caregiverId?.name} ({booking.caregiverProfileId?.specialization})
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Date: {new Date(booking.date).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Notes: {booking.notes}
                                    </p>
                                </div>
                                <div>
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 ${getStatusColor(booking.status)}`}>
                                        {booking.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                    {bookings.length === 0 && <li className="px-6 py-4 text-gray-500">No bookings yet.</li>}
                </ul>
            </div>

            {/* Modal */}
            <BookingModal
                caregiver={selectedCaregiver}
                isOpen={!!selectedCaregiver}
                onClose={() => setSelectedCaregiver(null)}
            />
        </div>
    );
};

export default PatientDashboard;
