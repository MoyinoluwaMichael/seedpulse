// FloatingChatButton.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Leaf, X } from 'lucide-react';

const FloatingChatButton = ({ tooltip = 'Ask AI Assistant' }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const handleClick = () => {
        // Navigate to chatbot page
        window.location.href = '/chat';
    };

    return (
        <div className="fixed bottom-8 right-8 z-50">
            {/* Tooltip */}
            <AnimatePresence>
                {(showTooltip || isHovered) && (
                    <motion.div
                        initial={{ opacity: 0, x: 10, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 10, scale: 0.9 }}
                        className="absolute right-20 bottom-2 whitespace-nowrap"
                    >
                        <div className="bg-[#0A2F1A] text-white px-4 py-2 rounded-xl shadow-2xl">
                            <p className="text-sm font-semibold">{tooltip}</p>
                            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-[#0A2F1A]" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={handleClick}
                className="relative group"
            >
                {/* Pulsing Rings */}
                <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-[#00A86B]"
                />
                <motion.div
                    animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute inset-0 rounded-full bg-[#00853E]"
                />

                {/* Main Circle */}
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#00853E] to-[#00A86B] shadow-2xl flex items-center justify-center overflow-hidden">
                    {/* Shine Effect */}
                    <motion.div
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                    />

                    {/* Icon */}
                    <motion.div
                        animate={{ rotate: isHovered ? 360 : 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Leaf className="w-8 h-8 text-white relative z-10" />
                    </motion.div>

                    {/* Notification Dot */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-lg"
                    />
                </div>
                {/* Floating Sparkles */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-[#00A86B] rounded-full"
                        style={{
                            top: '50%',
                            left: '50%'
                        }}
                        animate={{
                            x: [0, (Math.cos((i * Math.PI) / 3) * 40)],
                            y: [0, (Math.sin((i * Math.PI) / 3) * 40)],
                            opacity: [1, 0],
                            scale: [1, 0]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2
                        }}
                    />
                ))}
            </motion.button>

            {/* Quick Action Badge */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: isHovered ? 1 : 0 }}
                className="absolute -top-2 -left-2 bg-white rounded-full p-2 shadow-lg border-2 border-[#00A86B]"
            >
                <MessageSquare className="w-4 h-4 text-[#00853E]" />
            </motion.div>
        </div>
    );
};
export default FloatingChatButton;