// src/pages/TrialsListPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, Users, MapPin, Calendar, CheckCircle, Clock } from 'lucide-react';
import { trialsData } from '../data/trials';

const TrialsListPage = () => {
    const navigate = useNavigate();

    const getStatusColor = (status) => {
        return status === 'completed' ? 'text-green-600 bg-green-100' : 'text-orange-600 bg-orange-100';
    };

    return (
        <div className="px-4 md:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-green-950 mb-2">All Field Trials</h1>
                        <p className="text-gray-600">Manage and monitor all active and completed trials</p>
                    </div>
                    <button
                        onClick={() => navigate('/trials/new')}
                        className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-xl font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        Create New Trial
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {trialsData.map((trial) => (
                        <div
                            key={trial.id}
                            onClick={() => navigate(`/trials/${trial.id}`)}
                            className="bg-white bg-opacity-90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-100 transition-all hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{trial.crop} - {trial.variety}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{trial.description}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(trial.status)}`}>
                                    {trial.status === 'completed' ? <CheckCircle className="w-4 h-4 inline mr-1" /> : <Clock className="w-4 h-4 inline mr-1" />}
                                    {trial.status === 'completed' ? 'Completed' : 'Ongoing'}
                                </span>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span>{trial.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    <span>Due: {trial.due}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Users className="w-4 h-4" />
                                    <span>{trial.farmers || 35} farmers</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <FileText className="w-4 h-4" />
                                    <span>{trial.submissions}/{trial.totalRequired} submissions</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">Trial ID: {trial.id}</span>
                                    <span className="text-sm font-semibold text-green-700">View Details →</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {trialsData.length === 0 && (
                    <div className="text-center py-20">
                        <FileText className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No trials yet</h3>
                        <p className="text-gray-500 mb-6">Start by creating your first field trial</p>
                        <button
                            onClick={() => navigate('/trials/new')}
                            className="px-6 py-3 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                            Create First Trial
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrialsListPage;