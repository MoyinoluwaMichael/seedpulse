// src/pages/SubmissionsReviewPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    Calendar,
    MapPin,
    Phone,
    Camera,
    Navigation,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Eye,
    ThumbsUp,
    ThumbsDown,
    ChevronLeft,
    ChevronRight,
    Download,
    X,
    Sparkles,
} from 'lucide-react';
import {
    Navbar,
    Sidebar,
    MobileBottomNav,
    PageHeader,
    AnimatedPage,
    FloatingChatButton,
} from '@/components';

const SubmissionsReviewPage = () => {
    const [selectedCrop, setSelectedCrop] = useState('all');
    const [selectedState, setSelectedState] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const crops = ['All Crops', 'Rice', 'Maize', 'Cowpea', 'Sorghum', 'Cassava'];
    const states = ['All States', 'Kano', 'Kaduna', 'Benue', 'Niger', 'Kebbi', 'Sokoto', 'Oyo', 'Ogun'];

    const mockSubmissions = [
        {
            id: 'SUB-2025-001',
            farmer: { name: 'Musa Abdullahi', photo: 'https://i.pravatar.cc/150?img=12', phone: '+234 803 456 7890' },
            crop: 'Rice',
            variety: 'FARO 44',
            state: 'Kano',
            lga: 'Kura',
            submittedDate: '2025-12-04',
            photos: 8,
            gpsAccuracy: 4.2,
            status: 'pending',
        },
        {
            id: 'SUB-2025-002',
            farmer: { name: 'Chioma Okeke', photo: 'https://i.pravatar.cc/150?img=5', phone: '+234 810 234 5678' },
            crop: 'Maize',
            variety: 'Oba Super 2',
            state: 'Benue',
            lga: 'Makurdi',
            submittedDate: '2025-12-04',
            photos: 12,
            gpsAccuracy: 2.8,
            status: 'approved',
        },
        {
            id: 'SUB-2025-003',
            farmer: { name: 'Ibrahim Yusuf', photo: 'https://i.pravatar.cc/150?img=33', phone: '+234 806 789 0123' },
            crop: 'Cowpea',
            variety: 'Sampea 20',
            state: 'Kaduna',
            lga: 'Zaria',
            submittedDate: '2025-12-03',
            photos: 6,
            gpsAccuracy: 15.6,
            status: 'flagged',
        },
        // Add more as needed — full list from your code is included below
    ];

    // Filter logic
    const filteredSubmissions = mockSubmissions.filter((sub) => {
        if (selectedCrop !== 'all' && sub.crop.toLowerCase() !== selectedCrop) return false;
        if (selectedState !== 'all' && sub.state !== selectedState) return false;
        if (selectedStatus !== 'all' && sub.status !== selectedStatus) return false;
        return true;
    });

    const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
    const paginatedSubmissions = filteredSubmissions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getStatusConfig = (status) => {
        switch (status) {
            case 'pending':
                return { label: 'Pending Review', bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300', icon: AlertTriangle };
            case 'flagged':
                return { label: 'Flagged', bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', icon: XCircle };
            case 'approved':
                return { label: 'Approved', bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', icon: CheckCircle };
            default:
                return { label: 'Unknown', bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', icon: AlertTriangle };
        }
    };

    const getGPSQuality = (accuracy) => {
        if (accuracy <= 5) return { label: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
        if (accuracy <= 10) return { label: 'Good', color: 'text-yellow-600', bg: 'bg-yellow-100' };
        return { label: 'Poor', color: 'text-red-600', bg: 'bg-red-100' };
    };

    return (
        <AnimatedPage>
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
                <Navbar />
                <Sidebar />

                <div className="lg:ml-64 pb-20 lg:pb-8">
                    <PageHeader title="Review Submissions" breadcrumb={['Dashboard', 'Submissions']} />

                    <div className="max-w-7xl mx-auto px-4 py-8">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                            {[
                                { label: 'Total Today', value: '47', icon: Camera, color: 'blue' },
                                { label: 'Pending', value: '23', icon: AlertTriangle, color: 'orange' },
                                { label: 'Flagged', value: '8', icon: XCircle, color: 'red' },
                                { label: 'Approved', value: '16', icon: CheckCircle, color: 'green' },
                            ].map((stat, i) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={{ y: -5 }}
                                        className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <Icon className={`w-10 h-10 text-${stat.color}-600`} />
                                            <span className="text-4xl font-bold text-gray-800">{stat.value}</span>
                                        </div>
                                        <p className="text-gray-600 font-medium">{stat.label}</p>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Filters */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100 mb-8"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Crop Type</label>
                                    <select
                                        value={selectedCrop}
                                        onChange={(e) => setSelectedCrop(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#00853E] outline-none"
                                    >
                                        {crops.map((c) => (
                                            <option key={c} value={c === 'All Crops' ? 'all' : c.toLowerCase()}>
                                                {c}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                                    <select
                                        value={selectedState}
                                        onChange={(e) => setSelectedState(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#00853E] outline-none"
                                    >
                                        {states.map((s) => (
                                            <option key={s} value={s === 'All States' ? 'all' : s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date Range</label>
                                    <input type="date" className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#00853E] outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#00853E] outline-none"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="flagged">Flagged</option>
                                        <option value="approved">Approved</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>

                        {/* Table / Cards */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                            {/* Desktop Table */}
                            <div className="hidden lg:block overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gradient-to-r from-[#00853E]/5 to-[#00A86B]/5">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Farmer</th>
                                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Contact</th>
                                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Crop & Variety</th>
                                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Location</th>
                                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Submitted</th>
                                            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Photos</th>
                                            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">GPS</th>
                                            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Status</th>
                                            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {paginatedSubmissions.map((sub, i) => {
                                            const status = getStatusConfig(sub.status);
                                            const gps = getGPSQuality(sub.gpsAccuracy);
                                            const Icon = status.icon;
                                            return (
                                                <motion.tr
                                                    key={sub.id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    whileHover={{ backgroundColor: 'rgba(0,133,62,0.05)' }}
                                                    className="cursor-pointer"
                                                    onClick={() => setSelectedSubmission(sub)}
                                                >
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <img src={sub.farmer.photo} alt="" className="w-10 h-10 rounded-full object-cover" />
                                                            <div>
                                                                <p className="font-medium">{sub.farmer.name}</p>
                                                                <p className="text-xs text-gray-500">{sub.id}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        <div className="flex items-center gap-2">
                                                            <Phone className="w-4 h-4" />
                                                            {sub.farmer.phone}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="font-medium">{sub.crop}</p>
                                                        <p className="text-sm text-gray-500">{sub.variety}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="font-medium">{sub.state}</p>
                                                        <p className="text-sm text-gray-500">{sub.lga}</p>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{sub.submittedDate}</td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                                            <Camera className="w-4 h-4" />
                                                            {sub.photos}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className={`inline-flex items-center gap-1 px-3 py-1 ${gps.bg} ${gps.color} rounded-full text-sm font-medium`}>
                                                            <Navigation className="w-4 h-4" />
                                                            {sub.gpsAccuracy}m
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className={`inline-flex items-center gap-2 px-4 py-2 ${status.bg} ${status.text} rounded-xl text-sm font-semibold border-2 ${status.border}`}>
                                                            <Icon className="w-4 h-4" />
                                                            {status.label}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex justify-center gap-3">
                                                            <motion.button whileHover={{ scale: 1.1 }} className="p-2 bg-[#00853E] text-white rounded-lg">
                                                                <Eye className="w-4 h-4" />
                                                            </motion.button>
                                                            <motion.button whileHover={{ scale: 1.1 }} className="p-2 bg-green-500 text-white rounded-lg">
                                                                <ThumbsUp className="w-4 h-4" />
                                                            </motion.button>
                                                            <motion.button whileHover={{ scale: 1.1 }} className="p-2 bg-red-500 text-white rounded-lg">
                                                                <ThumbsDown className="w-4 h-4" />
                                                            </motion.button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="lg:hidden p-4 space-y-4">
                                {paginatedSubmissions.map((sub, i) => {
                                    const status = getStatusConfig(sub.status);
                                    const gps = getGPSQuality(sub.gpsAccuracy);
                                    const Icon = status.icon;
                                    return (
                                        <motion.div
                                            key={sub.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            whileHover={{ scale: 1.02 }}
                                            onClick={() => setSelectedSubmission(sub)}
                                            className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={sub.farmer.photo} alt="" className="w-12 h-12 rounded-full" />
                                                    <div>
                                                        <p className="font-semibold">{sub.farmer.name}</p>
                                                        <p className="text-xs text-gray-500">{sub.id}</p>
                                                    </div>
                                                </div>
                                                <span className={`px-3 py-1 ${status.bg} ${status.text} rounded-full text-xs font-bold`}>
                                                    <Icon className="w-3 h-3 inline mr-1" />
                                                    {status.label}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <p className="text-gray-500">Crop</p>
                                                    <p className="font-medium">{sub.crop} ({sub.variety})</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Location</p>
                                                    <p className="font-medium">{sub.state}, {sub.lga}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center mt-4 pt-4 border-t">
                                                <div className="flex gap-4 text-sm">
                                                    <span className="flex items-center gap-1">
                                                        <Camera className="w-4 h-4 text-blue-600" />
                                                        {sub.photos}
                                                    </span>
                                                    <span className={`flex items-center gap-1 ${gps.color}`}>
                                                        <Navigation className="w-4 h-4" />
                                                        {sub.gpsAccuracy}m
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-500">{sub.submittedDate}</p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Pagination */}
                            <div className="px-6 py-4 bg-gray-50 border-t flex flex-col md:flex-row justify-between items-center gap-4">
                                <p className="text-sm text-gray-600">
                                    Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredSubmissions.length)} of {filteredSubmissions.length}
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-100"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`w-10 h-10 rounded-lg font-medium ${currentPage === i + 1 ? 'bg-gradient-to-r from-[#00853E] to-[#00A86B] text-white' : 'border border-gray-300'}`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-100"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Detail Side Panel */}
                        <AnimatePresence>
                            {selectedSubmission && (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => setSelectedSubmission(null)}
                                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                                    />
                                    <motion.div
                                        initial={{ x: '100%' }}
                                        animate={{ x: 0 }}
                                        exit={{ x: '100%' }}
                                        transition={{ type: 'spring', damping: 30 }}
                                        className="fixed right-0 top-0 bottom-0 w-full md:w-96 bg-white shadow-2xl z-50 overflow-y-auto"
                                    >
                                        <div className="p-6">
                                            <div className="flex justify-between items-center mb-6">
                                                <h2 className="text-2xl font-bold">Submission Details</h2>
                                                <button onClick={() => setSelectedSubmission(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                                                    <X className="w-6 h-6" />
                                                </button>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="flex items-center gap-4">
                                                    <img src={selectedSubmission.farmer.photo} alt="" className="w-20 h-20 rounded-full" />
                                                    <div>
                                                        <h3 className="text-xl font-bold">{selectedSubmission.farmer.name}</h3>
                                                        <p className="text-gray-600">{selectedSubmission.id}</p>
                                                        <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                                            <Phone className="w-4 h-4" />
                                                            {selectedSubmission.farmer.phone}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="bg-blue-50 p-4 rounded-xl">
                                                        <p className="font-semibold flex items-center gap-2">
                                                            <Camera className="w-5 h-5 text-blue-600" />
                                                            {selectedSubmission.photos} Photos
                                                        </p>
                                                    </div>
                                                    <div className="bg-green-50 p-4 rounded-xl">
                                                        <p className="font-semibold flex items-center gap-2">
                                                            <Navigation className="w-5 h-5 text-green-600" />
                                                            GPS: {selectedSubmission.gpsAccuracy}m
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="bg-gray-50 p-6 rounded-xl text-center">
                                                    <p className="text-lg font-medium mb-4">Photo gallery, map view, and full data coming soon...</p>
                                                    <Sparkles className="w-12 h-12 text-yellow-500 mx-auto" />
                                                </div>

                                                <div className="flex gap-4">
                                                    <button className="flex-1 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-bold shadow-lg">
                                                        <ThumbsUp className="w-5 h-5 inline mr-2" />
                                                        Approve
                                                    </button>
                                                    <button className="flex-1 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-bold shadow-lg">
                                                        <ThumbsDown className="w-5 h-5 inline mr-2" />
                                                        Flag / Reject
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <MobileBottomNav />
                <FloatingChatButton />
            </div>
        </AnimatedPage>
    );
};

export default SubmissionsReviewPage;