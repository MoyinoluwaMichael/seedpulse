// PageHeader.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';

const PageHeader = ({ title, breadcrumb = [] }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
        >
            {/* Breadcrumb */}
            {breadcrumb.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-2 mb-4 flex-wrap"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/60 backdrop-blur-sm border border-gray-200"
                    >
                        <Home className="w-4 h-4 text-[#00853E]" />
                        <span className="text-sm text-gray-600">Home</span>
                    </motion.div>

                    {breadcrumb.map((item, index) => (
                        <React.Fragment key={index}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                            >
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                                    index === breadcrumb.length - 1
                                        ? 'bg-gradient-to-r from-[#00853E]/10 to-[#00A86B]/10 border-[#00A86B]/30 text-[#00853E] font-semibold'
                                        : 'bg-white/60 backdrop-blur-sm border-gray-200 text-gray-600 hover:border-[#00853E]/30'
                                }`}
                            >
                                <span className="text-sm">{item}</span>
                            </motion.div>
                        </React.Fragment>
                    ))}
                </motion.div>
            )}

            {/* Title */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: 'spring' }}
                className="text-4xl md:text-5xl font-bold text-[#00853E] relative"
                style={{
                    fontFamily: 'Poppins, sans-serif',
                    textShadow: '0 2px 20px rgba(0, 133, 62, 0.15)'
                }}
            >
                {title}
                <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#00853E] to-[#00A86B] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '120px' }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                />
            </motion.h1>
        </motion.div>
    );
};

export default PageHeader;