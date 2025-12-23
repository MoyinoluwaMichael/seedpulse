// src/pages/TrialSetupPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

const TrialSetupPage = () => {
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
        { number: 2, label: 'Target Product Profile', completed: true },
        { number: 3, label: 'Locations & Farmers', completed: false },
        { number: 4, label: 'Review', completed: false }
    ];

    const crops = [
        { id: 'rice', name: 'Rice', icon: '🌾' },
        { id: 'maize', name: 'Maize', icon: '🌽' },
        { id: 'cowpea', name: 'Cowpea', icon: '🫘' },
        { id: 'sorghum', name: 'Sorghum', icon: '🌾' }
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
        <div className="px-4 md:px-6 lg:px-8 py-6">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative h-64 md:h-80 overflow-hidden rounded-3xl mb-12"
            >
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'ur[](https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&h=800&fit=crop)' }} />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A2F1A]/95 via-[#00853E]/85 to-[#0A2F1A]/95" />
                <div className="relative h-full flex items-center justify-center px-4 text-center">
                    <div>
                        <div className="inline-block p-4 bg-white/10 rounded-full backdrop-blur-sm mb-6">
                            <Leaf className="w-12 h-12 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Set Up a New Crop Variety Trial</h1>
                        <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto">Define your target product profile to guide field testing across Nigeria</p>
                    </div>
                </div>
            </motion.div>

            {/* Stepper (Desktop) */}
            <div className="hidden md:block mb-12">
                <div className="flex items-center justify-between max-w-4xl mx-auto">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.number}>
                            <div className="flex flex-col items-center flex-1">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg mb-3 ${step.completed ? 'bg-gradient-to-br from-[#4CAF50] to-[#00A86B] text-white' : step.number === 2 ? 'bg-gradient-to-br from-[#00853E] to-[#00A86B] text-white shadow-lg' : 'bg-white text-gray-400 border-2 border-gray-200'}`}>
                                    {step.completed ? <Check className="w-7 h-7" /> : step.number}
                                </div>
                                <span className={`text-sm font-medium ${step.number === 2 ? 'text-[#00853E]' : 'text-gray-500'}`}>{step.label}</span>
                            </div>
                            {index < steps.length - 1 && <div className={`h-1 flex-1 mx-4 rounded-full ${step.completed ? 'bg-gradient-to-r from-[#4CAF50] to-[#00A86B]' : 'bg-gray-200'}`} />}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Form Content */}
            <div className="max-w-7xl mx-auto bg-[#F8FFF9]/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-green-100/50 p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A2F1A] mb-8">Target Product Profile (TPP)</h2>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-4">Select Crop</label>
                        <div className="grid grid-cols-2 gap-4">
                            {crops.map((crop) => (
                                <button key={crop.id} onClick={() => setSelectedCrop(crop.id)} className={`p-6 rounded-2xl border-2 transition-all ${selectedCrop === crop.id ? 'border-[#00853E] bg-gradient-to-br from-[#00853E]/10 to-[#00A86B]/10 shadow-lg' : 'border-gray-200 bg-white hover:border-[#4CAF50]/50'}`}>
                                    <div className="text-5xl mb-3">{crop.icon}</div>
                                    <div className="font-semibold text-gray-800">{crop.name}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-4">Growing Season</label>
                        <div className="space-y-3">
                            {seasons.map((season) => (
                                <button key={season.id} onClick={() => setSelectedSeason(season.id)} className={`w-full p-4 rounded-xl border-2 text-left transition-all ${selectedSeason === season.id ? 'border-[#00853E] bg-gradient-to-r from-[#00853E]/10 to-[#00A86B]/10 shadow-lg' : 'border-gray-200 bg-white hover:border-[#4CAF50]/50'}`}>
                                    <div className="flex items-center">
                                        <Calendar className={`w-5 h-5 mr-3 ${selectedSeason === season.id ? 'text-[#00853E]' : 'text-gray-400'}`} />
                                        <div>
                                            <div className="font-semibold">{season.label}</div>
                                            <div className="text-sm text-gray-500">{season.months}</div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-[#0A2F1A] mb-6">Success Criteria</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {criteria.map((criterion) => {
                            const Icon = criterion.icon;
                            return (
                                <div key={criterion.id} className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-[#4CAF50]/30 transition-all">
                                    <div className="flex items-center mb-4">
                                        <div className="p-3 bg-gradient-to-br from-[#00853E]/10 to-[#00A86B]/10 rounded-xl mr-3">
                                            <Icon className="w-6 h-6 text-[#00853E]" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-800">{criterion.label}</div>
                                            <div className="text-xs text-gray-500">{criterion.unit}</div>
                                        </div>
                                    </div>
                                    {criterion.type === 'slider' ? (
                                        <input type="range" min="1" max="5" value={criterion.value} onChange={(e) => updateCriteriaValue(criterion.id, parseInt(e.target.value))} className="w-full accent-[#00853E]" />
                                    ) : (
                                        <input type="number" value={criterion.value} onChange={(e) => updateCriteriaValue(criterion.id, parseFloat(e.target.value))} className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#00853E] outline-none" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <button onClick={handleAddCriteria} className="mt-8 px-6 py-4 border-2 border-dashed border-[#00853E] text-[#00853E] rounded-xl font-semibold flex items-center hover:bg-[#00853E]/5">
                        <Plus className="w-5 h-5 mr-2" />
                        Add Custom Criteria
                    </button>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl z-40">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between gap-4">
                        <button className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold flex items-center">
                            <ChevronLeft className="w-5 h-5 mr-2" />
                            Back
                        </button>
                        <button className="hidden md:flex px-6 py-3 bg-gray-100 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold items-center">
                            <Save className="w-5 h-5 mr-2" />
                            Save Draft
                        </button>
                        <button className="px-6 py-3 bg-gradient-to-r from-[#00853E] to-[#00A86B] text-white rounded-xl font-semibold flex items-center justify-center shadow-lg">
                            Next: Assign Locations
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrialSetupPage;