// StatsCard.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, trend, trendLabel = 'vs last month' }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const isPositiveTrend = trend >= 0;

    useEffect(() => {
        const numericValue = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
        let startValue = 0;
        const duration = 2000;
        const steps = 60;
        const increment = numericValue / steps;
        const stepDuration = duration / steps;

        const timer = setInterval(() => {
            startValue += increment;
            if (startValue >= numericValue) {
                setDisplayValue(numericValue);
                clearInterval(timer);
            } else {
                setDisplayValue(Math.floor(startValue));
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, [value]);

    const formatValue = (val) => {
        if (typeof value === 'string' && value.includes(',')) {
            return val.toLocaleString();
        }
        return val;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative group"
        >
            {/* Animated Glow */}
            <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: 'linear-gradient(135deg, rgba(0, 133, 62, 0.1), rgba(0, 168, 107, 0.1))',
                    filter: 'blur(20px)'
                }}
            />

            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200 shadow-lg overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: 'radial-gradient(circle, #00853E 1px, transparent 1px)',
                            backgroundSize: '10px 10px'
                        }}
                    />
                </div>

                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                            <motion.p
                                key={displayValue}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl font-bold text-[#00853E]"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                            >
                                {formatValue(displayValue)}
                            </motion.p>
                        </div>

                        {/* Icon */}
                        <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className="p-3 rounded-2xl bg-gradient-to-br from-[#00853E]/10 to-[#00A86B]/10 border border-[#00A86B]/30"
                        >
                            <Icon className="w-6 h-6 text-[#00853E]" />
                        </motion.div>
                    </div>

                    {/* Trend */}
                    {trend !== undefined && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center gap-2"
                        >
                            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${
                                isPositiveTrend
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                            }`}>
                                {isPositiveTrend ? (
                                    <TrendingUp className="w-4 h-4" />
                                ) : (
                                    <TrendingDown className="w-4 h-4" />
                                )}
                                <span className="text-sm font-bold">
                  {isPositiveTrend ? '+' : ''}{trend}%
                </span>
                            </div>
                            <span className="text-xs text-gray-500">{trendLabel}</span>
                        </motion.div>
                    )}

                    {/* Animated Bar */}
                    <motion.div
                        className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden"
                    >
                        <motion.div
                            className="h-full bg-gradient-to-r from-[#00853E] to-[#00A86B]"
                            initial={{ width: 0 }}
                            animate={{ width: '75%' }}
                            transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
                        />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default StatsCard;