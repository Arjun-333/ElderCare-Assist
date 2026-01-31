import React, { useEffect, useState } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
    const [pending, setPending] = useState([]);

    useEffect(() => {
        const fetchPending = async () => {
            try {
                const res = await api.get('/admin/pending');
                setPending(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPending();
    }, []);

    const verify = async (id) => {
        try {
            await api.put(`/admin/verify/${id}`);
            setPending(pending.filter(p => p._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <h2 className="text-xl font-semibold mb-4">Pending Verifications</h2>
            <div className="bg-white shadow overflow-hidden rounded-md">
                <ul className="divide-y divide-gray-200">
                    {pending.map(p => (
                        <li key={p._id} className="px-6 py-4 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-600">{p.userId.name}</p>
                                <p className="text-sm text-gray-500">{p.specialization} - {p.experience} years</p>
                                <p className="text-sm text-gray-500">{p.userId.email}</p>
                            </div>
                            <button onClick={() => verify(p._id)} className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                                Verify
                            </button>
                        </li>
                    ))}
                    {pending.length === 0 && (
                        <li className="px-6 py-4 text-center text-gray-500">No pending verifications.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;
