import React, { useEffect, useState } from 'react';
import api from '../services/api';

const CaregiverDashboard = () => {
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/caregivers/me');
                setProfile(res.data);
                setFormData(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put('/caregivers/profile', formData);
            setProfile(res.data);
            setIsEditing(false);
        } catch (err) {
            console.error(err);
        }
    };

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">My Caregiver Profile</h1>
            <div className="bg-white shadow rounded-lg p-6">
                {!isEditing ? (
                    <div>
                        <p><strong>Status:</strong> <span className={profile.isVerified ? "text-green-600" : "text-yellow-600"}>{profile.isVerified ? "Verified" : "Pending Verification"}</span></p>
                        <p className="mt-2"><strong>Specialization:</strong> {profile.specialization}</p>
                        <p className="mt-2"><strong>Experience:</strong> {profile.experience} Years</p>
                        <p className="mt-2"><strong>Bio:</strong> {profile.details}</p>
                        <button onClick={() => setIsEditing(true)} className="mt-4 bg-gray-600 text-white px-4 py-2 rounded">Edit Profile</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Specialization</label>
                            <input name="specialization" value={formData.specialization} onChange={handleChange} className="border p-2 w-full rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Experience</label>
                            <input name="experience" type="number" value={formData.experience} onChange={handleChange} className="border p-2 w-full rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Bio</label>
                            <textarea name="details" value={formData.details} onChange={handleChange} className="border p-2 w-full rounded" />
                        </div>
                        <div className="flex space-x-2">
                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                            <button onClick={() => setIsEditing(false)} type="button" className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CaregiverDashboard;
