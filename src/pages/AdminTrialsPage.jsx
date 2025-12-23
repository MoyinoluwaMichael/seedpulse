// src/pages/AdminTrialsPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, Users, Calendar, CheckCircle, Clock, MapPin } from 'lucide-react';
import { getTrials } from '../data/trials';

const AdminTrialsPage = () => {
    const navigate = useNavigate();

    const getStatusBadge = (status) => {
        return status === 'completed'
            ? { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle }
            : { bg: 'bg-orange-100', text: 'text-orange-700', icon: Clock };
    };

    const getProgress = (submissions, required) => Math.round((submissions / required) * 100);

    return (
        <div className="px-4 md:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-green-950 mb-2">
                            Manage Field Trials
                        </h1>
                        <p className="text-gray-600">
                            Overview of all active and completed trials across Nigeria
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/admin/trials/new')}
                        className="mt-4 md:mt-0 px-6 py-4 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-xl font-bold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                    >
                        <Plus className="w-6 h-6" />
                        Create New Trial
                    </button>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                            <FileText className="w-10 h-10 text-green-600" />
                            <span className="text-3xl font-bold text-green-950">{getTrials().length}</span>
                        </div>
                        <p className="text-gray-600 font-medium">Total Trials</p>
                    </div>
                    <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                            <Clock className="w-10 h-10 text-orange-600" />
                            <span className="text-3xl font-bold text-orange-700">
                                {getTrials().filter(t => t.status === 'ongoing').length}
                            </span>
                        </div>
                        <p className="text-gray-600 font-medium">Ongoing</p>
                    </div>
                    <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                            <span className="text-3xl font-bold text-green-700">
                                {getTrials().filter(t => t.status === 'completed').length}
                            </span>
                        </div>
                        <p className="text-gray-600 font-medium">Completed</p>
                    </div>
                    <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                            <Users className="w-10 h-10 text-blue-600" />
                            <span className="text-3xl font-bold text-blue-900">
                                {getTrials().reduce((sum, t) => sum + (t.farmers || 35), 0)}
                            </span>
                        </div>
                        <p className="text-gray-600 font-medium">Total Farmers</p>
                    </div>
                </div>

                {/* Trials Table */}
                <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-green-950">All Trials</h2>
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Trial ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Crop & Variety</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Due Date</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Progress</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {getTrials().map((trial) => {
                                    const Badge = getStatusBadge(trial.status);
                                    return (
                                        <tr key={trial.id} className="hover:bg-green-50/30 transition-colors">
                                            <td className="px-6 py-5 text-sm font-medium text-gray-900">{trial.id}</td>
                                            <td className="px-6 py-5">
                                                <div>
                                                    <p className="font-semibold text-gray-900">{trial.crop} - {trial.variety}</p>
                                                    <p className="text-sm text-gray-500">{trial.farmers || 35} farmers</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-sm text-gray-700">{trial.location}</td>
                                            <td className="px-6 py-5 text-sm text-gray-700">{trial.due}</td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                                        <div
                                                            className="bg-gradient-to-r from-green-600 to-green-500 h-3 rounded-full"
                                                            style={{ width: `${getProgress(trial.submissions, trial.totalRequired)}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {getProgress(trial.submissions, trial.totalRequired)}%
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${Badge.bg} ${Badge.text}`}>
                                                    <Badge.icon className="w-4 h-4" />
                                                    {trial.status === 'completed' ? 'Completed' : 'Ongoing'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <button
                                                    onClick={() => navigate(`/admin/trials/${trial.id}`)}
                                                    className="text-green-700 hover:text-green-600 font-medium text-sm"
                                                >
                                                    View Details →
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden divide-y divide-gray-200">
                        {getTrials().map((trial) => {
                            const Badge = getStatusBadge(trial.status);
                            return (
                                <div key={trial.id} className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <p className="font-bold text-lg text-gray-900">{trial.crop} - {trial.variety}</p>
                                            <p className="text-sm text-gray-600">{trial.id}</p>
                                        </div>
                                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${Badge.bg} ${Badge.text}`}>
                                            <Badge.icon className="w-4 h-4" />
                                            {trial.status === 'completed' ? 'Completed' : 'Ongoing'}
                                        </span>
                                    </div>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <MapPin className="w-4 h-4" />
                                            {trial.location}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar className="w-4 h-4" />
                                            Due: {trial.due}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                                                <div
                                                    className="bg-gradient-to-r from-green-600 to-green-500 h-3 rounded-full"
                                                    style={{ width: `${getProgress(trial.submissions, trial.totalRequired)}%` }}
                                                />
                                            </div>
                                            <span className="font-medium">{getProgress(trial.submissions, trial.totalRequired)}%</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/trials/${trial.id}`)}
                                        className="mt-4 text-green-700 font-medium"
                                    >
                                        View Details →
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminTrialsPage;