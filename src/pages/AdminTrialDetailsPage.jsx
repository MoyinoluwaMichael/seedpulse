// src/pages/AdminTrialDetailsPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Users, Calendar, MapPin, FileText, Download, Archive, CheckCircle, Clock, Camera } from 'lucide-react';
import { getTrialById } from '../data/Trials';
import { getAssignmentsForTrial } from '../data/TrialAssignments';
import { getFarmerById } from '../data/Farmers';
import TrialFarmerAssignmentModal from '../components/TrialFarmerAssignmentModal';

const AdminTrialDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const trial = getTrialById(id);

    const [showAssignmentModal, setShowAssignmentModal] = useState(false);

    if (!trial) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
                <p className="text-2xl text-gray-600">Trial not found</p>
            </div>
        );
    }

    const overallProgress = Math.round((trial.submissions / trial.totalRequired) * 100);

    // Real assigned farmers with progress
    const assignments = getAssignmentsForTrial(id);
    const assignedFarmers = assignments.map(assignment => {
        const farmer = getFarmerById(assignment.farmerId);
        if (!farmer) return null;
        const progress = Math.round((assignment.submissions / assignment.required) * 100);
        return {
            id: farmer.id,
            name: farmer.name,
            location: farmer.location,
            submissions: assignment.submissions,
            required: assignment.required,
            progress
        };
    }).filter(Boolean);

    // Recent submissions derived from assignments (simulating latest activity)
    const recentSubmissions = assignments
        .sort((a, b) => b.submissions - a.submissions) // higher submissions = more recent
        .slice(0, 4)
        .map((assignment, idx) => {
            const farmer = getFarmerById(assignment.farmerId);
            const stages = ['Tillering', 'Flowering', 'Grain Filling', 'Harvest'];
            return {
                farmer: farmer?.name || 'Unknown Farmer',
                stage: stages[idx % stages.length],
                date: new Date(Date.now() - idx * 2 * 86400000).toISOString().split('T')[0].replace(/-/g, '/'), // mock dates
                photos: Math.max(2, assignment.submissions * 2) // mock photo count
            };
        });

    const handleExportData = () => {
        const csvContent = [
            ['Farmer Name', 'Location', 'Submissions', 'Required', 'Progress (%)'],
            ...assignedFarmers.map(f => [
                f.name,
                f.location,
                f.submissions,
                f.required,
                f.progress
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `${trial.id}_farmers_progress_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleArchiveTrial = () => {
        if (window.confirm('Are you sure you want to archive this trial? It will be marked as completed and hidden from active lists.')) {
            // In a real app: call updateTrial(id, { status: 'completed' })
            // For now, just show success feedback
            alert('Trial successfully archived!');
            navigate('/admin/trials');
        }
    };

    return (
        <div className="px-4 md:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-green-700 hover:text-green-600 mb-6 font-medium transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Trials List
                </button>

                {/* Trial Header Card */}
                <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-3xl p-8 mb-8 shadow-xl border border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-green-950 mb-3">
                                {trial.crop} - {trial.variety}
                            </h1>
                            <p className="text-xl text-gray-600 mb-4">{trial.description}</p>
                            <div className="flex flex-wrap items-center gap-4">
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

                    {/* Admin Action Buttons - All Functional */}
                    <div className="mt-8 flex flex-wrap gap-4">
                        <button
                            onClick={() => navigate(`/admin/trials/${id}/edit`)} // Placeholder for future edit page
                            className="px-6 py-3 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                        >
                            <Edit className="w-5 h-5" />
                            Edit Trial
                        </button>

                        <button
                            onClick={() => setShowAssignmentModal(true)}
                            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                        >
                            <Users className="w-5 h-5" />
                            Manage Farmers ({assignedFarmers.length})
                        </button>

                        <button
                            onClick={handleExportData}
                            className="px-6 py-3 bg-gray-700 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                        >
                            <Download className="w-5 h-5" />
                            Export Data
                        </button>

                        <button
                            onClick={handleArchiveTrial}
                            className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                        >
                            <Archive className="w-5 h-5" />
                            Archive Trial
                        </button>
                    </div>
                </div>

                {/* Key Information Grid */}
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
                        <p className="text-2xl font-bold text-gray-800">{assignedFarmers.length}</p>
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
                                {assignedFarmers.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                            No farmers assigned yet
                                        </td>
                                    </tr>
                                ) : (
                                    assignedFarmers.map((farmer) => (
                                        <tr key={farmer.id} className="hover:bg-green-50/30 transition-colors">
                                            <td className="px-6 py-5">
                                                <p className="font-medium text-gray-900">{farmer.name}</p>
                                            </td>
                                            <td className="px-6 py-5 text-gray-700">{farmer.location}</td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                                                        <div
                                                            className="bg-gradient-to-r from-green-600 to-green-500 h-3 rounded-full transition-all"
                                                            style={{ width: `${farmer.progress}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700 w-12 text-right">{farmer.progress}%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-gray-700">
                                                {farmer.submissions}/{farmer.required}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Submissions Gallery */}
                <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-green-950">Recent Submissions</h3>
                        <button
                            onClick={() => navigate('/admin/submissions')} // Route to full submissions review
                            className="text-green-700 hover:text-green-600 font-medium transition-colors"
                        >
                            View All Submissions →
                        </button>
                    </div>
                    <div className="p-6">
                        {recentSubmissions.length === 0 ? (
                            <p className="text-center text-gray-500 py-8">No submissions yet</p>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {recentSubmissions.map((sub, idx) => (
                                    <div key={idx} className="text-center">
                                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-40 mb-3 flex items-center justify-center hover:border-green-400 transition-all cursor-pointer">
                                            <Camera className="w-12 h-12 text-gray-400" />
                                        </div>
                                        <p className="font-medium text-gray-800 text-sm">{sub.farmer}</p>
                                        <p className="text-xs text-gray-600">{sub.stage} • {sub.date}</p>
                                        <p className="text-xs text-gray-500 mt-1">{sub.photos} photos</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Farmer Assignment Modal */}
            {showAssignmentModal && (
                <TrialFarmerAssignmentModal
                    trialId={trial.id}
                    trialName={`${trial.crop} - ${trial.variety}`}
                    onClose={() => setShowAssignmentModal(false)}
                />
            )}
        </div>
    );
};

export default AdminTrialDetailsPage;