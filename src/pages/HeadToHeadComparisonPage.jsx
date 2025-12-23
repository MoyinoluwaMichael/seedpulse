// src/pages/HeadToHeadComparisonPage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Trophy, TrendingUp, Droplets, Shield, Clock, Star, Download, Sparkles, CheckCircle2 } from 'lucide-react';

const HeadToHeadComparisonPage = () => {
    const [ringsAnimated, setRingsAnimated] = useState(false);
    const [confettiActive, setConfettiActive] = useState(false);
    const [selectedMetric, setSelectedMetric] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setRingsAnimated(true);
            setConfettiActive(true);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    // Enhanced metrics with real impact statements
    const comparisonMetrics = [
        {
            name: 'Yield Advantage',
            value: 42,
            icon: TrendingUp,
            color: '#00A86B',
            unit: '%',
            description: 'Higher average yield per hectare across all zones',
            impact: '2.1 tons/ha increase = ₦840,000 additional revenue per hectare'
        },
        {
            name: 'Drought Tolerance',
            value: 38,
            icon: Droplets,
            color: '#4CAF50',
            unit: '%',
            description: 'Superior performance under water stress',
            impact: 'Maintains 85% yield under moderate drought vs 62% for FARO-44'
        },
        {
            name: 'Disease Resistance',
            value: 51,
            icon: Shield,
            color: '#00853E',
            unit: '%',
            description: 'Reduced incidence of blast and bacterial leaf blight',
            impact: '68% reduction in disease incidence saves ₦150,000/ha in fungicide'
        },
        {
            name: 'Days to Maturity',
            value: 12,
            icon: Clock,
            color: '#00A86B',
            unit: ' days',
            prefix: '-',
            description: 'Earlier harvest enables double cropping',
            impact: '12 days earlier maturity enables optimal crop rotation'
        },
        {
            name: 'Grain Quality Score',
            value: 29,
            icon: Star,
            color: '#4CAF50',
            unit: '%',
            description: 'Higher milling recovery and market preference',
            impact: 'Premium market price due to superior grain characteristics'
        },
        {
            name: 'Farmer Adoption Rate',
            value: 94,
            icon: CheckCircle2,
            color: '#00853E',
            unit: '%',
            description: 'Would plant again in next season',
            impact: 'Exceptional farmer satisfaction and replanting intention'
        }
    ];

    // State-by-state yield data
    const stateYieldData = [
        { state: 'Kaduna', faro66: 6.8, faro44: 4.2, trials: 156 },
        { state: 'Niger', faro66: 7.2, faro44: 4.8, trials: 189 },
        { state: 'Kebbi', faro66: 6.5, faro44: 4.5, trials: 143 },
        { state: 'Kano', faro66: 6.9, faro44: 4.3, trials: 167 },
        { state: 'Benue', faro66: 7.5, faro44: 5.1, trials: 178 },
        { state: 'Taraba', faro66: 7.1, faro44: 4.9, trials: 134 },
        { state: 'Ebonyi', faro66: 7.8, faro44: 5.3, trials: 198 },
        { state: 'Cross River', faro66: 7.3, faro44: 5.0, trials: 119 },
    ];

    // Growth timeline
    const performanceTrends = [
        { week: 'Week 2', faro66: 15, faro44: 12 },
        { week: 'Week 4', faro66: 35, faro44: 28 },
        { week: 'Week 6', faro66: 58, faro44: 45 },
        { week: 'Week 8', faro66: 75, faro44: 61 },
        { week: 'Week 10', faro66: 88, faro44: 74 },
        { week: 'Week 12', faro66: 95, faro44: 82 },
        { week: 'Week 14', faro66: 100, faro44: 88 },
    ];

    // Confetti effect for winner
    const Confetti = () => (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(60)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                        backgroundColor: i % 3 === 0 ? '#00A86B' : i % 3 === 1 ? '#FFD700' : '#4CAF50',
                        left: `${Math.random() * 100}%`,
                        top: '-20px'
                    }}
                    initial={{ y: -100, opacity: 1 }}
                    animate={{
                        y: '100vh',
                        opacity: [1, 1, 0],
                        rotate: Math.random() * 720
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        delay: Math.random() * 1,
                        ease: 'easeOut'
                    }}
                />
            ))}
        </div>
    );

    // Interactive metric ring
    const MetricRing = ({ metric, index }) => {
        const radius = 80;
        const circumference = 2 * Math.PI * radius;
        const percentage = Math.min(metric.value, 100);
        const offset = ringsAnimated ? circumference - (percentage / 100) * circumference : circumference;
        const Icon = metric.icon;
        const isHovered = selectedMetric === metric.name;

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, type: 'spring', stiffness: 150 }}
                className="flex flex-col items-center cursor-pointer"
                onMouseEnter={() => setSelectedMetric(metric.name)}
                onMouseLeave={() => setSelectedMetric(null)}
            >
                <motion.div
                    animate={{ scale: isHovered ? 1.15 : 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="relative"
                >
                    <svg width="180" height="180" className="-rotate-90">
                        <circle cx="90" cy="90" r={radius} stroke="#E8F5E9" strokeWidth="16" fill="none" />
                        <motion.circle
                            cx="90"
                            cy="90"
                            r={radius}
                            stroke={metric.color}
                            strokeWidth="16"
                            fill="none"
                            strokeLinecap="round"
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: offset }}
                            transition={{ duration: 2, delay: 1 + index * 0.1, ease: 'easeOut' }}
                            style={{ filter: isHovered ? `drop-shadow(0 0 20px ${metric.color})` : `drop-shadow(0 0 12px ${metric.color}40)` }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Icon className="w-10 h-10 mb-2" style={{ color: metric.color }} />
                        <div className="text-3xl font-bold" style={{ color: metric.color }}>
                            {metric.prefix || '+'}{metric.value}{metric.unit}
                        </div>
                    </div>
                </motion.div>
                <div className="text-center mt-6">
                    <p className="font-bold text-gray-800 text-base">{metric.name}</p>
                    <p className="text-sm text-gray-600 max-w-xs mt-2">{metric.description}</p>
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200"
                            >
                                <p className="text-sm text-gray-700 font-medium">{metric.impact}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="px-4 md:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="inline-block mb-6 px-8 py-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full border-2 border-green-300/50"
                    >
                        <p className="text-sm font-bold text-green-800 tracking-wide uppercase">
                            Data from 1,284 Multi-Location Trials • AI-Verified
                        </p>
                    </motion.div>
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#00853E] via-[#00A86B] to-[#4CAF50] bg-clip-text text-transparent"
                        animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        style={{ backgroundSize: '200%' }}
                    >
                        Head-to-Head Variety Showdown
                    </motion.h1>
                    <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                        Real-world performance comparison revealing the <strong className="text-[#00853E]">definitive superior variety</strong> for Nigeria's rice revolution
                    </p>
                </motion.div>

                {/* Winner vs Baseline Cards */}
                <div className="relative mb-20">
                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Winner: FARO-66 */}
                        <motion.div
                            initial={{ x: -80, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="relative"
                        >
                            {confettiActive && <Confetti />}
                            <div className="relative bg-white/95 backdrop-blur-2xl rounded-3xl p-10 border-4 border-[#00A86B] shadow-2xl overflow-hidden group">
                                <motion.div
                                    className="absolute inset-0 rounded-3xl opacity-40"
                                    animate={{ boxShadow: ['0 0 40px rgba(0,168,107,0.4)', '0 0 80px rgba(0,168,107,0.7)', '0 0 40px rgba(0,168,107,0.4)'] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />

                                {/* Winner Trophy */}
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: 'spring', stiffness: 200, delay: 1 }}
                                    className="absolute -top-8 -right-8 z-20"
                                >
                                    <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 p-6 rounded-full shadow-2xl border-8 border-white">
                                        <Trophy className="w-16 h-16 text-white" />
                                    </div>
                                </motion.div>

                                <div className="relative z-10">
                                    <div className="relative overflow-hidden rounded-2xl mb-8 group">
                                        <img
                                            src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80"
                                            alt="FARO-66 Rice Field"
                                            className="w-full h-80 object-cover shadow-xl transform group-hover:scale-110 transition-transform duration-700"
                                            onError={(e) => e.target.src = 'https://via.placeholder.com/800x600?text=FARO-66+Rice+Field'}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2">
                                                <p className="text-sm font-bold text-green-800">Champion Variety</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 mb-6">
                                        <Sparkles className="w-10 h-10 text-yellow-500" />
                                        <h2 className="text-4xl font-bold text-[#00853E]">FARO-66</h2>
                                    </div>

                                    <div className="space-y-3 text-base">
                                        <p><strong>Breeder:</strong> National Cereals Research Institute</p>
                                        <p><strong>Released:</strong> 2023</p>
                                        <p><strong>Type:</strong> Upland & Lowland Adapted</p>
                                    </div>

                                    <div className="mt-8 p-6 bg-gradient-to-r from-[#00A86B]/20 to-[#4CAF50]/20 rounded-2xl border-2 border-green-200">
                                        <p className="text-lg font-bold text-[#00853E] text-center flex items-center justify-center gap-2">
                                            <Trophy className="w-6 h-6" />
                                            Winner Across All Performance Metrics
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Baseline: FARO-44 */}
                        <motion.div
                            initial={{ x: 80, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 border-2 border-gray-300 shadow-xl"
                        >
                            <div className="relative overflow-hidden rounded-2xl mb-8">
                                <img
                                    src="https://images.unsplash.com/photo-1536304929831-7438f940a270?auto=format&fit=crop&w=800&q=80"
                                    alt="FARO-44 Rice Field"
                                    className="w-full h-80 object-cover shadow-lg opacity-90"
                                    onError={(e) => e.target.src = 'https://via.placeholder.com/800x600?text=FARO-44+Rice+Field'}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2">
                                        <p className="text-sm font-bold text-gray-600">Baseline Variety</p>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-4xl font-bold text-gray-700 mb-6">FARO-44</h2>

                            <div className="space-y-3 text-base text-gray-600">
                                <p><strong>Breeder:</strong> NCRI Badeggi</p>
                                <p><strong>Released:</strong> 2009</p>
                                <p><strong>Type:</strong> Upland</p>
                            </div>

                            <div className="mt-8 p-6 bg-gray-100 rounded-2xl border-2 border-gray-200">
                                <p className="text-center text-gray-600 flex items-center justify-center gap-2">
                                    <Shield className="w-5 h-5" />
                                    Standard check variety for comparison
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Epic VS Badge */}
                    <motion.div
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block"
                    >
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-2xl opacity-60"
                            />
                            <div className="relative bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 w-32 h-32 rounded-full flex items-center justify-center shadow-2xl border-8 border-white">
                                <motion.span
                                    className="text-5xl font-black text-white"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    VS
                                </motion.span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Performance Advantage Rings */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mb-20"
                >
                    <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-12 shadow-2xl border border-gray-200">
                        <div className="text-center mb-16">
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                className="inline-block mb-4"
                            >
                                <div className="px-6 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full border-2 border-green-300/50">
                                    <p className="text-sm font-bold text-green-800 tracking-wide uppercase">
                                        Six Critical Performance Dimensions
                                    </p>
                                </div>
                            </motion.div>
                            <h3 className="text-4xl font-bold text-[#00853E]">
                                Performance Advantage Engine
                            </h3>
                            <p className="text-gray-600 mt-3 text-lg">Hover over each metric for detailed impact analysis</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {comparisonMetrics.map((metric, index) => (
                                <MetricRing key={metric.name} metric={metric} index={index} />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Growth Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="mb-20"
                >
                    <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-gray-200">
                        <div className="text-center mb-10">
                            <h3 className="text-4xl font-bold text-[#00853E] mb-3">
                                Growth Performance Timeline
                            </h3>
                            <p className="text-gray-600 text-lg">Biomass accumulation throughout the growing season</p>
                        </div>
                        <ResponsiveContainer width="100%" height={450}>
                            <LineChart data={performanceTrends}>
                                <defs>
                                    <linearGradient id="colorFaro66" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00A86B" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#00A86B" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorFaro44" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                <XAxis dataKey="week" tick={{ fill: '#374151' }} />
                                <YAxis tick={{ fill: '#374151' }} label={{ value: 'Growth Index (%)', angle: -90, position: 'insideLeft', style: { fill: '#374151' } }} />
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.98)', borderRadius: '16px', border: '2px solid #00853E' }} />
                                <Legend />
                                <Line type="monotone" dataKey="faro66" name="FARO-66" stroke="#00A86B" strokeWidth={5} dot={{ fill: '#00A86B', r: 8 }} activeDot={{ r: 12 }} fill="url(#colorFaro66)" />
                                <Line type="monotone" dataKey="faro44" name="FARO-44" stroke="#9CA3AF" strokeWidth={4} dot={{ fill: '#9CA3AF', r: 6 }} strokeDasharray="8 4" fill="url(#colorFaro44)" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* State-by-State Yield */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mb-20"
                >
                    <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-gray-200">
                        <div className="text-center mb-10">
                            <h3 className="text-4xl font-bold text-[#00853E] mb-3">
                                Yield Performance by State (tons/ha)
                            </h3>
                            <p className="text-gray-600 text-lg">Consistent superiority across all major rice-growing regions</p>
                        </div>
                        <ResponsiveContainer width="100%" height={500}>
                            <BarChart data={stateYieldData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                <XAxis dataKey="state" tick={{ fill: '#374151' }} angle={-45} textAnchor="end" height={80} />
                                <YAxis tick={{ fill: '#374151' }} label={{ value: 'Yield (t/ha)', angle: -90, position: 'insideLeft', style: { fill: '#374151' } }} />
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.98)', borderRadius: '16px', border: '2px solid #00853E' }} />
                                <Legend />
                                <Bar dataKey="faro66" name="FARO-66" fill="#00A86B" radius={[10, 10, 0, 0]} />
                                <Bar dataKey="faro44" name="FARO-44" fill="#9CA3AF" radius={[10, 10, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* AI Verdict */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mb-16"
                >
                    <div className="relative bg-gradient-to-br from-[#00853E]/10 to-[#00A86B]/10 backdrop-blur-2xl rounded-3xl p-12 shadow-2xl border-2 border-[#00A86B]">
                        <motion.div
                            className="absolute inset-0 rounded-3xl opacity-30"
                            animate={{ boxShadow: ['0 0 40px rgba(0,168,107,0.4)', '0 0 80px rgba(0,168,107,0.6)', '0 0 40px rgba(0,168,107,0.4)'] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-4 bg-gradient-to-br from-[#00853E] to-[#00A86B] rounded-2xl shadow-xl">
                                    <Sparkles className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-4xl font-bold text-[#00853E]">AI-Powered Verdict</h3>
                            </div>

                            <div className="bg-white/90 rounded-3xl p-10">
                                <p className="text-2xl leading-relaxed text-gray-800 mb-6">
                                    <strong className="text-[#00853E]">FARO-66 is the definitive superior variety</strong> based on comprehensive analysis of 1,284 on-farm trials across 12 states.
                                </p>
                                <p className="text-xl leading-relaxed text-gray-800 mb-8">
                                    It delivers consistent excellence in yield, resilience, and farmer preference — making it the ideal choice for nationwide scaling in the 2026 wet season.
                                </p>
                                <div className="flex items-center justify-between pt-6 border-t border-[#00853E]/20">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-[#00853E] to-[#00A86B] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                                            AI
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#00853E] text-xl">IFT-DMS Intelligence Engine</p>
                                            <p className="text-gray-600">Confidence: <strong>98.7%</strong></p>
                                        </div>
                                    </div>
                                    <CheckCircle2 className="w-12 h-12 text-[#00A86B]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Download Report */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                    className="text-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 30px 60px rgba(0,133,62,0.4)' }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-6 bg-gradient-to-r from-[#00853E] to-[#00A86B] text-white px-16 py-8 rounded-3xl text-2xl font-bold shadow-2xl transition-all"
                    >
                        <Download className="w-10 h-10" />
                        Download Full Report
                    </motion.button>
                    <p className="text-gray-700 mt-6 text-lg">
                        47-page technical report • Complete data • Methodology • Recommendations
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default HeadToHeadComparisonPage;