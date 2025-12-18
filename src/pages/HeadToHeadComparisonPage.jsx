import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Trophy, TrendingUp, Droplets, Shield, Clock, Star, Download, Sparkles, CheckCircle2 } from 'lucide-react';
// Assuming these are imported
// import { Navbar, PageHeader, Button, AnimatedPage, FloatingChatButton } from '@/components';

const HeadToHeadComparisonPage = () => {
    const [ringsAnimated, setRingsAnimated] = useState(false);
    const [confettiActive, setConfettiActive] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setRingsAnimated(true);
            setConfettiActive(true);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const comparisonMetrics = [
        {
            name: 'Yield Advantage',
            value: 42,
            icon: TrendingUp,
            color: '#00A86B',
            unit: '%',
            description: 'Higher yield per hectare'
        },
        {
            name: 'Drought Tolerance',
            value: 38,
            icon: Droplets,
            color: '#4CAF50',
            unit: '%',
            description: 'Better water efficiency'
        },
        {
            name: 'Disease Resistance',
            value: 51,
            icon: Shield,
            color: '#00853E',
            unit: '%',
            description: 'Reduced pest damage'
        },
        {
            name: 'Days to Maturity',
            value: 12,
            icon: Clock,
            color: '#00A86B',
            unit: ' days',
            prefix: '-',
            description: 'Faster harvest cycle'
        },
        {
            name: 'Grain Quality',
            value: 29,
            icon: Star,
            color: '#4CAF50',
            unit: '%',
            description: 'Superior grain grade'
        },
        {
            name: 'Farmer Preference',
            value: 94,
            icon: CheckCircle2,
            color: '#00853E',
            unit: '%',
            description: 'Would plant again'
        }
    ];

    const stateYieldData = [
        { state: 'Kaduna', faro66: 6.8, faro44: 4.2 },
        { state: 'Niger', faro66: 7.2, faro44: 4.8 },
        { state: 'Kebbi', faro66: 6.5, faro44: 4.5 },
        { state: 'Kano', faro66: 6.9, faro44: 4.3 },
        { state: 'Benue', faro66: 7.5, faro44: 5.1 },
        { state: 'Taraba', faro66: 7.1, faro44: 4.9 },
        { state: 'Adamawa', faro66: 6.7, faro44: 4.4 },
        { state: 'Ebonyi', faro66: 7.8, faro44: 5.3 },
        { state: 'Cross River', faro66: 7.3, faro44: 5.0 },
        { state: 'Nasarawa', faro66: 6.6, faro44: 4.6 },
        { state: 'Plateau', faro66: 6.4, faro44: 4.1 },
        { state: 'Ogun', faro66: 7.0, faro44: 4.7 }
    ];

    const Confetti = () => (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(50)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                        background: i % 3 === 0 ? '#00A86B' : i % 3 === 1 ? '#FFD700' : '#4CAF50',
                        left: `${Math.random() * 100}%`,
                        top: '-10px'
                    }}
                    initial={{ y: -20, opacity: 1, rotate: 0 }}
                    animate={{
                        y: 600,
                        opacity: 0,
                        rotate: 360,
                        transition: {
                            duration: 2 + Math.random() * 2,
                            delay: Math.random() * 0.5,
                            ease: 'easeIn'
                        }
                    }}
                />
            ))}
        </div>
    );

    const MetricRing = ({ metric, index }) => {
        const radius = 70;
        const circumference = 2 * Math.PI * radius;
        const percentage = metric.value > 100 ? 100 : metric.value;
        const offset = ringsAnimated ? circumference - (percentage / 100) * circumference : circumference;
        const Icon = metric.icon;

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.15, duration: 0.5, type: 'spring' }}
                className="flex flex-col items-center"
            >
                <div className="relative">
                    <svg width="160" height="160" className="transform -rotate-90">
                        <circle
                            cx="80"
                            cy="80"
                            r={radius}
                            stroke="#E0E0E0"
                            strokeWidth="12"
                            fill="none"
                        />
                        <motion.circle
                            cx="80"
                            cy="80"
                            r={radius}
                            stroke={metric.color}
                            strokeWidth="12"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: offset }}
                            transition={{ delay: 1 + index * 0.15, duration: 1.5, ease: 'easeOut' }}
                            style={{
                                filter: `drop-shadow(0 0 8px ${metric.color})`
                            }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Icon className="w-8 h-8 mb-1" style={{ color: metric.color }} />
                        <motion.div
                            className="text-3xl font-bold"
                            style={{ color: metric.color }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 + index * 0.15 }}
                        >
                            {metric.prefix || '+'}{metric.value}{metric.unit}
                        </motion.div>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <div className="font-semibold text-gray-800">{metric.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{metric.description}</div>
                </div>
            </motion.div>
        );
    };

    return (
        <>
            <Navbar />
            <AnimatedPage>
                {/* Dramatic Black Fade Overlay */}
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="fixed inset-0 bg-black z-50 pointer-events-none"
                />

                {/* Background with Rice Field */}
                <div className="fixed inset-0 z-0">
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: 'ur[](https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1920)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#F8FFF9] via-transparent to-[#F8FFF9]" />

                    {/* Floating Leaves Particles */}
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-4xl opacity-20"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`
                            }}
                            animate={{
                                y: [0, -30, 0],
                                x: [0, 15, 0],
                                rotate: [0, 10, -10, 0]
                            }}
                            transition={{
                                duration: 8 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 5
                            }}
                        >
                            🌾
                        </motion.div>
                    ))}
                </div>

                <div className="relative z-10 min-h-screen pt-24 pb-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        {/* Epic Hero Title */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, type: 'spring' }}
                            className="text-center mb-16"
                        >
                            <motion.h1
                                className="text-6xl md:text-7xl font-bold mb-4"
                                style={{
                                    fontFamily: 'Poppins, sans-serif',
                                    color: '#00853E',
                                    textShadow: '0 0 40px rgba(0, 133, 62, 0.5), 0 0 80px rgba(0, 133, 62, 0.3)'
                                }}
                                animate={{
                                    textShadow: [
                                        '0 0 40px rgba(0, 133, 62, 0.5)',
                                        '0 0 60px rgba(0, 133, 62, 0.7)',
                                        '0 0 40px rgba(0, 133, 62, 0.5)'
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                Head-to-Head Variety Comparison
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-xl text-gray-600"
                            >
                                Data-Driven Excellence • 1,284 Multi-Location Trials • AI-Verified Results
                            </motion.p>
                        </motion.div>

                        {/* Two Variety Cards Side-by-Side */}
                        <div className="grid md:grid-cols-2 gap-8 mb-16">
                            {/* FARO-66 - Winner Card */}
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="relative"
                            >
                                {confettiActive && <Confetti />}

                                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border-4 border-[#00A86B] shadow-2xl overflow-hidden">
                                    {/* Glowing Border Effect */}
                                    <div className="absolute inset-0 rounded-3xl opacity-50 animate-pulse"
                                         style={{
                                             boxShadow: '0 0 60px rgba(0, 168, 107, 0.6), inset 0 0 60px rgba(0, 168, 107, 0.2)'
                                         }}
                                    />

                                    {/* Winner Badge */}
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
                                        className="absolute -top-4 -right-4 z-10"
                                    >
                                        <div className="bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full p-4 shadow-2xl border-4 border-white">
                                            <Trophy className="w-12 h-12 text-white" />
                                        </div>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                            className="absolute inset-0 rounded-full"
                                            style={{
                                                boxShadow: '0 0 40px rgba(255, 215, 0, 0.8)'
                                            }}
                                        />
                                    </motion.div>

                                    <div className="relative z-10">
                                        <img
                                            src="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600"
                                            alt="FARO-66 Rice"
                                            className="w-full h-64 object-cover rounded-2xl mb-6 shadow-lg"
                                        />
                                        <div className="flex items-center gap-3 mb-3">
                                            <Sparkles className="w-6 h-6 text-[#FFD700]" />
                                            <h2 className="text-4xl font-bold text-[#00853E]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                FARO-66
                                            </h2>
                                        </div>
                                        <div className="space-y-2 text-gray-700">
                                            <p className="flex items-center gap-2">
                                                <span className="font-semibold">Breeder:</span> NCRI Badeggi
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <span className="font-semibold">Released:</span> 2023
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <span className="font-semibold">Type:</span> Upland/Lowland
                                            </p>
                                            <div className="mt-4 p-4 bg-gradient-to-r from-[#00A86B]/20 to-[#4CAF50]/20 rounded-xl">
                                                <p className="text-sm font-semibold text-[#00853E]">
                                                    ⭐ Superior Performance Across All Metrics
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* FARO-44 Card */}
                            <motion.div
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="relative"
                            >
                                <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 border-2 border-gray-300 shadow-xl">
                                    <div className="relative z-10">
                                        <img
                                            src="https://images.unsplash.com/photo-1536304929831-7438f940a270?w=600"
                                            alt="FARO-44 Rice"
                                            className="w-full h-56 object-cover rounded-2xl mb-6 shadow-md opacity-90"
                                        />
                                        <h2 className="text-3xl font-bold text-gray-700 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                            FARO-44
                                        </h2>
                                        <div className="space-y-2 text-gray-600">
                                            <p className="flex items-center gap-2">
                                                <span className="font-semibold">Breeder:</span> NCRI Badeggi
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <span className="font-semibold">Released:</span> 2009
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <span className="font-semibold">Type:</span> Upland
                                            </p>
                                            <div className="mt-4 p-4 bg-gray-100 rounded-xl">
                                                <p className="text-sm text-gray-600">
                                                    Standard variety for comparison
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Comparison Engine - Metric Rings */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="mb-16"
                        >
                            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-gray-200/50">
                                <h3 className="text-3xl font-bold text-center mb-12 text-[#00853E]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Performance Comparison Engine
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                                    {comparisonMetrics.map((metric, index) => (
                                        <MetricRing key={metric.name} metric={metric} index={index} />
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* State-by-State Yield Chart */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            className="mb-16"
                        >
                            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-gray-200/50">
                                <h3 className="text-3xl font-bold text-center mb-8 text-[#00853E]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    State-by-State Yield Performance (t/ha)
                                </h3>
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={stateYieldData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                                        <XAxis
                                            dataKey="state"
                                            tick={{ fill: '#666', fontSize: 12 }}
                                            angle={-45}
                                            textAnchor="end"
                                            height={100}
                                        />
                                        <YAxis tick={{ fill: '#666' }} label={{ value: 'Yield (t/ha)', angle: -90, position: 'insideLeft' }} />
                                        <Tooltip
                                            contentStyle={{
                                                background: 'rgba(255, 255, 255, 0.95)',
                                                borderRadius: '12px',
                                                border: '2px solid #00853E',
                                                padding: '12px'
                                            }}
                                        />
                                        <Legend />
                                        <Bar dataKey="faro66" name="FARO-66" fill="#00A86B" radius={[8, 8, 0, 0]} />
                                        <Bar dataKey="faro44" name="FARO-44" fill="#CCCCCC" radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                                <p className="text-center text-gray-600 mt-4 text-sm">
                                    FARO-66 demonstrates consistent superiority across all 12 major rice-producing states
                                </p>
                            </div>
                        </motion.div>

                        {/* AI Summary Box */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.4, duration: 0.8 }}
                            className="mb-12"
                        >
                            <div className="relative bg-gradient-to-br from-[#00853E]/10 via-[#4CAF50]/10 to-[#00A86B]/10 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border-2 border-[#00A86B] overflow-hidden">
                                {/* Animated Glow */}
                                <motion.div
                                    className="absolute inset-0 rounded-3xl opacity-30"
                                    animate={{
                                        boxShadow: [
                                            '0 0 40px rgba(0, 168, 107, 0.4)',
                                            '0 0 80px rgba(0, 168, 107, 0.6)',
                                            '0 0 40px rgba(0, 168, 107, 0.4)'
                                        ]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-gradient-to-br from-[#00A86B] to-[#4CAF50] rounded-2xl shadow-lg">
                                            <Sparkles className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-[#00853E]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                            AI-Powered Insight
                                        </h3>
                                    </div>

                                    <div className="bg-white/70 rounded-2xl p-8 mb-6">
                                        <p className="text-lg leading-relaxed text-gray-800 mb-4">
                                            <strong className="text-[#00853E]">FARO-66 consistently outperforms FARO-44 across all agro-ecological zones</strong> with a remarkable 42% higher average yield and superior drought tolerance characteristics. The variety demonstrates exceptional resilience in both upland and lowland ecosystems, with significantly reduced days to maturity enabling multiple cropping cycles per annum.
                                        </p>
                                        <p className="text-lg leading-relaxed text-gray-800">
                                            Field trial data from 1,284 multi-location sites across 12 states reveals consistent superiority in grain quality, disease resistance, and farmer acceptability metrics. <strong className="text-[#00853E]">Recommended for nationwide release in 2026 wet season</strong> with priority deployment in Kaduna, Niger, Kebbi, Benue, and Ebonyi states.
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-[#00853E]/20 pt-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-[#00853E] to-[#00A86B] rounded-full flex items-center justify-center shadow-lg">
                                                <span className="text-white font-bold text-lg">AI</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-[#00853E]">IFT-DMS AI Engine</p>
                                                <p className="text-sm text-gray-600">Verified from 1,284 multi-location trials</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-[#00A86B]">
                                            <CheckCircle2 className="w-5 h-5" />
                                            <span className="font-semibold">Confidence: 98.7%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Download Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.6, duration: 0.8 }}
                            className="text-center"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(0, 133, 62, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-4 bg-gradient-to-r from-[#00853E] to-[#00A86B] text-white px-12 py-6 rounded-2xl text-xl font-bold shadow-2xl transition-all"
                                onClick={() => alert('Downloading full H2H report...')}
                            >
                                <Download className="w-8 h-8" />
                                Download Full H2H Report (PDF)
                            </motion.button>
                            <p className="text-gray-600 mt-4">
                                Complete 47-page technical report with trial data, methodology, and recommendations
                            </p>
                        </motion.div>
                    </div>
                </div>

                <FloatingChatButton tooltip="Ask AI why FARO-66 won" />
            </AnimatedPage>
        </>
    );
};

export default HeadToHeadComparisonPage;