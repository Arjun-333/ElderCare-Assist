import React, { useEffect, useState } from 'react';
import api from '../services/api';
import CaregiverCard from '../components/CaregiverCard';

const PatientDashboard = () => {
    const [caregivers, setCaregivers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCaregivers = async () => {
            try {
                const res = await api.get('/caregivers');
                setCaregivers(res.data);
            } catch (err) {
                console.error("Error fetching caregivers", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCaregivers();
    }, []);

    const handleBook = (caregiver) => {
        // Placeholder for booking logic
        alert(`Booking functionality for ${caregiver.userId.name} coming next!`);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Available Caregivers</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {caregivers.map(cg => (
                    <CaregiverCard key={cg._id} caregiver={cg} onBook={handleBook} />
                ))}
            </div>
            {caregivers.length === 0 && (
                <p className="text-gray-500">No verified caregivers available at the moment.</p>
            )}
        </div>
    );
};

export default PatientDashboard;
