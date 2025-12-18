import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Leaf,
    Calendar,
    TrendingUp,
    Clock,
    Droplet,
    Shield,
    Ruler,
    DollarSign,
    Plus,
    ChevronLeft,
    ChevronRight,
    Save,
    Check
} from 'lucide-react';
import {
    Navbar,
    Sidebar,
    MobileBottomNav,
    PageHeader,
    Button,
    AnimatedPage,
    FloatingChatButton
} from '@/components';

const TrialSetupPage = () => {
    const [currentStep, setCurrentStep] = useState(2);
    const [selectedCrop, setSelectedCrop] = useState('rice');
    const [selectedSeason, setSelectedSeason] = useState('2025-wet');
    const [criteria, setCriteria] = useState([
        { id: 1, label: 'Minimum Yield', value: 4.5, unit: 'tons/ha', icon: TrendingUp, type: 'number' },
        { id: 2, label: 'Days to Maturity', value: 120, unit: 'days', icon: Clock, type: 'number' },
        { id: 3, label: 'Drought Tolerance', value: 4, unit: '1-5 scale', icon: Droplet, type: 'slider' },
        { id: 4, label: 'Disease Resistance', value: 4, unit: '1-5 scale', icon: Shield, type: 'slider' },
        { id: 5, label: 'Grain Size Preference', value: 7.5, unit: 'mm', icon: Ruler, type: 'number' },
        { id: 6, label: 'Market Price Target', value: 450, unit: '₦/kg', icon: DollarSign, type: 'number' }
    ]);

    const steps = [
        { number: 1, label: 'Trial Basics', completed: true },
        { number: 2, label: 'Target Product Profile', completed: false },
        { number: 3, label: 'Locations & Farmers', completed: false },
        { number: 4, label: 'Review', completed: false }
    ];

    const crops = [
        { id: 'rice', name: 'Rice', icon: '🌾', color: '#FFD700' },
        { id: 'maize', name: 'Maize', icon: '🌽', color: '#FFA500' },
        { id: 'cowpea', name: 'Cowpea', icon: '🫘', color: '#8B4513' },
        { id: 'sorghum', name: 'Sorghum', icon: '🌾', color: '#CD853F' }
    ];

    const seasons = [
        { id: '2025-dry', label: '2025 Dry Season', months: 'Nov 2024 - Mar 2025' },
        { id: '2025-wet', label: '2025 Wet Season', months: 'Apr 2025 - Oct 2025' },
        { id: '2026-dry', label: '2026 Dry Season', months: 'Nov 2025 - Mar 2026' }
    ];

    const handleAddCriteria = () => {
        const newId = Math.max(...criteria.map(c => c.id)) + 1;
        setCriteria([...criteria, {
            id: newId,
            label: 'Custom Criteria',
            value: 0,
            unit: 'units',
            icon: Plus,
            type: 'number'
        }]);
    };

    const updateCriteriaValue = (id, newValue) => {
        setCriteria(criteria.map(c => c.id === id ? { ...c, value: newValue } : c));
    };

    return (
        <AnimatedPage>
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
                <Navbar />
                <Sidebar />

                <div className="lg:ml-64 pb-20 lg:pb-8">
                    <PageHeader
                        title="Create New Field Trial"
                        breadcrumb={['Dashboard', 'Trials', 'New Trial']}
                    />

                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative h-64 md:h-80 overflow-hidden"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: 'url(https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&h=800&fit=crop)',
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2F1A]/95 via-[#00853E]/85 to-[#0A2F1A]/95" />

                        {/* Grain Noise Overlay */}
                        <div
                            className="absolute inset-0 opacity-30"
                            style={{
                                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
                            }}
                        />

                        <div className="relative h-full flex items-center justify-center px-4 text-center">
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                    className="inline-block p-4 bg-white/10 rounded-full backdrop-blur-sm mb-6"
                                >
                                    <Leaf className="w-12 h-12 text-white" />
                                </motion.div>
                                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-['Poppins']">
                                    Set Up a New Crop Variety Trial
                                </h1>
                                <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto">
                                    Define your target product profile to guide field testing across Nigeria
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Stepper */}
                    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                        {/* Desktop Stepper - Horizontal */}
                        <div className="hidden md:block mb-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center justify-between max-w-4xl mx-auto"
                            >
                                {steps.map((step, index) => (
                                    <React.Fragment key={step.number}>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="flex flex-col items-center flex-1"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.4 + index * 0.1 }}
                                                className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg mb-3 transition-all duration-300 ${
                                                    step.number === currentStep
                                                        ? 'bg-gradient-to-br from-[#00853E] to-[#00A86B] text-white shadow-lg shadow-green-500/50'
                                                        : step.completed
                                                            ? 'bg-gradient-to-br from-[#4CAF50] to-[#00A86B] text-white'
                                                            : 'bg-white text-gray-400 border-2 border-gray-200'
                                                }`}
                                            >
                                                {step.completed ? <Check className="w-7 h-7" /> : step.number}
                                            </motion.div>
                                            <span className={`text-sm font-medium text-center ${
                                                step.number === currentStep ? 'text-[#00853E]' : 'text-gray-500'
                                            }`}>
                        {step.label}
                      </span>
                                        </motion.div>
                                        {index < steps.length - 1 && (
                                            <motion.div
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{ delay: 0.5 + index * 0.1 }}
                                                className={`h-1 flex-1 mx-4 rounded-full transition-all duration-500 ${
                                                    step.completed ? 'bg-gradient-to-r from-[#4CAF50] to-[#00A86B]' : 'bg-gray-200'
                                                }`}
                                                style={{ transformOrigin: 'left' }}
                                            />
                                        )}
                                    </React.Fragment>
                                ))}
                            </motion.div>
                        </div>

                        {/* Mobile Stepper - Vertical */}
                        <div className="md:hidden mb-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-4"
                            >
                                {steps.map((step, index) => (
                                    <motion.div
                                        key={step.number}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        className="flex items-center"
                                    >
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                                                step.number === currentStep
                                                    ? 'bg-gradient-to-br from-[#00853E] to-[#00A86B] text-white shadow-lg shadow-green-500/50'
                                                    : step.completed
                                                        ? 'bg-gradient-to-br from-[#4CAF50] to-[#00A86B] text-white'
                                                        : 'bg-white text-gray-400 border-2 border-gray-200'
                                            }`}
                                        >
                                            {step.completed ? <Check className="w-5 h-5" /> : step.number}
                                        </div>
                                        <span className={`ml-4 font-medium ${
                                            step.number === currentStep ? 'text-[#00853E]' : 'text-gray-500'
                                        }`}>
                      {step.label}
                    </span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Main Content - TPP Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="max-w-5xl mx-auto"
                        >
                            {/* Glass Card */}
                            <div className="bg-[#F8FFF9]/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-green-100/50 overflow-hidden">
                                <div className="p-6 md:p-10">
                                    {/* Section Title */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                        className="mb-8"
                                    >
                                        <h2 className="text-2xl md:text-3xl font-bold text-[#0A2F1A] mb-2 font-['Poppins']">
                                            Target Product Profile (TPP)
                                        </h2>
                                        <p className="text-gray-600">
                                            Define the ideal characteristics for your new crop variety
                                        </p>
                                    </motion.div>

                                    {/* Crop & Season Selection */}
                                    <div className="grid md:grid-cols-2 gap-6 mb-10">
                                        {/* Crop Selector */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.7 }}
                                        >
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                Select Crop
                                            </label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {crops.map((crop, index) => (
                                                    <motion.button
                                                        key={crop.id}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.8 + index * 0.05 }}
                                                        whileHover={{ scale: 1.05, y: -5 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => setSelectedCrop(crop.id)}
                                                        className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                                                            selectedCrop === crop.id
                                                                ? 'border-[#00853E] bg-gradient-to-br from-[#00853E]/10 to-[#00A86B]/10 shadow-lg shadow-green-500/20'
                                                                : 'border-gray-200 bg-white hover:border-[#4CAF50]/50'
                                                        }`}
                                                    >
                                                        <div className="text-4xl mb-2">{crop.icon}</div>
                                                        <div className="text-sm font-semibold text-gray-800">{crop.name}</div>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </motion.div>

                                        {/* Season Selector */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.75 }}
                                        >
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                Growing Season
                                            </label>
                                            <div className="space-y-3">
                                                {seasons.map((season, index) => (
                                                    <motion.button
                                                        key={season.id}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.85 + index * 0.05 }}
                                                        whileHover={{ scale: 1.02, x: 5 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => setSelectedSeason(season.id)}
                                                        className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                                                            selectedSeason === season.id
                                                                ? 'border-[#00853E] bg-gradient-to-r from-[#00853E]/10 to-[#00A86B]/10 shadow-lg shadow-green-500/20'
                                                                : 'border-gray-200 bg-white hover:border-[#4CAF50]/50'
                                                        }`}
                                                    >
                                                        <div className="flex items-center">
                                                            <Calendar className={`w-5 h-5 mr-3 ${
                                                                selectedSeason === season.id ? 'text-[#00853E]' : 'text-gray-400'
                                                            }`} />
                                                            <div>
                                                                <div className="font-semibold text-gray-800">{season.label}</div>
                                                                <div className="text-xs text-gray-500">{season.months}</div>
                                                            </div>
                                                        </div>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Success Criteria */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.9 }}
                                        className="mb-8"
                                    >
                                        <h3 className="text-xl font-bold text-[#0A2F1A] mb-6 font-['Poppins']">
                                            Success Criteria
                                        </h3>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <AnimatePresence>
                                                {criteria.map((criterion, index) => {
                                                    const Icon = criterion.icon;
                                                    return (
                                                        <motion.div
                                                            key={criterion.id}
                                                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.9 }}
                                                            transition={{ delay: 1 + index * 0.1, type: "spring" }}
                                                            whileHover={{ y: -5 }}
                                                            className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-[#4CAF50]/30 hover:shadow-xl transition-all duration-300"
                                                        >
                                                            <div className="flex items-center mb-4">
                                                                <motion.div
                                                                    whileHover={{ rotate: 360 }}
                                                                    transition={{ duration: 0.6 }}
                                                                    className="p-3 bg-gradient-to-br from-[#00853E]/10 to-[#00A86B]/10 rounded-xl mr-3"
                                                                >
                                                                    <Icon className="w-6 h-6 text-[#00853E]" />
                                                                </motion.div>
                                                                <div>
                                                                    <label className="block text-sm font-semibold text-gray-800">
                                                                        {criterion.label}
                                                                    </label>
                                                                    <span className="text-xs text-gray-500">{criterion.unit}</span>
                                                                </div>
                                                            </div>

                                                            {criterion.type === 'slider' ? (
                                                                <div>
                                                                    <input
                                                                        type="range"
                                                                        min="1"
                                                                        max="5"
                                                                        value={criterion.value}
                                                                        onChange={(e) => updateCriteriaValue(criterion.id, parseInt(e.target.value))}
                                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#00853E]"
                                                                        style={{
                                                                            background: `linear-gradient(to right, #00853E 0%, #00853E ${(criterion.value - 1) * 25}%, #e5e7eb ${(criterion.value - 1) * 25}%, #e5e7eb 100%)`
                                                                        }}
                                                                    />
                                                                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                                                                        <span>Low</span>
                                                                        <motion.span
                                                                            key={criterion.value}
                                                                            initial={{ scale: 1.5 }}
                                                                            animate={{ scale: 1 }}
                                                                            className="font-bold text-[#00853E]"
                                                                        >
                                                                            {criterion.value}
                                                                        </motion.span>
                                                                        <span>High</span>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <motion.input
                                                                    whileFocus={{ scale: 1.02 }}
                                                                    type="number"
                                                                    value={criterion.value}
                                                                    onChange={(e) => updateCriteriaValue(criterion.id, parseFloat(e.target.value))}
                                                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#00853E] focus:ring-4 focus:ring-[#00853E]/10 outline-none transition-all duration-300 font-semibold text-gray-800"
                                                                />
                                                            )}
                                                        </motion.div>
                                                    );
                                                })}
                                            </AnimatePresence>
                                        </div>

                                        {/* Add Custom Criteria Button */}
                                        <motion.button
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 1.6 }}
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleAddCriteria}
                                            className="mt-6 w-full md:w-auto px-6 py-4 bg-white border-2 border-dashed border-[#00853E] text-[#00853E] rounded-xl font-semibold flex items-center justify-center hover:bg-[#00853E]/5 transition-all duration-300"
                                        >
                                            <Plus className="w-5 h-5 mr-2" />
                                            Add Custom Criteria
                                        </motion.button>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Navigation Bar */}
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, type: "spring" }}
                        className="fixed bottom-0 left-0 right-0 lg:left-64 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl z-40"
                    >
                        <div className="max-w-7xl mx-auto px-4 py-4">
                            <div className="flex items-center justify-between gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05, x: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold flex items-center hover:border-gray-400 transition-all duration-300"
                                >
                                    <ChevronLeft className="w-5 h-5 mr-2" />
                                    Back
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="hidden md:flex px-6 py-3 bg-gray-100 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold items-center hover:bg-gray-200 transition-all duration-300"
                                >
                                    <Save className="w-5 h-5 mr-2" />
                                    Save Draft
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05, x: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex-1 md:flex-none px-6 py-3 bg-gradient-to-r from-[#00853E] to-[#00A86B] text-white rounded-xl font-semibold flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300"
                                >
                                    Next: Assign Locations
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <MobileBottomNav />
                <FloatingChatButton />
            </div>
        </AnimatedPage>
    );
};

export default TrialSetupPage;