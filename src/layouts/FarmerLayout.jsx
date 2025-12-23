// src/layouts/FarmerLayout.jsx
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FileText, Camera, MessageCircle, User, Sparkles, Leaf } from 'lucide-react';

const FarmerLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

const menuItems = [
    { icon: FileText, label: 'My Trials', route: '/farmer' },
    { icon: Camera, label: 'Submit Data', route: '/farmer/submit' },
    { icon: MessageCircle, label: 'AI Assistant', route: '/farmer/chat' },
    { icon: User, label: 'Profile', route: '/farmer/profile' },
];

    const isActive = (route) => location.pathname === route;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            {/* Top Header - Logo Left, User Right */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-xl border-b border-gray-200 shadow-sm">
                <div className="px-4 md:px-6 h-16 flex items-center justify-between">
                    {/* Left: Logo & Title */}
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-700 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Leaf className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-green-950">IFT-DMS</h1>
                            <p className="text-xs text-gray-600 -mt-1">Farmer Portal</p>
                        </div>
                    </div>

                    {/* Right: User Profile */}
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="font-semibold text-gray-800 text-sm">Musa Abdullahi</p>
                            <p className="text-xs text-gray-500">Kura LGA, Kano</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-700 to-green-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                            MA
                        </div>
                    </div>
                </div>
            </header>

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex fixed left-0 top-16 bottom-0 w-64 bg-white bg-opacity-90 backdrop-blur-xl border-r border-gray-200 flex-col z-40">
                <nav className="flex-1 p-6 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.route);
                        return (
                            <button
                                key={item.label}
                                onClick={() => navigate(item.route)}
                                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 ${
                                    active
                                        ? 'bg-gradient-to-r from-green-700 to-green-600 text-white shadow-lg'
                                        : 'text-gray-700 hover:bg-gray-100 hover:translate-x-1'
                                }`}
                            >
                                <Icon className="w-5 h-5 flex-shrink-0" />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* AI Button in Sidebar */}
                <div className="p-6 border-t border-gray-200">
                    <button
                        onClick={() => navigate('/chat')}
                        className="w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                    >
                        <Sparkles className="w-5 h-5" />
                        Ask AI Assistant
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="md:ml-64 pt-16 min-h-screen pb-20 md:pb-8">
                <Outlet />
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-xl border-t border-gray-200 px-4 py-3 z-50 shadow-2xl">
                <div className="flex justify-around items-center">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.route);
                        return (
                            <button
                                key={item.label}
                                onClick={() => navigate(item.route)}
                                className="flex flex-col items-center gap-1 py-2 px-3 transition-all"
                            >
                                <div className={`p-2.5 rounded-xl transition-colors ${active ? 'bg-gradient-to-r from-green-700 to-green-600' : 'hover:bg-gray-100'}`}>
                                    <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-500'}`} />
                                </div>
                                <span className={`text-xs font-medium ${active ? 'text-green-700' : 'text-gray-500'}`}>
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* Floating AI Button (Mobile Only) */}
            <button
                onClick={() => navigate('/chat')}
                className="fixed bottom-20 right-6 z-40 md:hidden bg-gradient-to-r from-green-700 to-green-600 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 font-semibold transition-all hover:shadow-xl hover:scale-105 active:scale-95"
            >
                <Sparkles className="w-5 h-5" />
                <span className="text-sm">AI Help</span>
            </button>
        </div>
    );
};

export default FarmerLayout;