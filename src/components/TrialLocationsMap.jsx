// src/components/TrialLocationsMap.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { getTrials } from '../data/Trials';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons for React/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const TrialLocationsMap = () => {
    const navigate = useNavigate();
    const trials = getTrials();

    // Real coordinates for Nigerian locations (expand as needed)
    const locationCoords = {
        'Kura LGA, Kano': [11.7778, 8.4333],
        'Zaria LGA, Kaduna': [11.0855, 7.7199],
        'Bichi LGA, Kano': [12.2333, 8.2333],
        // Add more real locations here
    };

    // Fallback to center of Nigeria if location not mapped
    const defaultCenter = [9.0820, 8.6753];

    return (
        <div className="h-96 md:h-full rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <MapContainer
                center={defaultCenter}
                zoom={6}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {trials.map((trial) => {
                    const coords = locationCoords[trial.location] || defaultCenter;
                    const progress = Math.round((trial.submissions / trial.totalRequired) * 100);

                    return (
                        <Marker key={trial.id} position={coords}>
                            <Popup>
                                <div className="p-3 min-w-64">
                                    <h3 className="font-bold text-lg text-green-950">
                                        {trial.crop} - {trial.variety}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">{trial.location}</p>
                                    <div className="mt-3 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Progress</span>
                                            <span className="font-semibold text-green-700">{progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-green-600 to-green-500 h-2 rounded-full transition-all"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Submissions</span>
                                            <span className="font-medium">{trial.submissions}/{trial.totalRequired}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/admin/trials/${trial.id}`)}
                                        className="mt-4 w-full py-2 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                                    >
                                        View Trial Details →
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default TrialLocationsMap;