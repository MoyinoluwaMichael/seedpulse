// src/data/TrialAssignments.js

const STORAGE_KEY = 'ift_dms_trial_assignments';

// Initial seed assignments (farmerId → trialId)
const seedAssignments = [
    { trialId: 'TR-2025-001', farmerId: 'F001', submissions: 3, required: 8 },
    { trialId: 'TR-2025-001', farmerId: 'F002', submissions: 5, required: 8 },
    { trialId: 'TR-2025-001', farmerId: 'F003', submissions: 2, required: 8 },
    { trialId: 'TR-2025-002', farmerId: 'F001', submissions: 1, required: 6 },
    { trialId: 'TR-2025-002', farmerId: 'F003', submissions: 0, required: 6 },
    { trialId: 'TR-2024-045', farmerId: 'F001', submissions: 8, required: 8 },
];

const init = () => {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedAssignments));
    }
};

export const getAssignmentsForTrial = (trialId) => {
    init();
    const data = localStorage.getItem(STORAGE_KEY);
    const assignments = data ? JSON.parse(data) : [];
    return assignments.filter(a => a.trialId === trialId);
};

export const getAllAssignments = () => {
    init();
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

// Future: addAssignment, updateProgress, etc.