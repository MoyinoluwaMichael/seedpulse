// src/pages/HeadToHeadComparisonPage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Trophy, TrendingUp, Droplets, Shield, Clock, Star, Download, Sparkles, CheckCircle2, Award, Zap, Target, Leaf } from 'lucide-react';

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

    const comparisonMetrics = [
        { name: 'Yield Advantage', value: 42, icon: TrendingUp, color: '#00A86B', unit: '%', faro66: 7.1, faro44: 5.0, impact: '2.1 tons/ha increase = ₦840,000+ extra revenue/ha' },
        { name: 'Drought Tolerance', value: 38, icon: Droplets, color: '#4CAF50', unit: '%', faro66: 85, faro44: 62, impact: 'Maintains 85% yield under moderate drought' },
        { name: 'Disease Resistance', value: 51, icon: Shield, color: '#00853E', unit: '%', faro66: 12, faro44: 38, impact: '68% fewer infections → lower pesticide cost' },
        { name: 'Days to Maturity', value: 12, icon: Clock, color: '#00A86B', unit: ' days', prefix: '-', faro66: 118, faro44: 130, impact: '12 days earlier = better rotation & risk reduction' },
        { name: 'Grain Quality', value: 29, icon: Star, color: '#4CAF50', unit: '%', faro66: 87, faro44: 67, impact: 'Premium market price + higher milling recovery' },
        { name: 'Farmer Preference', value: 94, icon: CheckCircle2, color: '#00853E', unit: '%', faro66: 94, faro44: 67, impact: '94% would plant again — exceptional adoption' }
    ];

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

    const growthTimeline = [
        { week: 'Week 2', faro66: 15, faro44: 12 },
        { week: 'Week 4', faro66: 35, faro44: 28 },
        { week: 'Week 6', faro66: 58, faro44: 45 },
        { week: 'Week 8', faro66: 75, faro44: 61 },
        { week: 'Week 10', faro66: 88, faro44: 74 },
        { week: 'Week 12', faro66: 95, faro44: 82 },
        { week: 'Week 14', faro66: 100, faro44: 88 },
    ];

    const Confetti = () => (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
            {[...Array(80)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                        backgroundColor: i % 4 === 0 ? '#00A86B' : i % 4 === 1 ? '#FFD700' : i % 4 === 2 ? '#4CAF50' : '#00853E',
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
                        duration: 3 + Math.random() * 3,
                        delay: Math.random() * 1.5,
                        ease: 'easeOut'
                    }}
                />
            ))}
        </div>
    );

    const MetricRing = ({ metric, index }) => {
        const radius = 85;
        const circumference = 2 * Math.PI * radius;
        const percentage = metric.value > 100 ? 100 : metric.value;
        const offset = ringsAnimated ? circumference - (percentage / 100) * circumference : circumference;
        const Icon = metric.icon;
        const isHovered = selectedMetric === metric.name;

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.12, type: 'spring', stiffness: 150 }}
                className="flex flex-col items-center cursor-pointer"
                onMouseEnter={() => setSelectedMetric(metric.name)}
                onMouseLeave={() => setSelectedMetric(null)}
            >
                <motion.div
                    animate={{ scale: isHovered ? 1.12 : 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="relative"
                >
                    <svg width="200" height="200" className="-rotate-90">
                        <circle cx="100" cy="100" r={radius} stroke="#E8F5E9" strokeWidth="18" fill="none" />
                        <motion.circle
                            cx="100"
                            cy="100"
                            r={radius}
                            stroke={metric.color}
                            strokeWidth="18"
                            fill="none"
                            strokeLinecap="round"
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: offset }}
                            transition={{ duration: 2, delay: 1 + index * 0.12, ease: 'easeOut' }}
                            style={{ filter: isHovered ? `drop-shadow(0 0 30px ${metric.color})` : `drop-shadow(0 0 15px ${metric.color}40)` }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Icon className="w-12 h-12 mb-3" style={{ color: metric.color }} />
                        <div className="text-5xl font-black" style={{ color: metric.color }}>
                            {metric.prefix || '+'}{metric.value}{metric.unit}
                        </div>
                    </div>
                </motion.div>
                <div className="text-center mt-8">
                    <p className="font-bold text-xl text-gray-800">{metric.name}</p>
                    <p className="text-sm text-gray-600 max-w-xs mt-2">{metric.description}</p>
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, y: -10 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -10 }}
                                className="mt-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 shadow-lg"
                            >
                                <p className="text-sm font-semibold text-green-800 leading-relaxed">{metric.impact}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            {/* Confetti for Winner */}
            {confettiActive && <Confetti />}

            {/* Subtle Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-0 left-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"
                    animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
                    transition={{ duration: 30, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"
                    animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
                    transition={{ duration: 35, repeat: Infinity }}
                />
            </div>

            <div className="relative px-4 md:px-6 lg:px-8 py-12">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}
                        className="text-center mb-20"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="inline-block mb-8 px-10 py-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full border-4 border-green-300/50 shadow-xl"
                        >
                            <p className="text-lg font-bold text-green-800 tracking-wider uppercase flex items-center gap-3 justify-center">
                                <Zap className="w-6 h-6" />
                                Battle-Tested Across 1,284 Multi-Location Trials
                                <Zap className="w-6 h-6" />
                            </p>
                        </motion.div>

                        <motion.h1
                            className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-[#00853E] via-[#00A86B] to-[#4CAF50] bg-clip-text text-transparent"
                            animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                            transition={{ duration: 10, repeat: Infinity }}
                            style={{ backgroundSize: '200%' }}
                        >
                            Ultimate Variety Showdown
                        </motion.h1>
                        <p className="text-2xl text-gray-700 max-w-5xl mx-auto leading-relaxed">
                            Data-driven performance analysis revealing the <strong className="text-[#00853E]">definitive champion</strong> for Nigeria's rice revolution
                        </p>
                    </motion.div>

                    {/* Champion vs Challenger Cards */}
                    <div className="grid md:grid-cols-2 gap-12 mb-24 relative">
                        {/* Epic VS Center Badge */}
                        <motion.div
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:block"
                        >
                            <div className="relative">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                    className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-3xl opacity-60"
                                />
                                <div className="relative bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 w-40 h-40 rounded-full flex items-center justify-center shadow-2xl border-8 border-white">
                                    <motion.span
                                        className="text-7xl font-black text-white"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        VS
                                    </motion.span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Champion: FARO-66 */}
                        <motion.div
                            initial={{ x: -150, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative bg-white/95 backdrop-blur-2xl rounded-3xl p-12 border-4 border-[#00A86B] shadow-2xl overflow-hidden group">
                                <motion.div
                                    className="absolute inset-0 rounded-3xl opacity-40"
                                    animate={{ boxShadow: ['0 0 60px rgba(0,168,107,0.4)', '0 0 100px rgba(0,168,107,0.7)', '0 0 60px rgba(0,168,107,0.4)'] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />

                                {/* Champion Crown */}
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: 'spring', stiffness: 200, delay: 1.2 }}
                                    className="absolute -top-10 -right-10 z-20"
                                >
                                    <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-600 p-8 rounded-full shadow-2xl border-8 border-white">
                                        <Trophy className="w-20 h-20 text-white" />
                                    </div>
                                </motion.div>

                                <div className="relative z-10">
                                    <div className="relative overflow-hidden rounded-3xl mb-8 group">
                                        <img
                                            src="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1000"
                                            alt="FARO-66 thriving field"
                                            className="w-full h-80 object-cover shadow-2xl transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent" />
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl">
                                                <p className="text-2xl font-bold text-green-800 flex items-center gap-3">
                                                    <Award className="w-8 h-8" />
                                                    Champion Variety 2025
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 mb-8">
                                        <Sparkles className="w-12 h-12 text-yellow-500 animate-pulse" />
                                        <h2 className="text-6xl font-black text-[#00853E]">FARO-66</h2>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6 text-lg mb-8">
                                        <div className="bg-green-50/80 p-5 rounded-2xl border border-green-200">
                                            <p className="font-bold text-gray-800">Breeder</p>
                                            <p className="text-gray-600">NCRI Badeggi</p>
                                        </div>
                                        <div className="bg-green-50/80 p-5 rounded-2xl border border-green-200">
                                            <p className="font-bold text-gray-800">Released</p>
                                            <p className="text-gray-600">2023</p>
                                        </div>
                                        <div className="bg-green-50/80 p-5 rounded-2xl border border-green-200">
                                            <p className="font-bold text-gray-800">Type</p>
                                            <p className="text-gray-600">Upland & Lowland</p>
                                        </div>
                                        <div className="bg-green-50/80 p-5 rounded-2xl border border-green-200">
                                            <p className="font-bold text-gray-800">Status</p>
                                            <p className="text-green-700 font-bold">WINNER</p>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-gradient-to-r from-[#00A86B]/20 to-[#4CAF50]/20 rounded-3xl border-4 border-[#00A86B]/50">
                                        <p className="text-2xl font-bold text-center text-[#00853E] flex items-center justify-center gap-4">
                                            <Trophy className="w-10 h-10" />
                                            Dominant Across All Performance Metrics
                                            <Trophy className="w-10 h-10" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Challenger: FARO-44 */}
                        <motion.div
                            initial={{ x: 150, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 border-2 border-gray-300 shadow-xl"
                        >
                            <div className="relative overflow-hidden rounded-3xl mb-8">
                                <img
                                    src="https://images.unsplash.com/photo-1536304929831-7438f940a270?w=1000"
                                    alt="FARO-44 rice field"
                                    className="w-full h-80 object-cover shadow-lg opacity-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-800/50 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl">
                                        <p className="text-xl font-bold text-gray-700">
                                            Baseline Check Variety
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-5xl font-bold text-gray-700 mb-8 text-center">FARO-44</h2>

                            <div className="grid grid-cols-2 gap-6 text-lg text-gray-600">
                                <div className="bg-gray-50 p-5 rounded-2xl">
                                    <p className="font-bold">Breeder</p>
                                    <p>NCRI Badeggi</p>
                                </div>
                                <div className="bg-gray-50 p-5 rounded-2xl">
                                    <p className="font-bold">Released</p>
                                    <p>2009</p>
                                </div>
                                <div className="bg-gray-50 p-5 rounded-2xl">
                                    <p className="font-bold">Type</p>
                                    <p>Upland</p>
                                </div>
                                <div className="bg-gray-50 p-5 rounded-2xl">
                                    <p className="font-bold">Status</p>
                                    <p className="text-gray-500">Standard Check</p>
                                </div>
                            </div>

                            <div className="mt-8 p-8 bg-gray-100 rounded-3xl border-2 border-gray-300">
                                <p className="text-center text-gray-600 text-lg">
                                    <Target className="w-8 h-8 inline mr-2" />
                                    Reliable baseline for scientific comparison
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Performance Advantage Engine */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mb-24"
                    >
                        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-16 shadow-2xl border border-gray-200">
                            <div className="text-center mb-16">
                                <motion.div
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    className="inline-block mb-6 px-12 py-5 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full border-4 border-green-300/50 shadow-xl"
                                >
                                    <p className="text-xl font-bold text-green-800 tracking-wider uppercase flex items-center gap-4 justify-center">
                                        <Target className="w-8 h-8" />
                                        Six Critical Performance Dimensions
                                        <Target className="w-8 h-8" />
                                    </p>
                                </motion.div>
                                <h3 className="text-5xl font-black text-[#00853E] mb-4">
                                    Performance Advantage Engine
                                </h3>
                                <p className="text-xl text-gray-700 max-w-4xl mx-auto">
                                    Hover over each metric to see real-world impact on yield, cost, and farmer income
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                                {comparisonMetrics.map((metric, index) => (
                                    <MetricRing key={metric.name} metric={metric} index={index} />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Growth Timeline */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="mb-24"
                    >
                        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-12 shadow-2xl border border-gray-200">
                            <div className="text-center mb-12">
                                <h3 className="text-5xl font-black text-[#00853E] mb-4">
                                    Growth Performance Timeline
                                </h3>
                                <p className="text-xl text-gray-700">
                                    Biomass accumulation and canopy development throughout the season
                                </p>
                            </div>
                            <ResponsiveContainer width="100%" height={500}>
                                <LineChart data={growthTimeline}>
                                    <defs>
                                        <linearGradient id="faro66Fill" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00A86B" stopOpacity={0.4}/>
                                            <stop offset="95%" stopColor="#00A86B" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="faro44Fill" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" />
                                    <XAxis dataKey="week" tick={{ fill: '#374151', fontSize: 16 }} stroke="#9CA3AF" />
                                    <YAxis tick={{ fill: '#374151', fontSize: 16 }} stroke="#9CA3AF" label={{ value: 'Growth Index (%)', angle: -90, position: 'insideLeft', style: { fill: '#374151', fontSize: 18, fontWeight: 'bold' } }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(255,255,255,0.98)', borderRadius: '16px', border: '3px solid #00853E', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
                                        labelStyle={{ color: '#00853E', fontWeight: 'bold', fontSize: 18 }}
                                    />
                                    <Legend wrapperStyle={{ paddingTop: 30 }} iconType="line" />
                                    <Line
                                        type="monotone"
                                        dataKey="faro66"
                                        name="FARO-66 (Champion)"
                                        stroke="#00A86B"
                                        strokeWidth={6}
                                        dot={{ fill: '#00A86B', r: 8, strokeWidth: 3, stroke: '#fff' }}
                                        activeDot={{ r: 12, stroke: '#00853E', strokeWidth: 4 }}
                                        fill="url(#faro66Fill)"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="faro44"
                                        name="FARO-44"
                                        stroke="#9CA3AF"
                                        strokeWidth={4}
                                        dot={{ fill: '#9CA3AF', r: 6 }}
                                        strokeDasharray="8 8"
                                        fill="url(#faro44Fill)"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                            <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-8 text-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-[#00A86B] rounded-full" />
                                    <span className="text-gray-700">FARO-66 shows <strong className="text-[#00853E]">13% faster</strong> early vigor</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-gray-400 rounded-full" />
                                    <span className="text-gray-700">FARO-44 baseline growth pattern</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* State-by-State Yield Dominance */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        className="mb-24"
                    >
                        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-12 shadow-2xl border border-gray-200">
                            <div className="text-center mb-12">
                                <h3 className="text-5xl font-black text-[#00853E] mb-4">
                                    Yield Dominance Across Nigeria
                                </h3>
                                <p className="text-xl text-gray-700">
                                    Consistent superiority in all major rice-growing states
                                </p>
                            </div>
                            <ResponsiveContainer width="100%" height={550}>
                                <BarChart data={stateYieldData}>
                                    <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" />
                                    <XAxis dataKey="state" tick={{ fill: '#374151', fontSize: 16 }} stroke="#9CA3AF" angle={-45} textAnchor="end" height={100} />
                                    <YAxis tick={{ fill: '#374151', fontSize: 16 }} stroke="#9CA3AF" label={{ value: 'Yield (tons/ha)', angle: -90, position: 'insideLeft', style: { fill: '#374151', fontSize: 18, fontWeight: 'bold' } }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(255,255,255,0.98)', borderRadius: '16px', border: '3px solid #00853E', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
                                        labelStyle={{ color: '#00853E', fontWeight: 'bold', fontSize: 18 }}
                                    />
                                    <Legend wrapperStyle={{ paddingTop: 30 }} iconType="rect" />
                                    <Bar dataKey="faro66" name="FARO-66 (Champion)" fill="#00A86B" radius={[12, 12, 0, 0]} />
                                    <Bar dataKey="faro44" name="FARO-44" fill="#9CA3AF" radius={[12, 12, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                            <div className="mt-10 text-center">
                                <p className="text-2xl text-gray-800">
                                    FARO-66 delivers an average <strong className="text-[#00853E]">42% higher yield</strong> across all 12 states
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Final AI Verdict */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.4 }}
                        className="mb-24"
                    >
                        <div className="relative bg-gradient-to-br from-[#00853E]/15 via-[#00A86B]/15 to-[#4CAF50]/15 backdrop-blur-2xl rounded-3xl p-16 shadow-2xl border-4 border-[#00A86B]/50">
                            <motion.div
                                className="absolute inset-0 rounded-3xl opacity-40"
                                animate={{ boxShadow: ['0 0 60px rgba(0,168,107,0.4)', '0 0 120px rgba(0,168,107,0.7)', '0 0 60px rgba(0,168,107,0.4)'] }}
                                transition={{ duration: 5, repeat: Infinity }}
                            />
                            <div className="relative z-10">
                                <div className="flex items-center gap-6 mb-10 justify-center">
                                    <div className="p-6 bg-gradient-to-br from-[#00853E] to-[#00A86B] rounded-3xl shadow-2xl">
                                        <Sparkles className="w-16 h-16 text-white" />
                                    </div>
                                    <h3 className="text-6xl font-black text-[#00853E]">AI-Powered Final Verdict</h3>
                                </div>

                                <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl">
                                    <div className="text-center space-y-8">
                                        <p className="text-3xl leading-relaxed text-gray-800">
                                            <strong className="text-[#00853E]">FARO-66 is the unequivocal champion</strong> based on rigorous analysis of <strong>1,284 multi-location trials</strong> across Nigeria.
                                        </p>
                                        <p className="text-2xl leading-relaxed text-gray-800">
                                            It delivers <strong className="text-[#00853E]">superior performance in every dimension</strong>: higher yield, better drought tolerance, stronger disease resistance, earlier maturity, premium grain quality, and overwhelming farmer preference.
                                        </p>
                                        <p className="text-2xl leading-relaxed text-gray-800">
                                            This is not just another variety — this is the <strong className="text-[#00853E]">future of Nigerian rice production</strong>.
                                        </p>
                                    </div>

                                    <div className="mt-12 flex items-center justify-center gap-8 pt-10 border-t-4 border-[#00A86B]/30">
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-20 bg-gradient-to-br from-[#00853E] to-[#00A86B] rounded-full flex items-center justify-center text-white text-3xl font-black shadow-2xl">
                                                AI
                                            </div>
                                            <div className="text-left">
                                                <p className="text-2xl font-bold text-[#00853E]">IFT-DMS Intelligence Engine</p>
                                                <p className="text-lg text-gray-700">Confidence: <strong className="text-[#00A86B]">98.7%</strong></p>
                                            </div>
                                        </div>
                                        <motion.div
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <CheckCircle2 className="w-20 h-20 text-[#00A86B]" />
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Download Report CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6 }}
                        className="text-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 40px 100px rgba(0,133,62,0.5)' }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-8 bg-gradient-to-r from-[#00853E] to-[#00A86B] text-white px-20 py-10 rounded-3xl text-3xl font-black shadow-2xl transition-all"
                            onClick={() => alert('Downloading comprehensive 47-page technical report...')}
                        >
                            <Download className="w-12 h-12" />
                            Download Full Head-to-Head Report
                        </motion.button>
                        <p className="text-xl text-gray-700 mt-8 max-w-4xl mx-auto">
                            Complete technical analysis • Full methodology • Regional performance data • Economic impact assessment • Adoption recommendations
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HeadToHeadComparisonPage;