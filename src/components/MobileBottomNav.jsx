// MobileBottomNav.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, TestTube2, FileText, BarChart3, MessageSquare } from 'lucide-react';

const MobileBottomNav = () => {
    const [activeTab, setActiveTab] = useState('Home');

    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: TestTube2, label: 'Trials', path: '/trials' },
        { icon: FileText, label: 'Submit', path: '/submissions' },
        { icon: BarChart3, label: 'Analytics', path: '/analytics' },
        { icon: MessageSquare, label: 'Chat', path: '/chat' }
    ];

    return (
        <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, type: 'spring' }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-gray-200 shadow-2xl"
        >
            <div className="flex items-center justify-around px-2 py-3">
                {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.label;

                    return (
                        <motion.button
                            key={item.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setActiveTab(item.label)}
                            className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all"
                        >
                            {/* Active Background Glow */}
                            {isActive && (
                                <motion.div
                                    layoutId="mobileActiveTab"
                                    className="absolute inset-0 bg-gradient-to-br from-[#00853E]/10 to-[#00A86B]/10 rounded-2xl"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}

                            <div className="relative">
                                <Icon
                                    className={`w-6 h-6 transition-colors ${
                                        isActive ? 'text-[#00853E]' : 'text-gray-400'
                                    }`}
                                />

                                {/* Active Green Dot */}
                                {isActive && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1"
                                    >
                                        <motion.div
                                            animate={{ scale: [1, 1.3, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="w-2 h-2 bg-[#00A86B] rounded-full shadow-lg"
                                            style={{ boxShadow: '0 0 8px rgba(0, 168, 107, 0.6)' }}
                                        />
                                    </motion.div>
                                )}
                            </div>

                            <span
                                className={`text-xs font-semibold relative z-10 transition-colors ${
                                    isActive ? 'text-[#00853E]' : 'text-gray-500'
                                }`}
                            >
                {item.label}
              </span>
                        </motion.button>
                    );
                })}
            </div>
        </motion.nav>
    );
};

export default MobileBottomNav;