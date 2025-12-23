// src/pages/AdminTrialDetailsPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Users, Calendar, MapPin, FileText, Download, Archive, CheckCircle, Clock, Camera} from 'lucide-react';
import { getTrials, getTrialById } from '../data/trials';

const AdminTrialDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const trial = getTrials(id);

    if (!trial) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
                <p className="text-2xl text-gray-600">Trial not found</p>
            </div>
        );
    }

    const overallProgress = Math.round((trial.submissions / trial.totalRequired) * 100);

    // Mock farmer-level data for admin view
    const assignedFarmers = [
        { name: 'Musa Abdullahi', location: 'Kura LGA, Kano', submissions: 3, required: 8, progress: 38 },
        { name: 'Aminu Bello', location: 'Bichi LGA, Kano', submissions: 5, required: 8, progress: 63 },
        { name: 'Fatima Yusuf', location: 'Dambatta LGA, Kano', submissions: 2, required: 8, progress: 25 },
    ];

    const recentSubmissions = [
        { farmer: 'Musa Abdullahi', stage: 'Grain Filling', date: '2025-12-20', photos: 4 },
        { farmer: 'Aminu Bello', stage: 'Flowering', date: '2025-12-18', photos: 6 },
        { farmer: 'Fatima Yusuf', stage: 'Tillering', date: '2025-12-15', photos: 3 },
    ];

    return (
        <div className="px-4 md:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-green-700 hover:text-green-600 mb-6 font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Trials List
                </button>

                {/* Trial Header */}
                <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-3xl p-8 mb-8 shadow-xl border border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-green-950 mb-3">
                                {trial.crop} - {trial.variety}
                            </h1>
                            <p className="text-xl text-gray-600 mb-4">{trial.description}</p>
                            <div className="flex items-center gap-4">
                                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                                    trial.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                }`}>
                                    {trial.status === 'completed' ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                                    {trial.status === 'completed' ? 'Completed' : 'Ongoing'}
                                </span>
                                <span className="text-sm text-gray-600">
                                    Trial ID: <span className="font-mono font-semibold">{trial.id}</span>
                                </span>
                            </div>
                        </div>

                        <div className="text-center md:text-right">
                            <p className="text-5xl font-bold text-green-700">{overallProgress}%</p>
                            <p className="text-gray-600 mt-1">Overall Progress</p>
                        </div>
                    </div>

                    {/* Admin Action Buttons */}
                    <div className="mt-8 flex flex-wrap gap-4">
                        <button className="px-6 py-3 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                            <Edit className="w-5 h-5" />
                            Edit Trial
                        </button>
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                            <Users className="w-5 h-5" />
                            Manage Farmers
                        </button>
                        <button className="px-6 py-3 bg-gray-700 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                            <Download className="w-5 h-5" />
                            Export Data
                        </button>
                        <button className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                            <Archive className="w-5 h-5" />
                            Archive Trial
                        </button>
                    </div>
                </div>

                {/* Key Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <Calendar className="w-10 h-10 text-green-600 mx-auto mb-3" />
                        <p className="text-2xl font-bold text-gray-800">{trial.startDate}</p>
                        <p className="text-sm text-gray-600">Start Date</p>
                    </div>
                    <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <Calendar className="w-10 h-10 text-orange-600 mx-auto mb-3" />
                        <p className="text-2xl font-bold text-gray-800">{trial.due}</p>
                        <p className="text-sm text-gray-600">Due Date</p>
                    </div>
                    <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <Users className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                        <p className="text-2xl font-bold text-gray-800">{trial.farmers || 35}</p>
                        <p className="text-sm text-gray-600">Assigned Farmers</p>
                    </div>
                    <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <FileText className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                        <p className="text-2xl font-bold text-gray-800">{trial.submissions}/{trial.totalRequired}</p>
                        <p className="text-sm text-gray-600">Total Submissions</p>
                    </div>
                </div>

                {/* Location Info */}
                <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200 mb-10">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <MapPin className="w-6 h-6 text-green-600" />
                        Trial Locations
                    </h3>
                    <p className="text-gray-700 font-medium">{trial.location} (Primary)</p>
                    <p className="text-sm text-gray-600 mt-2">
                        Also active in: {trial.states?.join(', ') || 'Multiple LGAs'}
                    </p>
                </div>

                {/* Assigned Farmers Table */}
                <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 overflow-hidden mb-10">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-2xl font-bold text-green-950">Assigned Farmers</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Farmer</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Progress</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Submissions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {assignedFarmers.map((farmer, idx) => (
                                    <tr key={idx} className="hover:bg-green-50/30 transition-colors">
                                        <td className="px-6 py-5">
                                            <p className="font-medium text-gray-900">{farmer.name}</p>
                                        </td>
                                        <td className="px-6 py-5 text-gray-700">{farmer.location}</td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 bg-gray-200 rounded-full h-3">
                                                    <div
                                                        className="bg-gradient-to-r from-green-600 to-green-500 h-3 rounded-full"
                                                        style={{ width: `${farmer.progress}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">{farmer.progress}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-gray-700">{farmer.submissions}/{farmer.required}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Submissions Gallery */}
                <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-2xl font-bold text-green-950">Recent Submissions</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {recentSubmissions.map((sub, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-40 mb-3 flex items-center justify-center">
                                        <Camera className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <p className="font-medium text-gray-800 text-sm">{sub.farmer}</p>
                                    <p className="text-xs text-gray-600">{sub.stage} • {sub.date}</p>
                                    <p className="text-xs text-gray-500 mt-1">{sub.photos} photos</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 text-center">
                            <button className="text-green-700 font-semibold hover:text-green-600">
                                View All Submissions →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminTrialDetailsPage;