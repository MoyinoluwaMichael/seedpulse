// src/pages/FarmerDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, FileText, Camera, MapPin, Clock, CheckCircle, Plus, User, Sparkles } from 'lucide-react';
import { getTrials } from '../data/trials'; // ← IMPORT DATA

const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-xl border-b border-gray-200 px-4 md:px-6 h-16 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-700 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-green-950 hidden sm:block">IFT-DMS Farmer</span>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-700 to-green-600 flex items-center justify-center text-white font-semibold shadow-lg">
                    MA
                </div>
                <span className="hidden sm:block font-medium text-gray-700">Musa Abdullahi</span>
            </div>
        </div>
    </nav>
);

const MobileBottomNav = ({ navigate }) => {
    const items = [
        { icon: FileText, label: 'Trials', active: true, route: null },
        { icon: Camera, label: 'Submit', active: false, route: '/submit' },
        { icon: User, label: 'Profile', active: false, route: '/profile' },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-xl border-t border-gray-200 px-4 py-2 z-50 shadow-2xl">
            <div className="flex justify-around items-center max-w-md mx-auto">
                {items.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={idx}
                            onClick={() => item.route && navigate(item.route)}
                            className="flex flex-col items-center gap-1 transition-all active:scale-95 min-w-[60px] py-1"
                        >
                            <div className={`p-2.5 rounded-xl transition-all ${item.active ? 'bg-gradient-to-r from-green-700 to-green-600 shadow-lg' : 'hover:bg-gray-100'}`}>
                                <Icon className={`w-5 h-5 ${item.active ? 'text-white' : 'text-gray-400'}`} />
                            </div>
                            <span className={`text-xs font-medium ${item.active ? 'text-green-700' : 'text-gray-400'}`}>{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

const FloatingChatButton = ({ navigate }) => (
    <button
        onClick={() => navigate('/chat')}
        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 bg-gradient-to-r from-green-700 to-green-600 text-white px-4 md:px-6 py-3 md:py-4 rounded-full shadow-2xl flex items-center gap-2 font-semibold transition-all hover:shadow-xl hover:scale-105 active:scale-95"
    >
        <span className="hidden sm:inline">Ask AI for help...</span>
        <span className="sm:hidden text-sm">AI Help</span>
        <div className="w-7 h-7 md:w-8 md:h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
        </div>
    </button>
);

const FarmerDashboard = () => {
    const navigate = useNavigate();

    const getProgress = (done, total) => (done / total) * 100;

    const activeTrials = getTrials().filter(t => t.status === 'ongoing').length;

    const handleTrialClick = (trialId) => {
        navigate(`/trials/${trialId}`); // ← NOW ROUTES TO SPECIFIC TRIAL DETAILS
    };

    return (
        <div className="pt-6 pb-20 px-4 md:px-6 lg:px-8">
                <div className="w-full py-6 md:py-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-green-950 mb-2">
                        Welcome back, Musa 👋
                    </h1>
                    <p className="text-gray-600 text-lg">
                        You have {activeTrials} active trial{activeTrials !== 1 ? 's' : ''}
                    </p>
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
                    <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-100 transition-all hover:-translate-y-1 hover:shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <FileText className="w-10 h-10 text-green-600" />
                            <span className="text-3xl md:text-4xl font-bold text-green-950">{getTrials().length}</span>
                        </div>
                        <p className="text-gray-600 font-medium">Assigned Trials</p>
                    </div>
                    <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-100 transition-all hover:-translate-y-1 hover:shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <Camera className="w-10 h-10 text-blue-600" />
                            <span className="text-3xl md:text-4xl font-bold text-blue-950">12</span>
                        </div>
                        <p className="text-gray-600 font-medium">Submissions Made</p>
                    </div>
                    <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-100 transition-all hover:-translate-y-1 hover:shadow-2xl sm:col-span-2 md:col-span-1">
                        <div className="flex items-center justify-between mb-4">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                            <span className="text-3xl md:text-4xl font-bold text-green-950">{getTrials().filter(t => t.status === 'completed').length}</span>
                        </div>
                        <p className="text-gray-600 font-medium">Completed Trials</p>
                    </div>
                </div>

                <div className="w-full">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-green-950">Your Assigned Trials</h2>
                        <button
                            onClick={() => navigate('./submit')}
                            className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
                        >
                            <Plus className="w-5 h-5" />
                            New Submission
                        </button>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                        {getTrials().map((trial) => (
                            <div
                                key={trial.id}
                                onClick={() => handleTrialClick(trial.id)}
                                className="bg-white bg-opacity-90 backdrop-blur-xl rounded-2xl p-5 md:p-6 shadow-xl border border-gray-100 transition-all hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
                                            <h3 className="text-lg md:text-xl font-bold text-gray-800">
                                                {trial.crop} - {trial.variety}
                                            </h3>
                                            {trial.status === 'completed' && (
                                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap">
                                                    Completed
                                                </span>
                                            )}
                                            {trial.status === 'ongoing' && (
                                                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap">
                                                    Ongoing
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-col md:flex-row md:flex-wrap gap-2 md:gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                                <span>{trial.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-4 h-4 flex-shrink-0" />
                                                <span>Due: {trial.due}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-stretch md:items-end gap-3 md:min-w-[280px]">
                                        <div className="text-sm text-gray-600 font-medium text-left md:text-right">
                                            {trial.submissions} / {trial.totalRequired} submissions
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                                            <div
                                                className="bg-gradient-to-r from-green-600 to-green-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
                                                style={{ width: `${getProgress(trial.submissions, trial.totalRequired)}%` }}
                                            />
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (trial.status === 'completed') {
                                                    navigate(`/trials/${trial.id}`); // View report (unchanged)
                                                } else {
                                                    navigate(`./submit?trial=${trial.id}`); // ← Pass trial ID
                                                }
                                            }}
                                            className="w-full md:w-auto px-6 py-2.5 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-lg font-medium text-sm shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                                        >
                                            {trial.status === 'completed' ? 'View Report' : 'Continue Submission'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
        </div>
    );
};

export default FarmerDashboard;