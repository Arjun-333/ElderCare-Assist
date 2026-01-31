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
                        <a
                            href="#services"
                            className="bg-white border border-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-full hover:shadow-md transition inline-block"
                        >
                            Explore Service
                        </a>
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
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
            <div id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white rounded-t-[50px]">
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
                        {
                            title: 'AI-Driven Precision',
                            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
                            color: 'bg-green-100'
                        },
                        {
                            title: 'Personalized Care Plans',
                            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
                            color: 'bg-brand'
                        },
                        {
                            title: 'Continuous Monitoring',
                            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
                            color: 'bg-blue-100'
                        }
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
