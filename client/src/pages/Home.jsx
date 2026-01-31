import React from 'react';
import { useAuth } from '../context/AuthContext';
import PatientDashboard from './PatientDashboard';
import CaregiverDashboard from './CaregiverDashboard';
import AdminDashboard from './AdminDashboard';
import heroImage from '../assets/hero_doctor.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    if (loading) return null; // Avoid flicker

    if (user) {
        if (user.role === 'admin') return <AdminDashboard />;
        if (user.role === 'caregiver') return <CaregiverDashboard />;
        return <PatientDashboard />;
    }

    return (
        <div className="bg-brand-light min-h-screen">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 flex flex-col-reverse lg:flex-row items-center">

                {/* Text Content */}
                <div className="lg:w-1/2 mt-10 lg:mt-0 z-10">
                    <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                        Your Personal <br />
                        <span className="text-gray-900">Health Universe</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 max-w-lg">
                        We merge cutting-edge technology with world-class medical expertise to give you faster, smarter, and more personal healthcare.
                    </p>

                    <div className="mt-8 flex space-x-4">
                        <button
                            onClick={() => navigate('/register')}
                            className="bg-brand hover:bg-brand-accent text-gray-900 font-semibold px-8 py-4 rounded-full shadow-lg transition transform hover:scale-105"
                        >
                            Book a Schedule
                        </button>
                        <button className="bg-white border border-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-full hover:shadow-md transition">
                            Explore Service
                        </button>
                    </div>

                    {/* Avatars */}
                    <div className="mt-12">
                        <p className="text-sm font-semibold text-gray-500 mb-3">Meet the Minds Behind Your Care</p>
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-10 w-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="doctor" />
                                </div>
                            ))}
                            <div className="h-10 w-10 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-500">
                                See all &rarr;
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero Image / Illustration */}
                <div className="lg:w-1/2 relative flex justify-center lg:justify-end">
                    {/* Background Blob */}
                    <div className="absolute top-0 right-0 bg-brand w-3/4 h-full rounded-tl-[100px] rounded-br-[100px] rounded-bl-[50px] opacity-50 z-0 transform translate-x-10 -translate-y-10"></div>

                    <img
                        src={heroImage}
                        alt="Doctor"
                        className="relative z-10 w-full max-w-md lg:max-w-lg drop-shadow-2xl"
                    />

                    {/* Floating Badge Example */}
                    <div className="absolute top-1/4 right-10 z-20 bg-white p-3 rounded-2xl shadow-lg flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                        <div className="bg-blue-100 p-2 rounded-full">
                            👩‍⚕️
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-800">Psychologist</p>
                            <div className="flex -space-x-1 mt-1">
                                <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                                <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Pills */}
                    <div className="absolute bottom-10 left-10 lg:left-0 z-20 flex flex-wrap gap-2 max-w-xs">
                        {['Orthopedics', 'Oncology', 'Cardiology', 'Pediatrics'].map(tag => (
                            <span key={tag} className="bg-white px-4 py-2 rounded-full shadow-md text-sm font-medium text-gray-700">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white rounded-t-[50px]">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10">
                    <h2 className="text-4xl font-bold text-gray-900">
                        Because Your Health <br /> Deserves the Best
                    </h2>
                    <p className="text-gray-500 max-w-md mt-4 md:mt-0">
                        We blend breakthrough technology with compassionate care to deliver personalized health solutions that put you first.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: 'AI-Driven Precision', icon: '🧬', color: 'bg-green-100' },
                        { title: 'Personalized Care Plans', icon: '📝', color: 'bg-brand' },
                        { title: 'Continuous Monitoring', icon: '📊', color: 'bg-blue-100' }
                    ].map((feature, idx) => (
                        <div key={idx} className={`${feature.color} p-8 rounded-3xl h-64 flex flex-col justify-between hover:shadow-lg transition`}>
                            <div className="text-4xl bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm">
                                {feature.icon}
                            </div>
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                                <span className="bg-white p-2 rounded-full">
                                    &rarr;
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
