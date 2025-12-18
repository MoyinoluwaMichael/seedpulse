import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, MapPin, Leaf, Upload, CheckCircle, AlertCircle } from 'lucide-react';

const FieldSubmissionForm = () => {
    const [photos, setPhotos] = useState([]);
    const [notes, setNotes] = useState('');
    const [gpsLocation, setGpsLocation] = useState('Acquiring location...');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const mockTrial = {
        id: 'TR-2025-001',
        crop: 'Rice',
        variety: 'FARO-66',
        location: 'Kura LGA, Kano State',
        requiredPhotos: ['Plant height', 'Leaf condition', 'Panicle', 'Weeds', 'General field view'],
    };

    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);
        setPhotos(prev => [...prev, ...files.map(file => ({ file, preview: URL.createObjectURL(file), name: file.name }))]);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        alert('Submission successful! Thank you for your data.');
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-4 py-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <button onClick={() => window.history.back()} className="flex items-center gap-2 text-green-700 hover:text-green-600">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-semibold">Back</span>
                    </button>
                    <h1 className="text-lg font-bold text-green-950">New Submission</h1>
                    <div className="w-9" /> {/* Spacer */}
                </div>
            </div>

            <div className="pt-20 px-4 pb-32">
                <div className="max-w-4xl mx-auto">
                    {/* Trial Info */}
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 mb-6 shadow-lg border border-gray-200/50">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-gradient-to-br from-green-700 to-green-600 rounded-xl">
                                <Leaf className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{mockTrial.crop} - {mockTrial.variety}</h2>
                                <p className="text-gray-600">{mockTrial.id}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-5 h-5" />
                            <span>{mockTrial.location}</span>
                        </div>
                    </motion.div>

                    {/* GPS Location */}
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 mb-6 shadow-lg border border-gray-200/50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <MapPin className="w-8 h-8 text-green-600" />
                                <div>
                                    <p className="font-semibold text-gray-800">Current Location</p>
                                    <p className="text-sm text-gray-600">{gpsLocation}</p>
                                </div>
                            </div>
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                    </motion.div>

                    {/* Photo Upload */}
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 mb-6 shadow-lg border border-gray-200/50">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Upload Photos ({photos.length}/{mockTrial.requiredPhotos.length})</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                            {mockTrial.requiredPhotos.map((req, idx) => (
                                <div key={idx} className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center">
                                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600">{req}</p>
                                </div>
                            ))}
                        </div>

                        <label className="block">
                            <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                            <div className="px-6 py-4 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-xl font-semibold text-center cursor-pointer hover:shadow-lg flex items-center justify-center gap-2">
                                <Upload className="w-5 h-5" />
                                Upload Photos
                            </div>
                        </label>

                        {photos.length > 0 && (
                            <div className="mt-6 grid grid-cols-3 gap-3">
                                {photos.map((photo, idx) => (
                                    <motion.div key={idx} initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative">
                                        <img src={photo.preview} alt="" className="w-full h-32 object-cover rounded-lg" />
                                        <button onClick={() => setPhotos(prev => prev.filter((_, i) => i !== idx))} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Notes */}
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 mb-32 shadow-lg border border-gray-200/50">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Additional Notes (Optional)</h3>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows="5"
                            placeholder="Any observations about pests, weather, growth stage, etc..."
                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:outline-none resize-none"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Submit Button */}
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl p-4">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || photos.length === 0}
                        className="w-full py-4 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-xl font-bold text-lg shadow-lg disabled:opacity-50"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Data'}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default FieldSubmissionForm;