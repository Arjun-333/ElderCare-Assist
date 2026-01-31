import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-brand-light pt-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-900 rounded-full grid grid-cols-2 gap-0.5 p-1.5">
                            <div className="bg-white rounded-full"></div>
                            <div className="bg-white rounded-full"></div>
                            <div className="bg-white rounded-full"></div>
                            <div className="bg-brand rounded-full"></div>
                        </div>
                        <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight">
                            Careon
                        </Link>
                    </div>

                    {/* Center Links (Desktop) */}
                    <div className="hidden md:flex space-x-8">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "text-gray-900 font-bold border-b-2 border-brand-dark pb-1" : "text-gray-600 hover:text-gray-900 font-medium transition"
                            }
                        >
                            Home
                        </NavLink>
                        <a href="/#services" className="text-gray-600 hover:text-gray-900 font-medium transition">Service</a>
                        <a href="/#technology" className="text-gray-600 hover:text-gray-900 font-medium transition">Technology</a>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center">
                        {user ? (
                            <>
                                <span className="text-gray-700 mr-4 font-medium hidden sm:block">Hi, {user.name}</span>
                                <button
                                    onClick={logout}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-gray-900 font-bold underline decoration-2 decoration-brand underline-offset-4"
                                            : "text-gray-900 font-semibold hover:text-gray-700 transition"
                                    }
                                >
                                    Login
                                </NavLink>
                                <Link
                                    to="/register"
                                    className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-full font-medium transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
