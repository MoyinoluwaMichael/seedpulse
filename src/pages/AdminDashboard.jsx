import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Clock, CheckCircle, Users, FileText, Eye, BarChart3, Plus, MapPin, AlertCircle, XCircle, Sparkles } from 'lucide-react';

const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-xl border-b border-gray-200 px-4 md:px-6 h-16 flex items-center justify-between shadow-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-700 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-green-950 hidden md:block">IFT-DMS Admin</span>
        </div>
        <div className="flex items-center gap-4">
            <button className="relative transition-transform hover:scale-105">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-700 to-green-600 flex items-center justify-center text-white font-semibold shadow-md">DA</div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
            </button>
        </div>
    </nav>
);

const MobileBottomNav = ({ navigate }) => {
    const items = [
        { icon: BarChart3, label: 'Dashboard', active: true, route: '/admin' },
        { icon: FileText, label: 'Trials', active: false, route: '/trials/new' },
        { icon: Users, label: 'Farmers', active: false, route: '/farmers' },
        { icon: CheckCircle, label: 'More', active: false, route: '/submissions' },
    ];

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 backdrop-blur-xl border-t border-gray-200 px-4 py-3 z-50 shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <div className="flex justify-around items-center max-w-md mx-auto">
                {items.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={idx}
                            onClick={() => navigate(item.route)}
                            className="flex flex-col items-center gap-1 transition-transform active:scale-95 min-w-[60px]"
                        >
                            <div className={`p-2.5 rounded-xl transition-colors ${item.active ? 'bg-gradient-to-r from-green-700 to-green-600' : 'hover:bg-gray-100'}`}>
                                <Icon className={`w-5 h-5 ${item.active ? 'text-white' : 'text-gray-400'}`} />
                            </div>
                            <span className={`text-xs ${item.active ? 'text-green-700 font-semibold' : 'text-gray-400'}`}>{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

const FloatingChatButton = ({ navigate }) => (
    <button onClick={() => navigate('/chat')} className="fixed bottom-24 lg:bottom-6 right-6 z-40 bg-gradient-to-r from-green-700 to-green-600 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-2 font-semibold transition-all hover:shadow-xl hover:scale-105 active:scale-95">
        <span className="hidden md:inline">Ask AI anything...</span>
        <span className="md:hidden">AI Help</span>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
            <Sparkles className="w-4 h-4" />
        </div>
    </button>
);

const StatsCard = ({ title, value, trend, icon: Icon, color }) => {
    return (
        <div className="relative backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200 overflow-hidden group transition-transform hover:-translate-y-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                    {trend !== undefined && (
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${trend > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {Math.abs(trend)}%
                        </div>
                    )}
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
                <p className="text-3xl font-bold text-green-950">{value}</p>
            </div>
        </div>
    );
};

const mockSubmissions = [
    { id: 1, farmer: 'Adebayo Okafor', crop: 'Rice', state: 'Ogun', submitted: '2 hours ago', status: 'pending' },
    { id: 2, farmer: 'Fatima Usman', crop: 'Maize', state: 'Kaduna', submitted: '5 hours ago', status: 'approved' },
    { id: 3, farmer: 'Chidi Nwosu', crop: 'Cassava', state: 'Enugu', submitted: '1 day ago', status: 'pending' },
    { id: 4, farmer: 'Aisha Mohammed', crop: 'Sorghum', state: 'Kano', submitted: '1 day ago', status: 'approved' },
    { id: 5, farmer: 'Emeka Eze', crop: 'Yam', state: 'Anambra', submitted: '2 days ago', status: 'rejected' },
    { id: 6, farmer: 'Blessing Okoro', crop: 'Rice', state: 'Delta', submitted: '2 days ago', status: 'approved' },
    { id: 7, farmer: 'Ibrahim Bello', crop: 'Millet', state: 'Sokoto', submitted: '3 days ago', status: 'pending' },
    { id: 8, farmer: 'Grace Ojo', crop: 'Cassava', state: 'Ondo', submitted: '3 days ago', status: 'approved' },
];

const mockMapData = [
    { state: 'Kano', trials: 24, x: 50, y: 20 },
    { state: 'Lagos', trials: 45, x: 15, y: 70 },
    { state: 'Kaduna', trials: 18, x: 40, y: 30 },
    { state: 'Ogun', trials: 32, x: 18, y: 68 },
    { state: 'Enugu', trials: 15, x: 60, y: 65 },
    { state: 'Rivers', trials: 28, x: 40, y: 85 },
    { state: 'Oyo', trials: 21, x: 22, y: 62 },
    { state: 'Delta', trials: 19, x: 35, y: 75 },
    { state: 'Anambra', trials: 14, x: 55, y: 68 },
    { state: 'Sokoto', trials: 11, x: 25, y: 15 },
    { state: 'Katsina', trials: 16, x: 45, y: 10 },
    { state: 'Ondo', trials: 13, x: 30, y: 72 },
];

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [hoveredState, setHoveredState] = useState(null);

    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';
    const currentDate = new Date().toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const getStatusBadge = (status) => {
        const badges = {
            pending: { bg: 'bg-orange-100', text: 'text-orange-600', icon: Clock, label: 'Pending' },
            approved: { bg: 'bg-green-100', text: 'text-green-600', icon: CheckCircle, label: 'Approved' },
            rejected: { bg: 'bg-red-100', text: 'text-red-600', icon: XCircle, label: 'Rejected' },
        };
        const badge = badges[status];
        const Icon = badge.icon;
        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
                <Icon className="w-3 h-3" />
                {badge.label}
            </span>
        );
    };

    const handleStateClick = (state) => {
        const location = mockMapData.find(m => m.state === state);
        alert(`Selected state: ${state} with ${location.trials} active trials`);
    };

    return (
        <>
                    <div className="relative overflow-hidden bg-gradient-to-r from-orange-100 via-yellow-50 to-orange-100">
                        <div className="relative px-4 md:px-6 py-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-green-950 mb-2">{greeting}, Dr. Aisha 👋</h1>
                            <p className="text-gray-600">{currentDate}</p>
                        </div>
                    </div>

                <div className="px-4 md:px-6 py-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                        <StatsCard title="Total Active Trials" value="184" trend={12} icon={FileText} color="from-green-700 to-green-600" />
                        <StatsCard title="Pending Submissions" value="67" icon={AlertCircle} color="from-orange-500 to-orange-600" />
                        <StatsCard title="Approved This Week" value="542" trend={8} icon={CheckCircle} color="from-green-500 to-green-600" />
                        <StatsCard title="Farmers Registered" value="3,291" trend={15} icon={Users} color="from-blue-500 to-blue-600" />
                    </div>
                </div>

                <div className="px-4 md:px-6 pb-6">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <div className="xl:col-span-2 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-green-950">Recent Submissions</h2>
                            </div>

                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr style={{ backgroundColor: 'rgba(249, 250, 251, 0.5)' }}>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Farmer Name</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Crop</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">State</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Submitted</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {mockSubmissions.map((submission) => (
                                            <tr key={submission.id} className="hover:bg-green-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-700 to-green-600 flex items-center justify-center text-white text-xs font-semibold">
                                                            {submission.farmer.split(' ').map((n) => n[0]).join('')}
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-900">{submission.farmer}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{submission.crop}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{submission.state}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{submission.submitted}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(submission.status)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button className="text-green-700 hover:text-green-600 transition-all hover:scale-110">
                                                        <Eye className="w-5 h-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="md:hidden divide-y divide-gray-200">
                                {mockSubmissions.map((submission) => (
                                    <div key={submission.id} className="p-4 hover:bg-green-50 transition-colors">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-700 to-green-600 flex items-center justify-center text-white text-xs font-semibold">
                                                    {submission.farmer.split(' ').map((n) => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-gray-900">{submission.farmer}</div>
                                                    <div className="text-xs text-gray-500">{submission.crop} • {submission.state}</div>
                                                </div>
                                            </div>
                                            <button className="text-green-700 p-2">
                                                <Eye className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500">{submission.submitted}</span>
                                            {getStatusBadge(submission.status)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                            <h2 className="text-xl font-bold text-green-950 mb-4">Active Trial Locations</h2>
                            <div className="relative w-full aspect-square bg-gradient-to-br from-green-50 to-blue-50 rounded-xl overflow-hidden">
                                <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: 'drop-shadow(0 2px 8px rgba(0,133,62,0.1))' }}>
                                    <path d="M 20,15 L 80,15 L 85,30 L 80,45 L 75,60 L 70,70 L 60,80 L 50,85 L 40,85 L 30,80 L 25,70 L 20,60 L 15,45 L 18,30 Z" fill="#E8F5E9" stroke="#00853E" strokeWidth="0.5" />
                                </svg>

                                {mockMapData.map((location, idx) => (
                                    <div
                                        key={idx}
                                        style={{ position: 'absolute', left: `${location.x}%`, top: `${location.y}%`, transform: 'translate(-50%, -50%)' }}
                                        onMouseEnter={() => setHoveredState(location.state)}
                                        onMouseLeave={() => setHoveredState(null)}
                                        onClick={() => handleStateClick(location.state)}
                                        className="cursor-pointer"
                                    >
                                        <div className="relative w-3 h-3 bg-green-700 rounded-full shadow-lg">
                                            <div className="absolute inset-0 bg-green-600 rounded-full animate-ping opacity-75" />
                                        </div>

                                        {hoveredState === location.state && (
                                            <div className="absolute left-1/2 -translate-x-1/2 -top-16 bg-white rounded-lg shadow-xl px-3 py-2 whitespace-nowrap z-10">
                                                <div className="text-xs font-semibold text-green-950">{location.state}</div>
                                                <div className="text-xs text-gray-600">{location.trials} active trials</div>
                                                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-white rotate-45" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-xs text-gray-600">
                                <div className="w-2 h-2 bg-green-700 rounded-full animate-pulse" />
                                <span>12 states with active trials</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4 md:px-6 pb-6">
                    <div className="backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                        <h2 className="text-xl font-bold text-green-950 mb-6">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button onClick={() => navigate('/trials/new')} className="bg-gradient-to-r from-green-700 to-green-600 text-white p-6 rounded-xl shadow-lg flex items-center gap-4 hover:shadow-xl transition-all hover:scale-105 active:scale-95">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                                    <Plus className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-lg">Create New Trial</div>
                                    <div className="text-sm text-white opacity-80">Start a new field trial</div>
                                </div>
                            </button>

                            <button onClick={() => navigate('/submissions')} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg flex items-center gap-4 hover:shadow-xl transition-all hover:scale-105 active:scale-95">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                                    <CheckCircle className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-lg">Review Submissions</div>
                                    <div className="text-sm text-white opacity-80">67 pending review</div>
                                </div>
                            </button>

                            <button onClick={() => navigate('/h2h')} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg flex items-center gap-4 hover:shadow-xl transition-all hover:scale-105 active:scale-95">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                                    <BarChart3 className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-lg">View H2H Analytics</div>
                                    <div className="text-sm text-white opacity-80">Compare treatments</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </>
    );
};

export default AdminDashboard;