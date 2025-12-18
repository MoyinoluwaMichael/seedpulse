// Sidebar.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, TestTube2, FileText, Users, BarChart3, MessageSquare, ChevronRight } from 'lucide-react';

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('Dashboard');

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: TestTube2, label: 'Trials', path: '/trials' },
        { icon: FileText, label: 'Submissions', path: '/submissions' },
        { icon: Users, label: 'Farmers', path: '/farmers' },
        { icon: BarChart3, label: 'Analytics', path: '/analytics' },
        { icon: MessageSquare, label: 'AI Chat', path: '/chat' }
    ];

    return (
        <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="hidden lg:flex fixed left-0 top-20 bottom-0 w-72 bg-white/80 backdrop-blur-xl border-r border-gray-200 shadow-xl flex-col z-40"
        >
            <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-2">
                    {navItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = activeItem === item.label;

                        return (
                            <motion.button
                                key={item.label}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ x: 8, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setActiveItem(item.label)}
                                className={`w-full group relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                                    isActive
                                        ? 'bg-gradient-to-r from-[#00853E] to-[#00A86B] text-white shadow-lg'
                                        : 'text-gray-700 hover:bg-[#F8FFF9]'
                                }`}
                            >
                                {/* Active Glow Effect */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeGlow"
                                        className="absolute inset-0 rounded-2xl"
                                        style={{
                                            boxShadow: '0 0 30px rgba(0, 168, 107, 0.4)',
                                            background: 'linear-gradient(90deg, #00853E, #00A86B)'
                                        }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}

                                <Icon className={`w-6 h-6 relative z-10 ${isActive ? 'text-white' : 'text-[#00853E]'}`} />
                                <span className="font-semibold text-[15px] relative z-10">{item.label}</span>

                                <motion.div
                                    animate={{ x: isActive ? [0, 5, 0] : 0 }}
                                    transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                                    className="ml-auto relative z-10"
                                >
                                    <ChevronRight className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-[#00853E]'}`} />
                                </motion.div>

                                {/* Hover Slide Effect */}
                                <motion.div
                                    className="absolute left-0 top-0 bottom-0 w-1 bg-[#00A86B] rounded-r-full opacity-0 group-hover:opacity-100"
                                    initial={{ scaleY: 0 }}
                                    whileHover={{ scaleY: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Branding */}
            <div className="p-6 border-t border-gray-200">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#00853E]/10 to-[#00A86B]/10 border border-[#00A86B]/30">
                    <p className="text-sm font-semibold text-[#00853E] mb-1">IFT-DMS v2.0</p>
                    <p className="text-xs text-gray-600">Powered by AI-driven insights</p>
                </div>
            </div>
        </motion.aside>
    );
};

export default Sidebar;