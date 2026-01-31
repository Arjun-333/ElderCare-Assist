import React from 'react';
import { useAuth } from '../context/AuthContext';
import PatientDashboard from './PatientDashboard';
import CaregiverDashboard from './CaregiverDashboard';
import AdminDashboard from './AdminDashboard';

const Home = () => {
    const { user, loading } = useAuth();

    if (loading) return <div className="text-center mt-20">Loading...</div>;

    if (!user) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
                <div className="text-center max-w-2xl px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-6">Care that Comes to You</h1>
                    <p className="text-lg text-gray-700 mb-8">
                        ElderCare-Assist connects your elderly loved ones with verified nurses, physiotherapists, and attendants for professional home-based care.
                    </p>
                    <div className="space-x-4">
                        <a href="/register" className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition shadow-lg">Get Started</a>
                        <a href="/login" className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-full font-semibold hover:bg-blue-50 transition">Login</a>
                    </div>
                </div>
            </div>
        );
    }

    if (user.role === 'admin') return <AdminDashboard />;
    if (user.role === 'caregiver') return <CaregiverDashboard />;
    return <PatientDashboard />;
};

export default Home;
