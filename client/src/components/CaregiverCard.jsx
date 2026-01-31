import React from 'react';

const CaregiverCard = ({ caregiver, onBook }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">{caregiver.userId.name}</h3>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full uppercase tracking-wide">
                    {caregiver.specialization}
                </span>
            </div>
            <p className="text-gray-600 mt-2 text-sm">{caregiver.details}</p>
            <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">{caregiver.experience} Years Exp.</span>
                <button
                    onClick={() => onBook(caregiver)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                >
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default CaregiverCard;
