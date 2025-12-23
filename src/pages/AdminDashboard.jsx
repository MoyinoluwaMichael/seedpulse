// src/pages/AdminDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Clock, CheckCircle, Users, FileText, AlertCircle, BarChart3, Plus, Sparkles, Camera} from 'lucide-react';
import TrialLocationsMap from '../components/TrialLocationsMap';

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

const AdminDashboard = () => {
    const navigate = useNavigate();

    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';
    const currentDate = new Date().toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="px-4 md:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">
                {/* Greeting */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-green-950 mb-2">
                        {greeting}, Dr. Aisha 👋
                    </h1>
                    <p className="text-lg text-gray-600">{currentDate}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
                    <StatsCard title="Total Active Trials" value="184" trend={12} icon={FileText} color="from-green-700 to-green-600" />
                    <StatsCard title="Pending Submissions" value="67" icon={AlertCircle} color="from-orange-500 to-orange-600" />
                    <StatsCard title="Approved This Week" value="542" trend={8} icon={CheckCircle} color="from-green-500 to-green-600" />
                    <StatsCard title="Farmers Registered" value="3,291" trend={15} icon={Users} color="from-blue-500 to-blue-600" />
                </div>

                {/* Map + Recent Submissions */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
                    {/* Active Trial Locations Map */}
                    <div className="xl:col-span-2 bg-white bg-opacity-90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-green-950">Active Trial Locations</h2>
                            <p className="text-gray-600 mt-1">Click markers for trial details</p>
                        </div>
                        <div className="h-96">
                            <TrialLocationsMap />
                        </div>
                    </div>

                    {/* Recent Submissions (Placeholder) */}
                    <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-green-950">Recent Submissions</h2>
                        </div>
                        <div className="p-6">
                            <div className="text-center py-12">
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                                    <Camera className="w-16 h-16 text-gray-400" />
                                </div>
                                <p className="text-gray-600">Real submission feed coming soon</p>
                                <button
                                    onClick={() => navigate('/admin/submissions')}
                                    className="mt-4 text-green-700 font-medium hover:underline"
                                >
                                    View All Submissions →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold text-green-950 mb-8">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <button
                            onClick={() => navigate('/admin/trials/new')}
                            className="bg-gradient-to-r from-green-700 to-green-600 text-white p-8 rounded-2xl shadow-lg flex flex-col items-center gap-4 hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                                <Plus className="w-8 h-8" />
                            </div>
                            <div className="text-center">
                                <div className="font-bold text-lg">Create New Trial</div>
                                <div className="text-sm opacity-90 mt-1">Start a new field trial</div>
                            </div>
                        </button>

                        <button
                            onClick={() => navigate('/admin/submissions')}
                            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8 rounded-2xl shadow-lg flex flex-col items-center gap-4 hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <div className="text-center">
                                <div className="font-bold text-lg">Review Submissions</div>
                                <div className="text-sm opacity-90 mt-1">67 pending review</div>
                            </div>
                        </button>

                        <button
                            onClick={() => navigate('/admin/h2h')}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-2xl shadow-lg flex flex-col items-center gap-4 hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                                <BarChart3 className="w-8 h-8" />
                            </div>
                            <div className="text-center">
                                <div className="font-bold text-lg">Head-to-Head Analytics</div>
                                <div className="text-sm opacity-90 mt-1">Compare variety performance</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;