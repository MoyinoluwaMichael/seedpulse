// src/pages/TrialReportPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, BarChart3, Camera, FileText, Target, Award, CheckCircle } from 'lucide-react';
import { getTrials, getTrialById } from '../data/trials';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TrialReportPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const trial = getTrials(id);

    if (!trial || trial.status !== 'completed') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
                <p className="text-2xl text-gray-600">Report not available</p>
            </div>
        );
    }

    // Mock data for charts
    const yieldData = [
        { month: 'Apr', yield: 0 },
        { month: 'May', yield: 1.2 },
        { month: 'Jun', yield: 2.8 },
        { month: 'Jul', yield: 4.1 },
        { month: 'Aug', yield: 5.3 },
        { month: 'Sep', yield: 5.9 },
        { month: 'Oct', yield: 6.2 },
        { month: 'Nov', yield: 6.0 },
    ];

    const targetVsActual = [
        { metric: 'Target Yield', value: 6.5 },
        { metric: 'Actual Yield', value: 6.0 },
    ];

    // Mock submitted photos
const photos = [
    'https://www.shutterstock.com/image-photo/unripe-rice-stalk-tillering-phase-260nw-2530613043.jpg',  // Tillering stage
    'https://www.isaaa.org/kc/cropbiotechupdate/files/images/713202263408AM.jpg',  // Flowering stage
    'https://www.shutterstock.com/image-photo/young-rice-grain-filling-stage-260nw-2642069571.jpg',  // Grain filling stage
    'https://home.dartmouth.edu/sites/home/files/styles/max_width_720px/public/2022-12/Rice%20plants%202%20horiz%20by%20Jiajing%20Wang_0.jpg?itok=pQ9NiZQb'  // Harvest stage
];

    const handleDownloadPDF = () => {
        alert('PDF download feature coming soon! 📄\n\nIn production, this would generate a printable report.');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-xl border-b border-gray-200 shadow-md">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-green-700 hover:text-green-600 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-semibold">Back</span>
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-green-950">Trial Report</h1>
                            <p className="text-sm text-gray-600">{trial.crop} - {trial.variety}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleDownloadPDF}
                        className="px-6 py-3 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                    >
                        <Download className="w-5 h-5" />
                        Download PDF
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="pt-20 px-4 md:px-6 lg:px-8 pb-12">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Summary Card */}
                    <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-3 flex items-center gap-3">
                                    {trial.crop} - {trial.variety}
                                    <Award className="w-8 h-8 text-yellow-500" />
                                </h2>
                                <p className="text-lg text-gray-600 mb-4">{trial.description}</p>
                                <div className="flex items-center gap-6 text-sm">
                                    <span className="flex items-center gap-2 text-green-700 font-semibold">
                                        <CheckCircle className="w-5 h-5" />
                                        Trial Completed
                                    </span>
                                    <span className="text-gray-600">
                                        Final Yield: <span className="font-bold text-green-950">6.0 t/ha</span>
                                    </span>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-6xl font-bold text-green-700">92%</div>
                                <p className="text-gray-600 mt-2">of Target Achieved</p>
                            </div>
                        </div>
                    </div>

                    {/* Yield Progress Chart */}
                    <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <BarChart3 className="w-7 h-7 text-green-600" />
                            Yield Progression Over Season
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={yieldData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                <XAxis dataKey="month" />
                                <YAxis label={{ value: 'Yield (t/ha)', angle: -90, position: 'insideLeft' }} />
                                <Tooltip />
                                <Line type="monotone" dataKey="yield" stroke="#00853E" strokeWidth={4} dot={{ fill: '#00A86B' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Target vs Actual */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                                <Target className="w-7 h-7 text-blue-600" />
                                Target vs Actual Yield
                            </h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={targetVsActual}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="metric" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#00853E" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Key Highlights</h3>
                            <ul className="space-y-4 text-gray-700">
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                                    <span>Excellent flood tolerance during July rains</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                                    <span>Uniform panicle development across all plots</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                                    <span>Minor pest pressure controlled effectively</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                                    <span>Grain quality rated "Premium" by buyers</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Submitted Photos */}
                    <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Camera className="w-7 h-7 text-blue-600" />
                            Field Photos from Farmers
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {photos.map((photo, idx) => (
                                <div key={idx} className="relative group overflow-hidden rounded-2xl shadow-lg">
                                    <img
                                        src={photo}
                                        alt={`Field photo ${idx + 1}`}
                                        className="w-full h-48 object-cover transition-transform group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                        <p className="text-white text-sm font-medium">Stage {idx + 2}: {['Tillering', 'Flowering', 'Grain Filling', 'Harvest'][idx]}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Farmer Notes */}
                    <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <FileText className="w-7 h-7 text-green-600" />
                            Farmer Observations
                        </h3>
                        <div className="space-y-4">
                            <blockquote className="border-l-4 border-green-600 pl-6 italic text-gray-700">
                                "FARO-52 showed strong recovery after early flooding. Plants were uniform and healthy throughout." — Musa Abdullahi, Kano
                            </blockquote>
                            <blockquote className="border-l-4 border-green-600 pl-6 italic text-gray-700">
                                "Excellent grain filling this year. Buyers already asking for next season's seed." — Local farmer group
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrialReportPage;