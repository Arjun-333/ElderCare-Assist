import { useState } from 'react'

function App() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-blue-600 mb-4">ElderCare-Assist</h1>
                <p className="text-lg text-gray-700">Connecting families with verified caregivers.</p>
                <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Get Started
                </button>
            </div>
        </div>
    )
}

export default App
