// src/pages/FieldSubmissionForm.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Camera, X, ChevronLeft, Check, Leaf, Clock} from 'lucide-react';
import { getTrials } from '../data/trials';

const FieldSubmissionForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Read trial ID from URL query param (e.g. /farmer/submit?trial=TR-2025-002)
    const queryParams = new URLSearchParams(location.search);
    const trialIdFromUrl = queryParams.get('trial');

    // Algorithm to choose the best default trial
    let selectedTrial;

    if (trialIdFromUrl) {
        // 1. Priority: Trial explicitly passed via URL (from "Continue Submission")
        selectedTrial = getTrials().find(t => t.id === trialIdFromUrl);
    }

    if (!selectedTrial) {
        // 2. Find all ongoing trials
        const ongoingTrials = getTrials().filter(t => t.status === 'ongoing');

        if (ongoingTrials.length > 0) {
            // Sort by urgency:
            // - Earliest due date first
            // - If tie, lowest progress first
            selectedTrial = ongoingTrials
                .slice()
                .sort((a, b) => {
                    if (a.due !== b.due) {
                        return a.due.localeCompare(b.due); // earliest due date first
                    }
                    const progressA = a.submissions / a.totalRequired;
                    const progressB = b.submissions / b.totalRequired;
                    return progressA - progressB; // lowest progress first
                })[0];
        }
    }

    // 3. Fallback: if no ongoing trials, use most recent completed or first trial
    if (!selectedTrial) {
        const completedTrials = getTrials
            .filter(t => t.status === 'completed')
            .sort((a, b) => b.due.localeCompare(a.due)); // most recent first
        selectedTrial = completedTrials[0] || getTrials[0];
    }

    const trial = selectedTrial;

    const [photos, setPhotos] = useState([]);
    const [notes, setNotes] = useState('');
    const [stage, setStage] = useState('tillering');

    const stages = ['tillering', 'flowering', 'grain filling', 'harvest'];

    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);
        const newPhotos = files.map(file => ({
            id: Date.now() + Math.random(),
            file,
            preview: URL.createObjectURL(file),
            stage
        }));
        setPhotos(prev => [...prev, ...newPhotos]);
    };

    const removePhoto = (id) => {
        setPhotos(prev => prev.filter(p => p.id !== id));
    };

    const handleSubmit = () => {
        alert(
            `Submission saved for ${trial.crop} - ${trial.variety}!\n` +
            `Stage: ${stage.replace(/^\w/, c => c.toUpperCase())}\n` +
            `Photos: ${photos.length}\n` +
            `Notes: ${notes || 'None'}`
        );
        navigate('/farmer');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            {/* Fixed Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-xl border-b border-gray-200 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-green-700 hover:text-green-600 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="font-semibold">Back</span>
                    </button>
                    <h1 className="text-xl font-bold text-green-950">Field Submission</h1>
                    <div className="w-10" />
                </div>
            </div>

            {/* Main Content */}
            <div className="pt-20 px-4 pb-32">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Trial Header Card */}
                    <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200">
                        <div className="flex items-center gap-5 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-700 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <Leaf className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                                    {trial.crop} - {trial.variety}
                                </h2>
                                <p className="text-gray-600 mt-1">{trial.location}</p>
                            </div>
                        </div>

                        {/* Auto-selected hint (only when no trial from URL) */}
                        {!trialIdFromUrl && trial.status === 'ongoing' && (
                            <p className="text-sm text-green-700 flex items-center gap-2 mb-4">
                                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                                Auto-selected: Most urgent trial
                            </p>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                            <div className="text-center">
                                <p className="text-4xl font-bold text-green-700">{trial.submissions}/{trial.totalRequired}</p>
                                <p className="text-sm text-gray-600 mt-1">Submissions</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl font-bold text-orange-600">
                                    {Math.round((trial.submissions / trial.totalRequired) * 100)}%
                                </p>
                                <p className="text-sm text-gray-600 mt-1">Progress</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-semibold text-gray-800">{trial.due}</p>
                                <p className="text-sm text-gray-600 mt-1">Due Date</p>
                            </div>
                            <div className="text-center">
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                                    trial.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                }`}>
                                    {trial.status === 'completed' ? <Check className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                                    {trial.status === 'completed' ? 'Completed' : 'Ongoing'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Growth Stage Selector */}
                    <div>
                        <label className="block text-lg font-semibold text-gray-800 mb-4">Current Growth Stage</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {stages.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setStage(s)}
                                    className={`p-5 rounded-2xl border-2 transition-all ${
                                        stage === s
                                            ? 'border-green-600 bg-green-50 shadow-md'
                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                    }`}
                                >
                                    <p className="font-medium capitalize">{s.replace('-', ' ')}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Photo Upload */}
                    <div>
                        <label className="block text-lg font-semibold text-gray-800 mb-4">
                            Upload Photos ({photos.length})
                        </label>
                        <label className="block cursor-pointer">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                className="hidden"
                            />
                            <div className="border-4 border-dashed border-gray-300 rounded-3xl p-12 text-center hover:border-green-500 transition-all bg-white/70">
                                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-lg font-medium text-gray-700">Click to upload or drag photos here</p>
                                <p className="text-sm text-gray-500 mt-2">Multiple photos supported</p>
                            </div>
                        </label>

                        {photos.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                {photos.map((photo) => (
                                    <div key={photo.id} className="relative group rounded-2xl overflow-hidden shadow-lg">
                                        <img
                                            src={photo.preview}
                                            alt="Field submission"
                                            className="w-full h-48 object-cover"
                                        />
                                        <button
                                            onClick={() => removePhoto(photo.id)}
                                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-3 py-1 rounded-lg">
                                            {photo.stage.replace(/^\w/, c => c.toUpperCase())}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-lg font-semibold text-gray-800 mb-4">Farmer Notes (Optional)</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add observations: pests, weather, growth issues, fertilizer used, etc..."
                            className="w-full p-5 bg-white border-2 border-gray-200 rounded-2xl focus:border-green-600 outline-none resize-none h-40 text-gray-700"
                        />
                    </div>
                </div>
            </div>

            {/* Fixed Submit Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-40">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <button
                        onClick={handleSubmit}
                        disabled={photos.length === 0}
                        className="w-full py-5 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:shadow-xl"
                    >
                        <Check className="w-6 h-6" />
                        Submit Data for {trial.variety}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FieldSubmissionForm;