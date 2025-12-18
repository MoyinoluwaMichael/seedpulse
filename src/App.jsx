// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layout
import AdminLayout from './layouts/AdminLayout';

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

            {/* Farmer */}
            <Route path="/farmer" element={<ProtectedRoute><FarmerDashboard /></ProtectedRoute>} />
            <Route path="/submit" element={<ProtectedRoute><FieldSubmissionForm /></ProtectedRoute>} />
            <Route path="/trials/:id" element={<ProtectedRoute><TrialDetailsPage /></ProtectedRoute>} />
            <Route path="/trials/:id/report" element={<ProtectedRoute><TrialReportPage /></ProtectedRoute>} />

            {/* Stakeholder */}
            <Route path="/stakeholder" element={<ProtectedRoute><StakeholderH2HDashboard /></ProtectedRoute>} />

            {/* Shared */}
            <Route path="/chat" element={<ProtectedRoute><AIChatbotPage /></ProtectedRoute>} />
            <Route path="/h2h" element={<ProtectedRoute><HeadToHeadComparisonPage /></ProtectedRoute>} />

            {/* Admin - All pages use shared layout */}
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                <Route index element={<AdminDashboard />} />
                <Route path="trials" element={<TrialsListPage />} /> {/* New list page */}
                <Route path="trials/new" element={<TrialSetupPage />} />
                <Route path="submissions" element={<SubmissionsReviewPage />} />
                <Route path="farmers" element={<div className="p-12"><h1 className="text-4xl font-bold">Farmers Management (Coming Soon)</h1></div>} />
                <Route path="locations" element={<div className="p-12"><h1 className="text-4xl font-bold">Locations Management (Coming Soon)</h1></div>} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;