// src/data/Farmers.js

const STORAGE_KEY = 'ift_dms_farmers';

// Initial seed data (only runs once if localStorage is empty)
const seedFarmers = [
    {
        id: 'F001',
        name: 'Musa Abdullahi',
        email: 'musa@example.com',
        phone: '08012345678',
        location: 'Kura LGA, Kano',
        state: 'Kano',
        assignedTrials: ['TR-2025-001', 'TR-2025-002', 'TR-2024-045'],
        joinedDate: '2024-06-15'
    },
    {
        id: 'F002',
        name: 'Aminu Bello',
        email: 'aminu@example.com',
        phone: '08087654321',
        location: 'Bichi LGA, Kano',
        state: 'Kano',
        assignedTrials: ['TR-2025-001'],
        joinedDate: '2024-08-20'
    },
    {
        id: 'F003',
        name: 'Fatima Yusuf',
        email: 'fatima@example.com',
        phone: '07099887766',
        location: 'Dambatta LGA, Kano',
        state: 'Kano',
        assignedTrials: ['TR-2025-002'],
        joinedDate: '2025-01-10'
    }
];

// Initialize localStorage with seed data if empty
const initFarmers = () => {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedFarmers));
    }
};

// Get all farmers
export const getFarmers = () => {
    initFarmers();
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

// Get farmer by ID
export const getFarmerById = (id) => {
    const farmers = getFarmers();
    return farmers.find(f => f.id === id);
};

// Get farmer by email (for login)
export const getFarmerByEmail = (email) => {
    const farmers = getFarmers();
    return farmers.find(f => f.email.toLowerCase() === email.toLowerCase());
};

// Add new farmer
export const addFarmer = (farmer) => {
    const farmers = getFarmers();
    const newFarmer = {
        id: `F${String(farmers.length + 1).padStart(3, '0')}`,
        ...farmer,
        assignedTrials: [],
        joinedDate: new Date().toISOString().split('T')[0]
    };
    farmers.push(newFarmer);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(farmers));
    return newFarmer;
};

// Update farmer
export const updateFarmer = (id, updates) => {
    const farmers = getFarmers();
    const index = farmers.findIndex(f => f.id === id);
    if (index !== -1) {
        farmers[index] = { ...farmers[index], ...updates };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(farmers));
        return farmers[index];
    }
    return null;
};

// Delete farmer
export const deleteFarmer = (id) => {
    let farmers = getFarmers();
    farmers = farmers.filter(f => f.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(farmers));
};