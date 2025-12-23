// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import FarmerLayout from './layouts/FarmerLayout';

// Pages
import LoginPage from './pages/LoginPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import StakeholderH2HDashboard from './pages/StakeholderH2HDashboard.jsx';
import FarmerDashboard from './pages/FarmerDashboard.jsx';
import AIChatbotPage from './pages/AIChatbotPage.jsx';
import TrialReportPage from './pages/TrialReportPage.jsx';
import HeadToHeadComparisonPage from './pages/HeadToHeadComparisonPage.jsx';
import SubmissionsReviewPage from './pages/SubmissionsReviewPage.jsx';
import TrialSetupPage from './pages/TrialSetupPage.jsx';
import TrialDetailsPage from './pages/TrialDetailsPage.jsx';
import FieldSubmissionForm from './pages/FieldSubmissionForm.jsx';
import TrialsListPage from './pages/TrialsListPage.jsx';
import AdminTrialsPage from './pages/AdminTrialsPage.jsx';
import AdminTrialDetailsPage from './pages/AdminTrialDetailsPage.jsx';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="text-2xl font-bold text-green-800 animate-pulse">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

function App() {
    return (
        <Routes>
            {/* Public */}
            <Route path="/" element={<LoginPage />} />

            {/* Stakeholder */}
            <Route path="/stakeholder" element={<ProtectedRoute><StakeholderH2HDashboard /></ProtectedRoute>} />

            {/* Shared */}
            <Route path="/h2h" element={<ProtectedRoute><HeadToHeadComparisonPage /></ProtectedRoute>} />

            {/* Trial Details & Report (accessible from anywhere) */}
            <Route path="/trials/:id" element={<ProtectedRoute><TrialDetailsPage /></ProtectedRoute>} />
            <Route path="/trials/:id/report" element={<ProtectedRoute><TrialReportPage /></ProtectedRoute>} />

            {/* Admin - Shared Layout */}
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                <Route index element={<AdminDashboard />} />
                <Route path="trials" element={<AdminTrialsPage />} />
                <Route path="trials/new" element={<TrialSetupPage />} />
                <Route path="trials/:id" element={<AdminTrialDetailsPage />} /> {/* NEW ADMIN DETAILS */}
                <Route path="submissions" element={<SubmissionsReviewPage />} />
                <Route path="farmers" element={<div className="p-12"><h1 className="text-4xl font-bold text-green-950">Farmers Management</h1></div>} />
                <Route path="locations" element={<div className="p-12"><h1 className="text-4xl font-bold text-green-950">Locations Management</h1></div>} />
            </Route>

            {/* Farmer - ALL farmer pages inside shared layout */}
            <Route path="/farmer" element={<ProtectedRoute><FarmerLayout /></ProtectedRoute>}>
                <Route index element={<FarmerDashboard />} />
                <Route path="submit" element={<FieldSubmissionForm />} />
                <Route path="chat" element={<AIChatbotPage />} />
                <Route path="profile" element={<div className="p-12"><h1 className="text-4xl font-bold text-green-950">My Profile</h1><p className="mt-6 text-gray-600">View and edit your information</p><p className="mt-4 text-gray-500">Coming soon...</p></div>} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;