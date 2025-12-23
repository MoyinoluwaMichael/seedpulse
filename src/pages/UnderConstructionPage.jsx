// src/pages/UnderConstructionPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // ← This was missing!
import { Leaf, Sparkles, ArrowLeft, HardHat } from 'lucide-react';

const UnderConstructionPage = ({ pageName = "Feature" }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                {/* Illustration */}
                <div className="relative mb-12">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="inline-block"
                    >
                        <div className="relative">
                            {/* Growing Plant + Hard Hat */}
                            <div className="w-48 h-48 mx-auto bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-end justify-center overflow-hidden shadow-2xl">
                                <Leaf className="w-32 h-32 text-green-600 animate-pulse" />
                            </div>
                            <div className="absolute -top-6 -right-6">
                                <HardHat className="w-20 h-20 text-yellow-500 drop-shadow-lg rotate-12" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating elements */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute -left-10 top-10"
                    >
                        <div className="w-12 h-12 bg-yellow-200 rounded-full opacity-60" />
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute -right-8 bottom-8"
                    >
                        <Sparkles className="w-10 h-10 text-green-500 opacity-70" />
                    </motion.div>
                </div>

                {/* Message */}
                <h1 className="text-4xl md:text-5xl font-bold text-green-950 mb-6">
                    This {pageName} is Growing!
                </h1>

                <p className="text-xl text-gray-700 mb-4 max-w-lg mx-auto">
                    We're working hard in the fields to bring you this feature very soon.
                </p>

                <p className="text-gray-600 mb-10 max-w-md mx-auto">
                    Like a seedling pushing through the soil, great things take time — but the harvest will be worth it 🌱
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-8 py-4 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-xl font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>

                    <button
                        onClick={() => navigate('/chat')}
                        className="px-8 py-4 bg-white text-green-700 border-2 border-green-600 rounded-xl font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                    >
                        <Sparkles className="w-5 h-5" />
                        Ask AI for Help
                    </button>
                </div>

                {/* Footer Note */}
                <p className="text-sm text-gray-500 mt-12">
                    Powered by passion for Nigerian agriculture • SpringCore Africa © 2025
                </p>
            </div>
        </div>
    );
};

export default UnderConstructionPage;