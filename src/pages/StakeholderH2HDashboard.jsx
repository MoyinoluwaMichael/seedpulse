import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import {

    BarChart3,

    TrendingUp,

    MapPin,

    Database,

    Search,

    Zap,

    Award,

    Users,

    Leaf,

    ChevronDown,

    ArrowRight,

    Sparkles,

    CheckCircle,

    Target,

    Activity

} from 'lucide-react';

// Assuming these

// import {

//     Navbar,

//     MobileBottomNav,

//     PageHeader,

//     Button,

//     AnimatedPage,

//     FloatingChatButton

// } from '@/components';

const StakeholderH2HDashboard = () => {

    const [varietyA, setVarietyA] = useState('');

    const [varietyB, setVarietyB] = useState('');

    const [trialsCount, setTrialsCount] = useState(0);

    const [dataPoints, setDataPoints] = useState(0);

    // Animated counter effect

    useEffect(() => {

        const trialsInterval = setInterval(() => {

            setTrialsCount(prev => prev < 1284 ? prev + 23 : 1284);

        }, 30);

        const dataInterval = setInterval(() => {

            setDataPoints(prev => prev < 4800000 ? prev + 85000 : 4800000);

        }, 30);

        return () => {

            clearInterval(trialsInterval);

            clearInterval(dataInterval);

        };

    }, []);

    const varieties = [

        { id: 'faro-66', name: 'FARO-66', type: 'Rice' },

        { id: 'faro-44', name: 'FARO-44', type: 'Rice' },

        { id: 'faro-52', name: 'FARO-52', type: 'Rice' },

        { id: 'nerica-l-19', name: 'NERICA-L-19', type: 'Rice' },

        { id: 'nerica-l-20', name: 'NERICA-L-20', type: 'Rice' },

        { id: 'sammaz-27', name: 'SAMMAZ-27', type: 'Maize' },

        { id: 'sammaz-55', name: 'SAMMAZ-55', type: 'Maize' },

        { id: 'oba-super-2', name: 'Oba Super 2', type: 'Maize' },

        { id: 'sampea-20', name: 'SAMPEA-20', type: 'Cowpea' },

        { id: 'dan-ila', name: 'Dan Ila', type: 'Cowpea' }

    ];

    const stats = [

        {

            label: 'Total Trials Completed',

            value: trialsCount.toLocaleString(),

            icon: BarChart3,

            color: 'from-emerald-500 to-green-600',

            glow: 'emerald'

        },

        {

            label: 'Varieties Compared',

            value: '87',

            icon: Leaf,

            color: 'from-green-500 to-teal-600',

            glow: 'green'

        },

        {

            label: 'States Covered',

            value: '23',

            icon: MapPin,

            color: 'from-teal-500 to-cyan-600',

            glow: 'teal'

        },

        {

            label: 'Data Points Collected',

            value: `${(dataPoints / 1000000).toFixed(1)}M`,

            icon: Database,

            color: 'from-cyan-500 to-blue-600',

            glow: 'cyan'

        }

    ];

    const partners = [

        { name: 'FSSS', fullName: 'Federal Seed Service System' },

        { name: 'NASC', fullName: 'National Agricultural Seeds Council' },

        { name: 'IITA', fullName: 'International Institute of Tropical Agriculture' },

        { name: 'AfricaRice', fullName: 'Africa Rice Center' },

        { name: 'WACCI', fullName: 'West Africa Centre for Crop Improvement' }

    ];

    // Floating particles animation

    const particleVariants = {

        animate: (i) => ({

            y: [0, -30, 0],

            x: [0, Math.sin(i) * 20, 0],

            opacity: [0.3, 0.6, 0.3],

            transition: {

                duration: 4 + i * 0.5,

                repeat: Infinity,

                ease: "easeInOut"

            }

        })

    };

    return (

        <AnimatedPage>

            <div className="min-h-screen bg-[#0A2F1A] relative overflow-hidden">

                <Navbar />

                {/* Hero Background with Overlay */}

                <div className="fixed inset-0 z-0">

                    <div

                        className="absolute inset-0 bg-cover bg-center"

                        style={{

                            backgroundImage: 'ur[](https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1920&h=1080&fit=crop)',

                        }}

                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-[#061C12]/95 via-[#0A2F1A]/90 to-[#061C12]/95" />

                    {/* Grain Texture Overlay */}

                    <div

                        className="absolute inset-0 opacity-20"

                        style={{

                            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',

                        }}

                    />

                    {/* Animated Floating Leaves */}

                    {[...Array(15)].map((_, i) => (

                        <motion.div

                            key={i}

                            custom={i}

                            variants={particleVariants}

                            animate="animate"

                            className="absolute"

                            style={{

                                left: `${Math.random() * 100}%`,

                                top: `${Math.random() * 100}%`,

                            }}

                        >

                            <Leaf

                                className="text-green-400/30"

                                size={20 + Math.random() * 20}

                                style={{ transform: `rotate(${Math.random() * 360}deg)` }}

                            />

                        </motion.div>

                    ))}

                </div>

                {/* Main Content */}

                <div className="relative z-10 pt-20 pb-20">

                    {/* Hero Section */}

                    <motion.div

                        initial={{ opacity: 0, y: 50 }}

                        animate={{ opacity: 1, y: 0 }}

                        transition={{ duration: 1, ease: "easeOut" }}

                        className="text-center px-4 py-20 max-w-6xl mx-auto"

                    >

                        {/* Badge */}

                        <motion.div

                            initial={{ opacity: 0, scale: 0.8 }}

                            animate={{ opacity: 1, scale: 1 }}

                            transition={{ delay: 0.3, duration: 0.6 }}

                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00853E]/20 backdrop-blur-xl border border-[#00A86B]/30 rounded-full mb-8"

                        >

                            <Sparkles className="w-5 h-5 text-[#4CAF50]" />

                            <span className="text-[#4CAF50] font-semibold text-sm">Powered by Real Field Data</span>

                        </motion.div>

                        {/* Main Title */}

                        <motion.h1

                            initial={{ opacity: 0, y: 30 }}

                            animate={{ opacity: 1, y: 0 }}

                            transition={{ delay: 0.5, duration: 0.8 }}

                            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-['Poppins'] leading-tight"

                        >

              <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">

                Head-to-Head (H2H)

              </span>

                            <br />

                            <span className="text-white">

                Crop Variety Analytics

              </span>

                        </motion.h1>

                        {/* Subtitle */}

                        <motion.p

                            initial={{ opacity: 0 }}

                            animate={{ opacity: 1 }}

                            transition={{ delay: 0.8, duration: 0.8 }}

                            className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-12"

                        >

                            Real-time, verified field trial results across Nigeria

                        </motion.p>

                        {/* Animated Divider */}

                        <motion.div

                            initial={{ scaleX: 0 }}

                            animate={{ scaleX: 1 }}

                            transition={{ delay: 1, duration: 1 }}

                            className="h-1 w-20 bg-gradient-to-r from-transparent via-[#00A86B] to-transparent mx-auto"

                        />

                    </motion.div>

                    {/* Stats Cards */}

                    <div className="max-w-7xl mx-auto px-4 mb-20">

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                            {stats.map((stat, index) => {

                                const Icon = stat.icon;

                                return (

                                    <motion.div

                                        key={stat.label}

                                        initial={{ opacity: 0, y: 50, scale: 0.9 }}

                                        animate={{ opacity: 1, y: 0, scale: 1 }}

                                        transition={{

                                            delay: 1.2 + index * 0.15,

                                            duration: 0.6,

                                            type: "spring",

                                            stiffness: 100

                                        }}

                                        whileHover={{ y: -10, scale: 1.05, transition: { duration: 0.3 } }}

                                        className="relative group"

                                    >

                                        {/* Glow Effect */}

                                        <motion.div

                                            animate={{

                                                opacity: [0.5, 0.8, 0.5],

                                                scale: [1, 1.05, 1]

                                            }}

                                            transition={{

                                                duration: 3,

                                                repeat: Infinity,

                                                ease: "easeInOut"

                                            }}

                                            className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-20 blur-2xl rounded-3xl`}

                                        />

                                        {/* Card */}

                                        <div className="relative bg-[#F8FFF9]/10 backdrop-blur-xl border-2 border-[#00A86B]/30 rounded-3xl p-8 shadow-2xl">

                                            {/* Icon */}

                                            <motion.div

                                                whileHover={{ rotate: 360 }}

                                                transition={{ duration: 0.6 }}

                                                className={`inline-flex p-4 bg-gradient-to-br ${stat.color} rounded-2xl mb-4 shadow-lg`}

                                            >

                                                <Icon className="w-8 h-8 text-white" />

                                            </motion.div>

                                            {/* Value */}

                                            <motion.div

                                                initial={{ scale: 0 }}

                                                animate={{ scale: 1 }}

                                                transition={{ delay: 1.4 + index * 0.15, type: "spring" }}

                                                className="text-5xl font-bold text-white mb-2 font-['Poppins']"

                                            >

                                                {stat.value}

                                            </motion.div>

                                            {/* Label */}

                                            <div className="text-green-200 font-medium">

                                                {stat.label}

                                            </div>

                                            {/* Shimmer Effect on Hover */}

                                            <motion.div

                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"

                                                initial={{ x: '-100%' }}

                                                whileHover={{ x: '100%' }}

                                                transition={{ duration: 0.6 }}

                                            />

                                        </div>

                                    </motion.div>

                                );

                            })}

                        </div>

                    </div>

                    {/* Compare Section */}

                    <motion.div

                        initial={{ opacity: 0, y: 50 }}

                        animate={{ opacity: 1, y: 0 }}

                        transition={{ delay: 1.8, duration: 0.8 }}

                        className="max-w-6xl mx-auto px-4 mb-20"

                    >

                        {/* Section Title */}

                        <div className="text-center mb-12">

                            <motion.div

                                initial={{ scale: 0 }}

                                animate={{ scale: 1 }}

                                transition={{ delay: 2, type: "spring" }}

                                className="inline-flex items-center gap-3 px-6 py-3 bg-[#00853E]/30 backdrop-blur-xl border border-[#00A86B]/50 rounded-full mb-6"

                            >

                                <Zap className="w-6 h-6 text-yellow-400" />

                                <span className="text-white font-bold text-lg">Start Comparing Now</span>

                            </motion.div>

                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Poppins']">

                                Compare Any Two Varieties

                            </h2>

                            <p className="text-green-200 text-lg">

                                See side-by-side performance data from real Nigerian farms

                            </p>

                        </div>

                        {/* Comparison Card */}

                        <div className="bg-[#F8FFF9]/10 backdrop-blur-2xl border-2 border-[#00A86B]/40 rounded-3xl p-8 md:p-12 shadow-2xl">

                            <div className="grid md:grid-cols-3 gap-6 items-center">

                                {/* Variety A Selector */}

                                <motion.div

                                    initial={{ opacity: 0, x: -50 }}

                                    animate={{ opacity: 1, x: 0 }}

                                    transition={{ delay: 2.2, duration: 0.6 }}

                                    className="relative"

                                >

                                    <label className="block text-green-200 font-semibold mb-3 text-sm uppercase tracking-wide">

                                        Variety A

                                    </label>

                                    <div className="relative">

                                        <select

                                            value={varietyA}

                                            onChange={(e) => setVarietyA(e.target.value)}

                                            className="w-full px-6 py-5 bg-white/10 backdrop-blur-sm border-2 border-[#00A86B]/50 rounded-2xl text-white font-bold text-lg focus:border-[#4CAF50] focus:ring-4 focus:ring-[#00A86B]/30 outline-none transition-all appearance-none cursor-pointer"

                                        >

                                            <option value="" className="bg-[#0A2F1A] text-white">Select Variety A</option>

                                            {varieties.map(variety => (

                                                <option key={variety.id} value={variety.id} className="bg-[#0A2F1A] text-white">

                                                    {variety.name} ({variety.type})

                                                </option>

                                            ))}

                                        </select>

                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-green-300 pointer-events-none" />

                                    </div>

                                </motion.div>

                                {/* VS Button */}

                                <motion.div

                                    initial={{ opacity: 0, scale: 0 }}

                                    animate={{ opacity: 1, scale: 1 }}

                                    transition={{ delay: 2.4, type: "spring", stiffness: 200 }}

                                    className="flex items-center justify-center"

                                >

                                    <motion.button

                                        whileHover={{ scale: 1.1, rotate: 180 }}

                                        whileTap={{ scale: 0.9 }}

                                        animate={{

                                            boxShadow: [

                                                '0 0 20px rgba(76, 175, 80, 0.5)',

                                                '0 0 40px rgba(76, 175, 80, 0.8)',

                                                '0 0 20px rgba(76, 175, 80, 0.5)'

                                            ]

                                        }}

                                        transition={{

                                            boxShadow: { duration: 2, repeat: Infinity },

                                            scale: { duration: 0.3 },

                                            rotate: { duration: 0.6 }

                                        }}

                                        className="w-20 h-20 bg-gradient-to-br from-[#00853E] to-[#00A86B] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-2xl border-4 border-white/20"

                                    >

                                        VS

                                    </motion.button>

                                </motion.div>

                                {/* Variety B Selector */}

                                <motion.div

                                    initial={{ opacity: 0, x: 50 }}

                                    animate={{ opacity: 1, x: 0 }}

                                    transition={{ delay: 2.2, duration: 0.6 }}

                                    className="relative"

                                >

                                    <label className="block text-green-200 font-semibold mb-3 text-sm uppercase tracking-wide">

                                        Variety B

                                    </label>

                                    <div className="relative">

                                        <select

                                            value={varietyB}

                                            onChange={(e) => setVarietyB(e.target.value)}

                                            className="w-full px-6 py-5 bg-white/10 backdrop-blur-sm border-2 border-[#00A86B]/50 rounded-2xl text-white font-bold text-lg focus:border-[#4CAF50] focus:ring-4 focus:ring-[#00A86B]/30 outline-none transition-all appearance-none cursor-pointer"

                                        >

                                            <option value="" className="bg-[#0A2F1A] text-white">Select Variety B</option>

                                            {varieties.map(variety => (

                                                <option key={variety.id} value={variety.id} className="bg-[#0A2F1A] text-white">

                                                    {variety.name} ({variety.type})

                                                </option>

                                            ))}

                                        </select>

                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-green-300 pointer-events-none" />

                                    </div>

                                </motion.div>

                            </div>

                            {/* Compare Button */}

                            <motion.div

                                initial={{ opacity: 0, y: 20 }}

                                animate={{ opacity: 1, y: 0 }}

                                transition={{ delay:  2.6, duration: 0.6 }}
    className="mt-10 text-center"
>

                                <motion.button

                                    whileHover={{ scale: 1.05, y: -5 }}

                                    whileTap={{ scale: 0.95 }}

                                    animate={{

                                        boxShadow: [

                                            '0 10px 40px rgba(0, 133, 62, 0.3)',

                                            '0 10px 60px rgba(0, 168, 107, 0.5)',

                                            '0 10px 40px rgba(0, 133, 62, 0.3)'

                                        ]

                                    }}

                                    transition={{

                                        boxShadow: { duration: 2, repeat: Infinity }

                                    }}

                                    className="relative px-12 py-6 bg-gradient-to-r from-[#00853E] via-[#00A86B] to-[#4CAF50] text-white rounded-2xl font-bold text-xl shadow-2xl overflow-hidden group"

                                    disabled={!varietyA || !varietyB || varietyA === varietyB}

                                    onClick={() => alert(`Comparing ${varietyA} vs ${varietyB}`)}

                                >

                                    {/* Animated Background */}

                                    <motion.div

                                        animate={{

                                            x: ['0%', '100%']

                                        }}

                                        transition={{

                                            duration: 2,

                                            repeat: Infinity,

                                            ease: "linear"

                                        }}

                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"

                                    />

                                    <span className="relative flex items-center gap-3">

                    <Zap className="w-6 h-6" />

                    COMPARE NOW

                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />

                  </span>

                                </motion.button>

                            </motion.div>

                        </div>

                    </motion.div>

                    {/* Preview Charts Section */}

                    <motion.div

                        initial={{ opacity: 0, y: 50 }}

                        animate={{ opacity: 1, y: 0 }}

                        transition={{ delay: 2.8, duration: 0.8 }}

                        className="max-w-7xl mx-auto px-4 mb-20"

                    >

                        <div className="text-center mb-12">

                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-['Poppins']">

                                What You'll Discover

                            </h3>

                            <p className="text-green-200 text-lg">

                                Comprehensive analytics from thousands of field trials

                            </p>

                        </div>

                        <div className="grid md:grid-cols-3 gap-6">

                            {[

                                { title: 'Yield Comparison', icon: BarChart3, color: 'from-green-500 to-emerald-600', desc: 'Side-by-side yield performance across states' },

                                { title: 'Drought Resistance', icon: Target, color: 'from-blue-500 to-cyan-600', desc: 'Multi-factor stress tolerance radar' },

                                { title: 'Farmer Preference', icon: Users, color: 'from-purple-500 to-pink-600', desc: 'Real feedback from 2,000+ farmers' }

                            ].map((chart, index) => {

                                const Icon = chart.icon;

                                return (

                                    <motion.div

                                        key={chart.title}

                                        initial={{ opacity: 0, y: 30 }}

                                        animate={{ opacity: 1, y: 0 }}

                                        transition={{ delay: 3 + index * 0.2, duration: 0.6 }}

                                        whileHover={{ y: -10, scale: 1.03 }}

                                        className="relative group"

                                    >

                                        {/* Glow */}

                                        <div className={`absolute inset-0 bg-gradient-to-br ${chart.color} opacity-20 blur-2xl rounded-3xl group-hover:opacity-30 transition-opacity`} />

                                        {/* Card */}

                                        <div className="relative bg-[#F8FFF9]/10 backdrop-blur-xl border-2 border-[#00A86B]/30 rounded-3xl p-8 h-full">

                                            <div className={`inline-flex p-4 bg-gradient-to-br ${chart.color} rounded-2xl mb-4`}>

                                                <Icon className="w-8 h-8 text-white" />

                                            </div>

                                            <h4 className="text-2xl font-bold text-white mb-3 font-['Poppins']">

                                                {chart.title}

                                            </h4>

                                            <p className="text-green-200 mb-6">

                                                {chart.desc}

                                            </p>

                                            {/* Mock Chart Placeholder */}

                                            <div className="bg-white/5 rounded-xl h-40 flex items-center justify-center border border-white/10">

                                                <Activity className="w-16 h-16 text-green-400/30" />

                                            </div>

                                        </div>

                                    </motion.div>

                                );

                            })}

                        </div>

                    </motion.div>

                    {/* Trusted By Section */}

                    <motion.div

                        initial={{ opacity: 0, y: 50 }}

                        animate={{ opacity: 1, y: 0 }}

                        transition={{ delay: 3.4, duration: 0.8 }}

                        className="max-w-6xl mx-auto px-4 mb-20"

                    >

                        <div className="bg-[#F8FFF9]/5 backdrop-blur-xl border border-[#00A86B]/20 rounded-3xl p-12">

                            <div className="text-center mb-10">

                                <motion.div

                                    animate={{ opacity: [0.5, 1, 0.5] }}

                                    transition={{ duration: 2, repeat: Infinity }}

                                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#00853E]/20 rounded-full mb-4"

                                >

                                    <Award className="w-5 h-5 text-yellow-400" />

                                    <span className="text-green-200 font-semibold">Trusted Partners</span>

                                </motion.div>

                                <h3 className="text-3xl font-bold text-white mb-2 font-['Poppins']">

                                    Backed by Nigeria's Leading Institutions

                                </h3>

                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

                                {partners.map((partner, index) => (

                                    <motion.div

                                        key={partner.name}

                                        initial={{ opacity: 0, scale: 0.8 }}

                                        animate={{ opacity: 1, scale: 1 }}

                                        transition={{ delay: 3.6 + index * 0.1, duration: 0.5 }}

                                        whileHover={{ scale: 1.1, y: -5 }}

                                        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center group hover:bg-white/15 transition-all"

                                    >

                                        <div className="w-16 h-16 bg-gradient-to-br from-[#00853E] to-[#00A86B] rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">

                                            <CheckCircle className="w-8 h-8 text-white" />

                                        </div>

                                        <div className="text-white font-bold text-lg mb-1">{partner.name}</div>

                                        <div className="text-green-300 text-xs">{partner.fullName}</div>

                                    </motion.div>

                                ))}

                            </div>

                        </div>

                    </motion.div>

                    {/* Final CTA */}

                    <motion.div

                        initial={{ opacity: 0, scale: 0.9 }}

                        animate={{ opacity: 1, scale: 1 }}

                        transition={{ delay: 4, duration: 0.8 }}

                        className="max-w-4xl mx-auto px-4 text-center"

                    >

                        <div className="bg-gradient-to-r from-[#00853E] to-[#00A86B] rounded-3xl p-12 shadow-2xl relative overflow-hidden">

                            {/* Animated Background Pattern */}

                            <div className="absolute inset-0 opacity-10">

                                {[...Array(20)].map((_, i) => (

                                    <motion.div

                                        key={i}

                                        animate={{

                                            y: [0, -20, 0],

                                            opacity: [0.3, 0.6, 0.3]

                                        }}

                                        transition={{

                                            duration: 3 + i * 0.2,

                                            repeat: Infinity,

                                            delay: i * 0.1

                                        }}

                                        className="absolute"

                                        style={{

                                            left: `${(i * 5) % 100}%`,

                                            top: `${Math.random() * 100}%`

                                        }}

                                    >

                                        <Leaf className="w-8 h-8 text-white" />

                                    </motion.div>

                                ))}

                            </div>

                            <div className="relative z-10">

                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Poppins']">

                                    Ready to Make Data-Driven Decisions?

                                </h2>

                                <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">

                                    Join hundreds of seed companies, researchers, and policymakers using our platform

                                </p>

                                <motion.button

                                    whileHover={{ scale: 1.05 }}

                                    whileTap={{ scale: 0.95 }}

                                    className="px-10 py-5 bg-white text-[#00853E] rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all"

                                >

                                    Get Started Today

                                </motion.button>

                            </div>

                        </div>

                    </motion.div>

                </div>

                <MobileBottomNav />

                <FloatingChatButton text="Ask AI about any variety" />

            </div>

        </AnimatedPage>

    );

};

export default StakeholderH2HDashboard;