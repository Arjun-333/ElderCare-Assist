import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'patient',
        specialization: '',
        experience: '',
        details: '',
    });
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await register(formData);
            navigate('/');
        } catch (err) {
            setError('Registration failed. Try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-light py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        Join Health Universe
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Create an account to get started
                    </p>
                </div>
                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                    {error && <p className="text-red-500 text-center bg-red-50 p-2 rounded">{error}</p>}

                    <div className="space-y-4">
                        <input
                            name="name"
                            type="text"
                            required
                            className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-dark focus:border-transparent sm:text-sm"
                            placeholder="Full Name"
                            onChange={handleChange}
                        />

                        <input
                            name="email"
                            type="email"
                            required
                            className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-dark focus:border-transparent sm:text-sm"
                            placeholder="Email Address"
                            onChange={handleChange}
                        />

                        <input
                            name="password"
                            type="password"
                            required
                            className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-dark focus:border-transparent sm:text-sm"
                            placeholder="Password"
                            onChange={handleChange}
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">I am a:</label>
                            <select
                                name="role"
                                className="block w-full py-3 px-3 border border-gray-300 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-dark focus:border-transparent sm:text-sm"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="patient">Patient / Family Member</option>
                                <option value="caregiver">Caregiver (Nurse/Attendant)</option>
                            </select>
                        </div>
                    </div>

                    {formData.role === 'caregiver' && (
                        <div className="space-y-4 border-t pt-4">
                            <p className="text-sm font-semibold text-gray-900">Professional Details</p>
                            <input
                                name="specialization"
                                type="text"
                                required
                                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-dark focus:border-transparent sm:text-sm"
                                placeholder="Specialization (e.g. Nurse)"
                                onChange={handleChange}
                            />
                            <input
                                name="experience"
                                type="number"
                                required
                                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-dark focus:border-transparent sm:text-sm"
                                placeholder="Years of Experience"
                                onChange={handleChange}
                            />
                            <textarea
                                name="details"
                                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-dark focus:border-transparent sm:text-sm"
                                placeholder="Bio / Details about yourself"
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-gray-900 bg-brand hover:bg-brand-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark transition transform hover:scale-[1.02]
                ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating Account...
                            </span>
                        ) : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
