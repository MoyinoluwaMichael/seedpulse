// src/pages/TrialDetailsPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, FileText, MapPin, Camera, Sparkles } from 'lucide-react';
import { trialsData } from '../data/trials';

const TrialDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const trial = trialsData.find(t => t.id === id);

    if (!trial) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-2xl text-gray-600">Trial not found</p>
            </div>
        );
    }

    const progress = (trial.submissions / trial.totalRequired) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            <div className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-xl border-b border-gray-200 px-4 py-4">
                <div className="max-w-6xl mx-auto flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-green-700 hover:text-green-600">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-semibold">Back</span>
                    </button>
                    <h1 className="text-xl font-bold text-green-950">Trial Details</h1>
                </div>
            </div>

            <div className="pt-20 px-4 pb-10">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-3xl p-8 mb-8 shadow-xl border border-gray-200">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">{trial.crop} - {trial.variety}</h2>
                                <p className="text-xl text-gray-600">{trial.description}</p>
                                <div className="flex items-center gap-2 mt-4 text-green-700 font-semibold">
                                    <div className="w-4 h-4 bg-green-600 rounded-full animate-pulse" />
                                    {trial.status === 'ongoing' ? 'Active' : 'Completed'}
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-5xl font-bold text-green-700">{Math.round(progress)}%</p>
                                <p className="text-gray-600">Progress</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                        {[
                            { icon: Calendar, label: 'Start Date', value: trial.startDate },
                            { icon: Calendar, label: 'End Date', value: trial.endDate },
                            { icon: Users, label: 'Farmers', value: trial.farmers },
                            { icon: FileText, label: 'Submissions', value: `${trial.submissions}/${trial.totalRequired}` },
                        ].map((stat, idx) => {
                            const Icon = stat.icon;
                            return (
                                <div key={idx} className="bg-white bg-opacity-90 backdrop-blur-xl rounded-2xl p-6 text-center shadow-lg border border-gray-200">
                                    <Icon className="w-10 h-10 text-green-600 mx-auto mb-3" />
                                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                                    <p className="text-sm text-gray-600">{stat.label}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <MapPin className="w-6 h-6 text-green-600" />
                            Primary Location
                        </h3>
                        <p className="text-gray-700">{trial.location}</p>
                        <p className="text-sm text-gray-600 mt-2">Also active in: {trial.states.join(', ')}</p>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                        {trial.status === 'ongoing' ? (
                            <button
                                onClick={() => navigate('/submit')}
                                className="px-8 py-4 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-xl font-bold shadow-lg flex items-center gap-3 hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                <Camera className="w-6 h-6" />
                                Continue Submission
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate(`/trials/${trial.id}/report`)}
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-bold shadow-lg flex items-center gap-3 hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                <FileText className="w-6 h-6" />
                                View Full Report
                            </button>
                        )}

                        {/* Optional: Always show AI help button */}
                        <button
                            onClick={() => navigate('/chat')}
                            className="px-8 py-4 bg-white text-green-700 border-2 border-green-600 rounded-xl font-bold shadow-lg flex items-center gap-3 hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                        >
                            <Sparkles className="w-6 h-6" />
                            Ask AI About This Trial
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrialDetailsPage;