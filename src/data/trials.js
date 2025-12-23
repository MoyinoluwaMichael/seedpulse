// src/data/Trials.js

const STORAGE_KEY = 'ift_dms_trials';

const seedTrials = [
    {
        id: 'TR-2025-001',
        crop: 'Rice',
        variety: 'FARO-66',
        location: 'Kura LGA, Kano',
        due: '2025-12-25',
        submissions: 3,
        totalRequired: 8,
        status: 'ongoing',
        description: 'Multi-location trial comparing FARO-66 with local checks in lowland areas.',
        startDate: '2025-04-15',
        endDate: '2025-12-30',
        states: ['Kano', 'Kebbi', 'Kaduna'],
        farmers: 42
    },
    {
        id: 'TR-2025-002',
        crop: 'Maize',
        variety: 'SAMMAZ-55',
        location: 'Zaria LGA, Kaduna',
        due: '2026-01-10',
        submissions: 1,
        totalRequired: 6,
        status: 'ongoing',
        description: 'Drought tolerance evaluation of SAMMAZ-55 under rainfed conditions.',
        startDate: '2025-05-20',
        endDate: '2026-01-15',
        states: ['Kaduna', 'Katsina'],
        farmers: 28
    },
    {
        id: 'TR-2024-045',
        crop: 'Rice',
        variety: 'FARO-52',
        location: 'Bichi LGA, Kano',
        due: '2025-11-30',
        submissions: 8,
        totalRequired: 8,
        status: 'completed',
        description: 'Completed trial on FARO-52 performance in irrigated systems.',
        startDate: '2024-04-01',
        endDate: '2024-11-30',
        states: ['Kano'],
        farmers: 35
    }
];

const initTrials = () => {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedTrials));
    }
};

export const getTrials = () => {
    initTrials();
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

export const getTrialById = (id) => {
    const trials = getTrials();
    return trials.find(t => t.id === id);
};

export const addTrial = (trial) => {
    const trials = getTrials();
    const newTrial = {
        id: `TR-${new Date().getFullYear()}-${String(trials.length + 1).padStart(3, '0')}`,
        submissions: 0,
        status: 'ongoing',
        ...trial
    };
    trials.push(newTrial);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trials));
    return newTrial;
};

export const updateTrial = (id, updates) => {
    const trials = getTrials();
    const index = trials.findIndex(t => t.id === id);
    if (index !== -1) {
        trials[index] = { ...trials[index], ...updates };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(trials));
        return trials[index];
    }
    return null;
};

export const deleteTrial = (id) => {
    let trials = getTrials();
    trials = trials.filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trials));
};