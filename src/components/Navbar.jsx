import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Settings, LogOut, Bell, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userMode, setUserMode] = useState('Admin');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Dashboard', href: '#dashboard' },
        { name: 'Farmers', href: '#farmers' },
        { name: 'Analytics', href: '#analytics' },
        { name: 'Reports', href: '#reports' },
    ];

    const dropdownItems = [
        { icon: User, label: 'Profile', onClick: () => console.log('Profile') },
        { icon: Settings, label: 'Settings', onClick: () => console.log('Settings') },
        { icon: LogOut, label: 'Logout', onClick: () => console.log('Logout'), danger: true },
    ];

    const toggleMode = () => {
        setUserMode(prev => prev === 'Admin' ? 'Stakeholder' : 'Admin');
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    isScrolled
                        ? 'bg-[#F8FFF9]/80 backdrop-blur-xl shadow-lg shadow-[#00853E]/5'
                        : 'bg-transparent'
                }`}
                style={{
                    backgroundImage: isScrolled ? 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.03\' /%3E%3C/svg%3E")' : 'none'
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-20">
                        {/* Logo & Title */}
                        <motion.div
                            className="flex items-center space-x-3 sm:space-x-4"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                        >
                            <motion.div
                                className="relative w-10 h-10 sm:w-12 sm:h-12"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.8, ease: 'easeInOut' }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#00853E] to-[#00A86B] rounded-xl shadow-lg shadow-[#00853E]/30" />
                                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                                    🌾
                                </div>
                                <motion.div
                                    className="absolute inset-0 rounded-xl bg-[#00A86B]/30"
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </motion.div>
                            <div>
                                <h1 className="text-lg sm:text-xl font-bold text-[#0A2F1A] font-['Poppins']">
                                    IFT-DMS
                                </h1>
                                <p className="text-xs text-[#00853E] font-['Inter'] hidden sm:block">
                                    Farm Data Management
                                </p>
                            </div>
                        </motion.div>

                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navLinks.map((link, idx) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    className="relative px-4 py-2 text-[#0A2F1A] font-['Inter'] font-medium text-sm overflow-hidden group"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                  <span className="relative z-10 group-hover:text-[#00A86B] transition-colors">
                    {link.name}
                  </span>
                                    <motion.div
                                        className="absolute inset-0 bg-[#4CAF50]/10 rounded-lg"
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileHover={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.a>
                            ))}
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            {/* Mode Toggle */}
                            <motion.button
                                onClick={toggleMode}
                                className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-[#00853E] to-[#00A86B] text-white rounded-full text-xs font-['Inter'] font-medium shadow-lg shadow-[#00853E]/30"
                                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0, 133, 62, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>{userMode}</span>
                            </motion.button>

                            {/* Notification Bell */}
                            <motion.button
                                className="relative p-2 text-[#0A2F1A] hover:bg-[#4CAF50]/10 rounded-full transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-[#00A86B] rounded-full animate-pulse" />
                            </motion.button>

                            {/* User Dropdown */}
                            <div className="relative hidden sm:block">
                                <motion.button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 p-1 pr-3 hover:bg-[#4CAF50]/10 rounded-full transition-all group"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00853E] to-[#00A86B] flex items-center justify-center text-white font-bold shadow-lg shadow-[#00853E]/30">
                                        AO
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-[#0A2F1A] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </motion.button>

                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-[#00853E]/10 overflow-hidden border border-[#4CAF50]/20"
                                            style={{
                                                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.03\' /%3E%3C/svg%3E")'
                                            }}
                                        >
                                            <div className="p-4 border-b border-[#4CAF50]/10">
                                                <p className="text-sm font-semibold text-[#0A2F1A] font-['Poppins']">Adeyemi Ojo</p>
                                                <p className="text-xs text-[#00853E] font-['Inter']">{userMode}</p>
                                            </div>
                                            {dropdownItems.map((item, idx) => (
                                                <motion.button
                                                    key={item.label}
                                                    onClick={item.onClick}
                                                    className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-[#4CAF50]/10 transition-colors text-left ${
                                                        item.danger ? 'text-red-600' : 'text-[#0A2F1A]'
                                                    }`}
                                                    whileHover={{ x: 4 }}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                >
                                                    <item.icon className="w-4 h-4" />
                                                    <span className="text-sm font-['Inter']">{item.label}</span>
                                                </motion.button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Mobile Menu Button */}
                            <motion.button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 text-[#0A2F1A] hover:bg-[#4CAF50]/10 rounded-lg transition-colors"
                                whileTap={{ scale: 0.9 }}
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-[#4CAF50]/20"
                            style={{
                                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.03\' /%3E%3C/svg%3E")'
                            }}
                        >
                            <div className="px-4 py-4 space-y-1">
                                {navLinks.map((link, idx) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        className="block px-4 py-3 text-[#0A2F1A] font-['Inter'] font-medium rounded-lg hover:bg-[#4CAF50]/10 transition-colors"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                                <div className="pt-3 border-t border-[#4CAF50]/20">
                                    <motion.button
                                        onClick={toggleMode}
                                        className="w-full px-4 py-3 bg-gradient-to-r from-[#00853E] to-[#00A86B] text-white rounded-lg text-sm font-['Inter'] font-medium shadow-lg shadow-[#00853E]/30"
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Switch to {userMode === 'Admin' ? 'Stakeholder' : 'Admin'}
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Spacer to prevent content from hiding under fixed navbar */}
            <div className="h-16 sm:h-20" />

            {/* Demo Content for scrolling effect */}
            <div className="min-h-screen bg-gradient-to-br from-[#F8FFF9] to-[#E8F5E9] p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-[#00853E]/10 border border-[#4CAF50]/20"
                        style={{
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.03\' /%3E%3C/svg%3E")'
                        }}
                    >
                        <h2 className="text-3xl font-bold text-[#0A2F1A] font-['Poppins'] mb-4">
                            Welcome to IFT-DMS
                        </h2>
                        <p className="text-[#00853E] font-['Inter'] text-lg">
                            Scroll down to see the navbar glass effect in action 🌾
                        </p>
                    </motion.div>
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="bg-white/40 backdrop-blur-md rounded-2xl p-6 h-64"
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Navbar;