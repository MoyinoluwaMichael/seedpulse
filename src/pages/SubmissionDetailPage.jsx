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
    User,
    Sparkles
} from 'lucide-react';
import {
    Navbar,
    Sidebar,
    MobileBottomNav,
    PageHeader,
    AnimatedPage,
    FloatingChatButton
} from '@/components';

const SubmissionsReviewPage = () => {
    const [selectedCrop, setSelectedCrop] = useState('all');
    const [selectedState, setSelectedState] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const crops = ['All Crops', 'Rice', 'Maize', 'Cowpea', 'Sorghum', 'Cassava'];
    const states = ['All States', 'Kano', 'Kaduna', 'Benue', 'Niger', 'Kebbi', 'Sokoto', 'Oyo', 'Ogun'];
    const statuses = [
        { id: 'all', label: 'All Status', color: 'gray' },
        { id: 'pending', label: 'Pending Review', color: 'orange' },
        { id: 'flagged', label: 'Flagged Issues', color: 'red' },
        { id: 'approved', label: 'Approved', color: 'green' }
    ];

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
            status: 'pending'
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
            status: 'approved'
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
            status: 'flagged'
        },
        {
            id: 'SUB-2025-004',
            farmer: { name: 'Blessing Adeyemi', photo: 'https://i.pravatar.cc/150?img=9', phone: '+234 813 567 8901' },
            crop: 'Sorghum',
            variety: 'ICSV 400',
            state: 'Niger',
            lga: 'Mokwa',
            submittedDate: '2025-12-03',
            photos: 10,
            gpsAccuracy: 3.5,
            status: 'pending'
        },
        {
            id: 'SUB-2025-005',
            farmer: { name: 'Aminu Bello', photo: 'https://i.pravatar.cc/150?img=51', phone: '+234 805 432 1098' },
            crop: 'Rice',
            variety: 'FARO 52',
            state: 'Kebbi',
            lga: 'Argungu',
            submittedDate: '2025-12-02',
            photos: 9,
            gpsAccuracy: 5.1,
            status: 'approved'
        },
        {
            id: 'SUB-2025-006',
            farmer: { name: 'Fatima Hassan', photo: 'https://i.pravatar.cc/150?img=20', phone: '+234 807 654 3210' },
            crop: 'Maize',
            variety: 'SAMMAZ 27',
            state: 'Sokoto',
            lga: 'Gwadabawa',
            submittedDate: '2025-12-02',
            photos: 7,
            gpsAccuracy: 8.9,
            status: 'pending'
        },
        {
            id: 'SUB-2025-007',
            farmer: { name: 'Oluwaseun Ogunleye', photo: 'https://i.pravatar.cc/150?img=60', phone: '+234 809 876 5432' },
            crop: 'Cassava',
            variety: 'TME 419',
            state: 'Oyo',
            lga: 'Ibadan North',
            submittedDate: '2025-12-01',
            photos: 11,
            gpsAccuracy: 3.2,
            status: 'approved'
        },
        {
            id: 'SUB-2025-008',
            farmer: { name: 'Abubakar Sadiq', photo: 'https://i.pravatar.cc/150?img=68', phone: '+234 812 345 6789' },
            crop: 'Rice',
            variety: 'NERICA L-19',
            state: 'Kano',
            lga: 'Bichi',
            submittedDate: '2025-12-01',
            photos: 5,
            gpsAccuracy: 12.3,
            status: 'flagged'
        },
        {
            id: 'SUB-2025-009',
            farmer: { name: 'Grace Nwankwo', photo: 'https://i.pravatar.cc/150?img=45', phone: '+234 815 234 5670' },
            crop: 'Cowpea',
            variety: 'Dan Ila',
            state: 'Kaduna',
            lga: 'Kaduna South',
            submittedDate: '2025-11-30',
            photos: 8,
            gpsAccuracy: 4.7,
            status: 'pending'
        },
        {
            id: 'SUB-2025-010',
            farmer: { name: 'Mohammed Garba', photo: 'https://i.pravatar.cc/150?img=52', phone: '+234 808 765 4321' },
            crop: 'Maize',
            variety: 'SAMMAZ 55',
            state: 'Niger',
            lga: 'Lapai',
            submittedDate: '2025-11-30',
            photos: 14,
            gpsAccuracy: 2.1,
            status: 'approved'
        },
        {
            id: 'SUB-2025-011',
            farmer: { name: 'Ngozi Eze', photo: 'https://i.pravatar.cc/150?img=38', phone: '+234 811 987 6543' },
            crop: 'Sorghum',
            variety: 'Samsorg 45',
            state: 'Benue',
            lga: 'Otukpo',
            submittedDate: '2025-11-29',
            photos: 6,
            gpsAccuracy: 6.8,
            status: 'pending'
        },
        {
            id: 'SUB-2025-012',
            farmer: { name: 'Yusuf Aliyu', photo: 'https://i.pravatar.cc/150?img=70', phone: '+234 814 567 8902' },
            crop: 'Cassava',
            variety: 'TMS 98/0505',
            state: 'Ogun',
            lga: 'Abeokuta South',
            submittedDate: '2025-11-29',
            photos: 9,
            gpsAccuracy: 3.9,
            status: 'approved'
        }
    ];

    const getStatusConfig = (status) => {
        switch(status) {
            case 'pending':
                return {
                    label: 'Pending Review',
                    color: 'orange',
                    bgColor: 'bg-orange-100',
                    textColor: 'text-orange-700',
                    borderColor: 'border-orange-300',
                    icon: AlertTriangle
                };
            case 'flagged':
                return {
                    label: 'Flagged Issues',
                    color: 'red',
                    bgColor: 'bg-red-100',
                    textColor: 'text-red-700',
                    borderColor: 'border-red-300',
                    icon: XCircle
                };
            case 'approved':
                return {
                    label: 'Approved',
                    color: 'green',
                    bgColor: 'bg-green-100',
                    textColor: 'text-green-700',
                    borderColor: 'border-green-300',
                    icon: CheckCircle
                };
            default:
                return {
                    label: 'Unknown',
                    color: 'gray',
                    bgColor: 'bg-gray-100',
                    textColor: 'text-gray-700',
                    borderColor: 'border-gray-300',
                    icon: AlertTriangle
                };
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
                    <PageHeader
                        title="Review Submissions"
                        breadcrumb={['Dashboard', 'Submissions']}
                    />

                    <div className="max-w-[1600px] mx-auto px-4 py-8">
                        {/* Stats Overview */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                        >
                            {[
                                { label: 'Total Today', value: '47', icon: Camera, color: 'blue' },
                                { label: 'Pending', value: '23', icon: AlertTriangle, color: 'orange' },
                                { label: 'Flagged', value: '8', icon: XCircle, color: 'red' },
                                { label: 'Approved', value: '16', icon: CheckCircle, color: 'green' }
                            ].map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                                                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                                            </div>
                                            <div className={`p-3 bg-${stat.color}-100 rounded-xl`}>
                                                <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* Filters Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100 mb-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {/* Crop Filter */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Crop Type
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedCrop}
                                            onChange={(e) => setSelectedCrop(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#00853E] focus:ring-4 focus:ring-[#00853E]/10 outline-none transition-all duration-300 appearance-none cursor-pointer font-medium"
                                        >
                                            {crops.map(crop => (
                                                <option key={crop} value={crop.toLowerCase()}>{crop}</option>
                                            ))}
                                        </select>
                                        <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* State Filter */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        State
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedState}
                                            onChange={(e) => setSelectedState(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#00853E] focus:ring-4 focus:ring-[#00853E]/10 outline-none transition-all duration-300 appearance-none cursor-pointer font-medium"
                                        >
                                            {states.map(state => (
                                                <option key={state} value={state.toLowerCase()}>{state}</option>
                                            ))}
                                        </select>
                                        <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Date Range */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Date Range
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#00853E] focus:ring-4 focus:ring-[#00853E]/10 outline-none transition-all duration-300 font-medium"
                                        />
                                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Status Filter */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedStatus}
                                            onChange={(e) => setSelectedStatus(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#00853E] focus:ring-4 focus:ring-[#00853E]/10 outline-none transition-all duration-300 appearance-none cursor-pointer font-medium"
                                        >
                                            {statuses.map(status => (
                                                <option key={status.id} value={status.id}>{status.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Submissions Table */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                        >
                            {/* Desktop Table */}
                            <div className="hidden lg:block overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                    <tr className="bg-gradient-to-r from-[#00853E]/5 to-[#00A86B]/5 border-b-2 border-gray-200">
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
                                    <tbody>
                                    {mockSubmissions.map((submission, index) => {
                                        const statusConfig = getStatusConfig(submission.status);
                                        const gpsQuality = getGPSQuality(submission.gpsAccuracy);
                                        const StatusIcon = statusConfig.icon;

                                        return (
                                            <motion.tr
                                                key={submission.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 + index * 0.05 }}
                                                whileHover={{
                                                    backgroundColor: 'rgba(0, 133, 62, 0.03)',
                                                    scale: 1.01
                                                }}
                                                onClick={() => setSelectedSubmission(submission)}
                                                className="border-b border-gray-100 cursor-pointer transition-all duration-300"
                                            >
                                                {/* Farmer */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <motion.img
                                                            whileHover={{ scale: 1.2 }}
                                                            src={submission.farmer.photo}
                                                            alt={submission.farmer.name}
                                                            className="w-12 h-12 rounded-full object-cover border-2 border-[#00853E]/20 mr-3"
                                                        />
                                                        <div>
                                                            <p className="font-semibold text-gray-800">{submission.farmer.name}</p>
                                                            <p className="text-xs text-gray-500">{submission.id}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Contact */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center text-gray-600">
                                                        <Phone className="w-4 h-4 mr-2 text-[#00853E]" />
                                                        <span className="text-sm">{submission.farmer.phone}</span>
                                                    </div>
                                                </td>

                                                {/* Crop & Variety */}
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{submission.crop}</p>
                                                        <p className="text-sm text-gray-500">{submission.variety}</p>
                                                    </div>
                                                </td>

                                                {/* Location */}
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="font-medium text-gray-800">{submission.state}</p>
                                                        <p className="text-sm text-gray-500">{submission.lga}</p>
                                                    </div>
                                                </td>

                                                {/* Submitted Date */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center text-gray-600">
                                                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                                        <span className="text-sm">{submission.submittedDate}</span>
                                                    </div>
                                                </td>

                                                {/* Photos */}
                                                <td className="px-6 py-4 text-center">
                                                    <motion.div
                                                        whileHover={{ scale: 1.1 }}
                                                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-semibold"
                                                    >
                                                        <Camera className="w-4 h-4 mr-1" />
                                                        {submission.photos}
                                                    </motion.div>
                                                </td>

                                                {/* GPS Accuracy */}
                                                <td className="px-6 py-4 text-center">
                                                    <motion.div
                                                        whileHover={{ scale: 1.1 }}
                                                        className={`inline-flex items-center px-3 py-1 ${gpsQuality.bg} ${gpsQuality.color} rounded-lg font-semibold text-sm`}
                                                    >
                                                        <Navigation className="w-4 h-4 mr-1" />
                                                        {submission.gpsAccuracy}m
                                                    </motion.div>
                                                </td>

                                                {/* Status */}
                                                <td className="px-6 py-4 text-center">
                                                    <motion.div
                                                        whileHover={{ scale: 1.1 }}
                                                        className={`inline-flex items-center px-3 py-2 ${statusConfig.bgColor} ${statusConfig.textColor} rounded-xl font-semibold text-sm border-2 ${statusConfig.borderColor}`}
                                                    >
                                                        <StatusIcon className="w-4 h-4 mr-2" />
                                                        {submission.status === 'pending' && (
                                                            <motion.span
                                                                animate={{ opacity: [1, 0.5, 1] }}
                                                                transition={{ repeat: Infinity, duration: 2 }}
                                                            >
                                                                {statusConfig.label}
                                                            </motion.span>
                                                        )}
                                                        {submission.status !== 'pending' && statusConfig.label}
                                                    </motion.div>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <motion.button
                                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            className="p-2 bg-[#00853E] text-white rounded-lg hover:bg-[#00A86B] transition-colors"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedSubmission(submission);
                                                            }}
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </motion.button>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <ThumbsUp className="w-4 h-4" />
                                                        </motion.button>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
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
                                {mockSubmissions.map((submission, index) => {
                                    const statusConfig = getStatusConfig(submission.status);
                                    const gpsQuality = getGPSQuality(submission.gpsAccuracy);
                                    const StatusIcon = statusConfig.icon;

                                    return (
                                        <motion.div
                                            key={submission.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 + index * 0.05 }}
                                            whileHover={{ scale: 1.02, y: -5 }}
                                            onClick={() => setSelectedSubmission(submission)}
                                            className="bg-white rounded-2xl p-4 shadow-lg border-2 border-gray-100 hover:border-[#00853E]/30 transition-all duration-300"
                                        >
                                            {/* Header */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center">
                                                    <img
                                                        src={submission.farmer.photo}
                                                        alt={submission.farmer.name}
                                                        className="w-12 h-12 rounded-full object-cover border-2 border-[#00853E]/20 mr-3"
                                                    />
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{submission.farmer.name}</p>
                                                        <p className="text-xs text-gray-500">{submission.id}</p>
                                                    </div>
                                                </div>
                                                <div className={`px-3 py-1 ${statusConfig.bgColor} ${statusConfig.textColor} rounded-lg text-xs font-bold flex items-center`}>
                                                    <StatusIcon className="w-3 h-3 mr-1" />
                                                    {submission.status}
                                                </div>
                                            </div>

                                            {/* Details Grid */}
                                            <div className="grid grid-cols-2 gap-3 mb-4">
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1">Crop & Variety</p>
                                                    <p className="font-semibold text-sm text-gray-800">{submission.crop}</p>
                                                    <p className="text-xs text-gray-600">{submission.variety}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1">Location</p>
                                                    <p className="font-semibold text-sm text-gray-800">{submission.state}</p>
                                                    <p className="text-xs text-gray-600">{submission.lga}</p>
                                                </div>
                                            </div>

                                            {/* Stats */}
                                            <div className="flex items-center justify-between py-3 border-t border-gray-100">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center text-blue-600">
                                                        <Camera className="w-4 h-4 mr-1" />
                                                        <span className="text-sm font-semibold">{submission.photos}</span>
                                                    </div>
                                                    <div className={`flex items-center ${gpsQuality.color}`}>
                                                        <Navigation className="w-4 h-4 mr-1" />
                                                        <span className="text-sm font-semibold">{submission.gpsAccuracy}m</span>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-500">{submission.submittedDate}</div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-2 mt-3">
                                                <motion.button
                                                    whileTap={{ scale: 0.95 }}
                                                    className="flex-1 py-2 bg-[#00853E] text-white rounded-xl font-semibold text-sm flex items-center justify-center"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedSubmission(submission);
                                                    }}
                                                >
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    View
                                                </motion.button>
                                                <motion.button
                                                    whileTap={{ scale: 0.95 }}
                                                    className="px-4 py-2 bg-green-500 text-white rounded-xl"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <ThumbsUp className="w-4 h-4" />
                                                </motion.button>
                                                <motion.button
                                                    whileTap={{ scale: 0.95 }}
                                                    className="px-4 py-2 bg-red-500 text-white rounded-xl"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <ThumbsDown className="w-4 h-4" />
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Pagination */}
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                    <p className="text-sm text-gray-600">
                                        Showing <span className="font-semibold">1-12</span> of <span className="font-semibold">47</span> submissions
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="p-2 bg-white border-2 border-gray-300 rounded-lg hover:border-[#00853E] transition-colors disabled:opacity-50"
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </motion.button>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4].map(page => (
                                                <motion.button
                                                    key={page}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                                                        currentPage === page
                                                            ? 'bg-gradient-to-r from-[#00853E] to-[#00A86B] text-white shadow-lg'
                                                            : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-[#00853E]'
                                                    }`}
                                                >
                                                    {page}
                                                </motion.button>
                                            ))}
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="p-2 bg-white border-2 border-gray-300 rounded-lg hover:border-[#00853E] transition-colors"
                                            onClick={() => setCurrentPage(prev => prev + 1)}
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Load More Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-center mt-6"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-[#00853E] to-[#00A86B] text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                            >
                                <motion.div
                                    animate={{
                                        x: ['-100%', '100%']
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 2,
                                        ease: "linear"
                                    }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                />
                                <span className="relative z-10 flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Load More Submissions
            </span>
                            </motion.button>
                        </motion.div>
                    </div>
                </div>

                {/* Detail Panel Overlay */}
                <AnimatePresence>
                    {selectedSubmission && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedSubmission(null)}
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                            />

                            {/* Side Panel */}
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25 }}
                                className="fixed right-0 top-0 bottom-0 w-full md:w-[600px] bg-white shadow-2xl z-50 overflow-y-auto"
                            >
                                <div className="p-6">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold text-gray-800 font-['Poppins']">
                                            Submission Details
                                        </h2>
                                        <motion.button
                                            whileHover={{ scale: 1.1, rotate: 90 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setSelectedSubmission(null)}
                                            className="p-2 bg-gray-100 rounded-xl hover:bg-red-100 transition-colors"
                                        >
                                            <X className="w-6 h-6 text-gray-600" />
                                        </motion.button>
                                    </div>

                                    {/* Farmer Info */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-gradient-to-br from-[#00853E]/10 to-[#00A86B]/10 rounded-2xl p-6 mb-6"
                                    >
                                        <div className="flex items-center mb-4">
                                            <img
                                                src={selectedSubmission.farmer.photo}
                                                alt={selectedSubmission.farmer.name}
                                                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg mr-4"
                                            />
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800">{selectedSubmission.farmer.name}</h3>
                                                <p className="text-sm text-gray-600">{selectedSubmission.id}</p>
                                                <div className="flex items-center mt-2 text-[#00853E]">
                                                    <Phone className="w-4 h-4 mr-2" />
                                                    <span className="font-semibold">{selectedSubmission.farmer.phone}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Mock Content */}
                                    <div className="space-y-4">
                                        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                                            <p className="text-blue-800 font-semibold flex items-center">
                                                <Camera className="w-5 h-5 mr-2" />
                                                {selectedSubmission.photos} photos uploaded
                                            </p>
                                            <p className="text-sm text-blue-600 mt-1">High resolution field images available for review</p>
                                        </div>

                                        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                                            <p className="text-green-800 font-semibold flex items-center">
                                                <Navigation className="w-5 h-5 mr-2" />
                                                GPS Accuracy: {selectedSubmission.gpsAccuracy}m
                                            </p>
                                            <p className="text-sm text-green-600 mt-1">Location verified and within acceptable range</p>
                                        </div>

                                        <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
                                            <p className="text-purple-800 font-semibold">Full detail panel coming soon...</p>
                                            <p className="text-sm text-purple-600 mt-1">Photo gallery, GPS map, approval workflow, and more!</p>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 mt-6">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex-1 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold shadow-lg flex items-center justify-center"
                                        >
                                            <ThumbsUp className="w-5 h-5 mr-2" />
                                            Approve
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex-1 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-bold shadow-lg flex items-center justify-center"
                                        >
                                            <ThumbsDown className="w-5 h-5 mr-2" />
                                            Flag
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                <MobileBottomNav />
                <FloatingChatButton />
            </div>
        </AnimatedPage>
    );
};
export default SubmissionsReviewPage;