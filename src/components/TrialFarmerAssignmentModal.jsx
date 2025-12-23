// src/components/TrialFarmerAssignmentModal.jsx
import React, { useState } from 'react';
import { X, UserPlus, UserMinus } from 'lucide-react';
import { getFarmers } from '../data/Farmers';
import { getAssignmentsForTrial } from '../data/TrialAssignments';

const TrialFarmerAssignmentModal = ({ trialId, trialName, onClose }) => {
    const allFarmers = getFarmers();
    const currentAssignments = getAssignmentsForTrial(trialId);
    const assignedFarmerIds = new Set(currentAssignments.map(a => a.farmerId));

    const [searchTerm, setSearchTerm] = useState('');

    const filteredFarmers = allFarmers.filter(farmer =>
        farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToggleAssignment = (farmerId) => {
        // In real app: call add/remove assignment functions
        alert(`Toggled assignment for farmer ID ${farmerId} on trial ${trialId}`);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Manage Farmers</h2>
                        <p className="text-sm text-gray-600 mt-1">Trial: {trialName}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Search */}
                <div className="p-6 border-b border-gray-200">
                    <input
                        type="text"
                        placeholder="Search farmers by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-600"
                    />
                </div>

                {/* Farmers List */}
                <div className="flex-1 overflow-y-auto">
                    <div className="divide-y divide-gray-200">
                        {filteredFarmers.map((farmer) => {
                            const isAssigned = assignedFarmerIds.has(farmer.id);
                            return (
                                <div key={farmer.id} className="p-6 hover:bg-green-50/30 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-green-700 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                                                {farmer.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{farmer.name}</p>
                                                <p className="text-sm text-gray-600">{farmer.email}</p>
                                                <p className="text-xs text-gray-500 mt-1">{farmer.location}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleToggleAssignment(farmer.id)}
                                            className={`px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all ${
                                                isAssigned
                                                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                                            }`}
                                        >
                                            {isAssigned ? (
                                                <>
                                                    <UserMinus className="w-4 h-4" />
                                                    Remove
                                                </>
                                            ) : (
                                                <>
                                                    <UserPlus className="w-4 h-4" />
                                                    Assign
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            {assignedFarmerIds.size} farmers currently assigned
                        </p>
                        <button
                            onClick={onClose}
                            className="px-6 py-3 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrialFarmerAssignmentModal;