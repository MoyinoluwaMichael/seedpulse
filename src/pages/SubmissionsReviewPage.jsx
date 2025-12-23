// src/pages/SubmissionsReviewPage.jsx
import React from 'react';
import { Camera, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';

const SubmissionsReviewPage = () => {
    return (
        <div className="px-4 md:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">
                {/* Page Title */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-green-950 mb-3">
                        Review Submissions
                    </h1>
                    <p className="text-lg text-gray-600">
                        Approve, flag, or reject farmer-submitted field data
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <Camera className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <p className="text-4xl font-bold text-blue-900">47</p>
                        <p className="text-gray-600 mt-2">Total Today</p>
                    </div>
                    <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <AlertTriangle className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                        <p className="text-4xl font-bold text-orange-700">23</p>
                        <p className="text-gray-600 mt-2">Pending Review</p>
                    </div>
                    <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                        <p className="text-4xl font-bold text-red-700">8</p>
                        <p className="text-gray-600 mt-2">Flagged</p>
                    </div>
                    <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                        <p className="text-4xl font-bold text-green-700">16</p>
                        <p className="text-gray-600 mt-2">Approved Today</p>
                    </div>
                </div>

                {/* Placeholder for Submissions List */}
                <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 p-12">
                    <div className="text-center">
                        <Camera className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">
                            Submission Review Queue
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                            Admins can view, approve, flag, or reject farmer photos and notes here.
                            Full review workflow with photo gallery, GPS verification, and comments coming soon.
                        </p>
                        <div className="bg-gray-100 rounded-xl p-8 max-w-md mx-auto">
                            <p className="text-gray-500">No submissions to review at the moment</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmissionsReviewPage;