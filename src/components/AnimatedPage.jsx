import React from 'react';
import { motion } from 'framer-motion';

const AnimatedPage = ({
                          children,
                          className = '',
                          variant = 'default',
                          delay = 0,
                          staggerChildren = 0.1
                      }) => {

    const variants = {
        default: {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 }
        },
        slideUp: {
            initial: { opacity: 0, y: 60 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -60 }
        },
        slideRight: {
            initial: { opacity: 0, x: -40 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: 40 }
        },
        fade: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 }
        },
        scale: {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.9 }
        },
        farmSunrise: {
            initial: { opacity: 0, y: 40, scale: 0.95 },
            animate: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                    type: 'spring',
                    stiffness: 100,
                    damping: 15
                }
            },
            exit: { opacity: 0, y: -20, scale: 1.05 }
        }
    };

    const containerVariants = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: staggerChildren,
                delayChildren: delay
            }
        },
        exit: {}
    };

    const selectedVariant = variants[variant] || variants.default;

    return (
        <motion.div
            className={`w-full ${className}`}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={containerVariants}
        >
            <motion.div
                variants={selectedVariant}
                transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

// Child wrapper for staggered animations
export const AnimatedPageItem = ({ children, className = '' }) => {
    const itemVariants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12
            }
        }
    };

    return (
        <motion.div
            className={className}
            variants={itemVariants}
        >
            {children}
        </motion.div>
    );
};

// Demo page to showcase all variants
const AnimatedPageDemo = () => {
    const [selectedVariant, setSelectedVariant] = React.useState('farmSunrise');
    const [key, setKey] = React.useState(0);

    const variants = ['default', 'slideUp', 'slideRight', 'fade', 'scale', 'farmSunrise'];

    const replayAnimation = (variant) => {
        setSelectedVariant(variant);
        setKey(prev => prev + 1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F8FFF9] via-[#E8F5E9] to-[#F8FFF9] p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-[#0A2F1A] font-['Poppins'] mb-4">
                        AnimatedPage Component
                    </h1>
                    <p className="text-[#00853E] font-['Inter'] text-lg">
                        Select a variant to see the magic 🌾✨
                    </p>
                </motion.div>

                {/* Variant Selector */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {variants.map((variant, idx) => (
                        <motion.button
                            key={variant}
                            onClick={() => replayAnimation(variant)}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-5 py-2.5 rounded-full font-['Inter'] font-medium text-sm transition-all shadow-lg ${
                                selectedVariant === variant
                                    ? 'bg-gradient-to-r from-[#00853E] to-[#00A86B] text-white shadow-[#00853E]/30'
                                    : 'bg-white/80 text-[#0A2F1A] hover:bg-white shadow-[#00853E]/10'
                            }`}
                        >
                            {variant}
                        </motion.button>
                    ))}
                </div>

                {/* Animated Page Demo */}
                <AnimatedPage key={key} variant={selectedVariant} staggerChildren={0.15}>
                    <div className="grid md:grid-cols-2 gap-6">
                        <AnimatedPageItem>
                            <div
                                className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-[#00853E]/10 border border-[#4CAF50]/20 relative overflow-hidden"
                                style={{
                                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.03\' /%3E%3C/svg%3E")'
                                }}
                            >
                                <motion.div
                                    className="absolute top-0 right-0 w-32 h-32 bg-[#00A86B]/20 rounded-full blur-3xl"
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />
                                <h3 className="text-2xl font-bold text-[#0A2F1A] font-['Poppins'] mb-3">
                                    🌱 Farm Analytics
                                </h3>
                                <p className="text-[#00853E] font-['Inter']">
                                    Real-time insights from over 10,000+ Nigerian farms
                                </p>
                                <div className="mt-6 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-[#0A2F1A] font-['Inter']">Active Farms</span>
                                        <span className="text-lg font-bold text-[#00853E] font-['Poppins']">12,847</span>
                                    </div>
                                    <div className="h-2 bg-[#4CAF50]/20 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-[#00853E] to-[#00A86B]"
                                            initial={{ width: 0 }}
                                            animate={{ width: '85%' }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </AnimatedPageItem>

                        <AnimatedPageItem>
                            <div
                                className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-[#00853E]/10 border border-[#4CAF50]/20 relative overflow-hidden"
                                style={{
                                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.03\' /%3E%3C/svg%3E")'
                                }}
                            >
                                <motion.div
                                    className="absolute bottom-0 left-0 w-32 h-32 bg-[#4CAF50]/20 rounded-full blur-3xl"
                                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                                    transition={{ duration: 5, repeat: Infinity }}
                                />
                                <h3 className="text-2xl font-bold text-[#0A2F1A] font-['Poppins'] mb-3">
                                    📊 Yield Tracking
                                </h3>
                                <p className="text-[#00853E] font-['Inter']">
                                    Monitor crop performance across all regions
                                </p>
                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    {[
                                        { label: 'Rice', value: '2.4T' },
                                        { label: 'Maize', value: '1.8T' },
                                        { label: 'Cassava', value: '3.2T' },
                                        { label: 'Yam', value: '1.5T' }
                                    ].map((item, idx) => (
                                        <motion.div
                                            key={item.label}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.8 + idx * 0.1 }}
                                            className="bg-gradient-to-br from-[#F8FFF9] to-white p-3 rounded-xl border border-[#4CAF50]/20"
                                        >
                                            <p className="text-xs text-[#00853E] font-['Inter']">{item.label}</p>
                                            <p className="text-xl font-bold text-[#0A2F1A] font-['Poppins']">{item.value}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </AnimatedPageItem>

                        <AnimatedPageItem>
                            <div
                                className="md:col-span-2 bg-gradient-to-br from-[#00853E] to-[#00A86B] rounded-3xl p-8 shadow-2xl shadow-[#00853E]/30 text-white relative overflow-hidden"
                            >
                                <motion.div
                                    className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                                    animate={{
                                        x: [0, 100, 0],
                                        y: [0, 50, 0],
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{ duration: 10, repeat: Infinity }}
                                />
                                <div className="relative z-10">
                                    <h3 className="text-3xl font-bold font-['Poppins'] mb-4">
                                        🎯 Featured Component Benefits
                                    </h3>
                                    <div className="grid md:grid-cols-3 gap-6 mt-6">
                                        {[
                                            { icon: '⚡', title: '60fps Smooth', desc: 'Optimized animations' },
                                            { icon: '📱', title: 'Mobile First', desc: 'Responsive design' },
                                            { icon: '🎨', title: 'Customizable', desc: 'Multiple variants' }
                                        ].map((feature, idx) => (
                                            <motion.div
                                                key={feature.title}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 1 + idx * 0.1 }}
                                                className="text-center"
                                            >
                                                <div className="text-4xl mb-2">{feature.icon}</div>
                                                <h4 className="font-semibold font-['Poppins'] mb-1">{feature.title}</h4>
                                                <p className="text-sm text-white/80 font-['Inter']">{feature.desc}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </AnimatedPageItem>
                    </div>
                </AnimatedPage>

                {/* Usage Guide */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-12 bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-[#00853E]/10 border border-[#4CAF50]/20"
                >
                    <h3 className="text-2xl font-bold text-[#0A2F1A] font-['Poppins'] mb-4">
                        📖 Usage Guide
                    </h3>
                    <div className="bg-[#0A2F1A] text-[#4CAF50] p-6 rounded-xl font-mono text-sm overflow-x-auto">
            <pre>{`import AnimatedPage, { AnimatedPageItem } from './AnimatedPage';

// Wrap your page content
<AnimatedPage variant="farmSunrise" staggerChildren={0.15}>
  <AnimatedPageItem>
    <YourCard />
  </AnimatedPageItem>
  <AnimatedPageItem>
    <AnotherCard />
  </AnimatedPageItem>
</AnimatedPage>`}</pre>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AnimatedPage;
export { AnimatedPageDemo };