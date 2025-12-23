// src/layouts/AdminLayout.jsx
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { BarChart3, FileText, Users, CheckCircle, MapPin, Sparkles } from 'lucide-react';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { icon: BarChart3, label: 'Dashboard', route: '/admin' },
        { icon: FileText, label: 'Trials', route: '/admin/trials' },
        { icon: Users, label: 'Farmers', route: '/farmers' },
        { icon: CheckCircle, label: 'Approvals', route: '/submissions' },
        { icon: MapPin, label: 'Locations', route: '/locations' },
    ];

    const isActive = (route) => location.pathname.startsWith(route);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-xl border-b border-gray-200 px-4 md:px-6 h-16 flex items-center justify-between shadow-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-700 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                        <FileText className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-green-950 hidden md:block">IFT-DMS Admin</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-700 to-green-600 flex items-center justify-center text-white font-semibold shadow-md">DA</div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <aside className="hidden lg:flex fixed left-0 top-16 bottom-0 w-64 backdrop-blur-xl border-r border-gray-200 flex-col p-4 z-40" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                <nav className="space-y-2 mt-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.route);
                        return (
                            <button
                                key={item.label}
                                onClick={() => navigate(item.route)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                    active
                                        ? 'bg-gradient-to-r from-green-700 to-green-600 text-white shadow-lg'
                                        : 'text-gray-600 hover:bg-gray-100 hover:translate-x-1'
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64 pt-16 min-h-screen pb-20 lg:pb-6">
                <Outlet />
            </main>

            {/* Floating AI Button */}
            <button
                onClick={() => navigate('/chat')}
                className="fixed bottom-24 lg:bottom-6 right-6 z-40 bg-gradient-to-r from-green-700 to-green-600 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-2 font-semibold transition-all hover:shadow-xl hover:scale-105 active:scale-95"
            >
                <span className="hidden md:inline">Ask AI anything...</span>
                <span className="md:hidden">AI Help</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                    <Sparkles className="w-4 h-4" />
                </div>
            </button>
        </div>
    );
};

export default AdminLayout;