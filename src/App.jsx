// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import LoginPage from './pages/LoginPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import StakeholderH2HDashboard from './pages/StakeholderH2HDashboard.jsx';
import FarmerDashboard from './pages/FarmerDashboard.jsx';
import AIChatbotPage from './pages/AIChatbotPage.jsx';
import TrialReportPage from './pages/TrialReportPage.jsx';
import HeadToHeadComparisonPage from './pages/HeadToHeadComparisonPage.jsx';
import SubmissionsReviewPage from './pages/SubmissionsReviewPage.jsx'; // if you have it
import TrialSetupPage from './pages/TrialSetupPage.jsx';
import TrialDetailsPage from './pages/TrialDetailsPage.jsx';
import FieldSubmissionForm from './pages/FieldSubmissionForm.jsx';

// Protected Route Component
// In src/App.jsx — replace the existing ProtectedRoute with this

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

    // ANY logged-in user can access ANY protected page — no role check
    return children;
};

// Unauthorized fallback
const Unauthorized = () => (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-gray-700">You don't have permission to view this page.</p>
        </div>
    </div>
);

function App() {
    const { user } = useAuth();

    return (
        <Routes>
            {/* Public Route */}
            <Route
                path="/"
//                 element={user ? <Navigate to={getDashboardRoute(user.role)} replace /> : <LoginPage />}
                element={ <LoginPage />}
            />

            {/* Protected Routes */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute allowedRoles={['admin', 'stakeholder']}>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/stakeholder"
                element={
                    <ProtectedRoute allowedRoles={['stakeholder']}>
                        <StakeholderH2HDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/farmer"
                element={
                    <ProtectedRoute allowedRoles={['farmer']}>
                        <FarmerDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/chat"
                element={
                    <ProtectedRoute>
                        <AIChatbotPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/h2h"
                element={
                    <ProtectedRoute>
                        <HeadToHeadComparisonPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/submissions"
                element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <SubmissionsReviewPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/trials/new"
                element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <TrialSetupPage />
                    </ProtectedRoute>
                }
            />
            <Route path="/trials/:id/report" element={<ProtectedRoute><TrialReportPage /></ProtectedRoute>} />

            <Route
                path="/trials/:id"
                element={
                    <ProtectedRoute>
                        <TrialDetailsPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/submit"
                element={
                    <ProtectedRoute allowedRoles={['farmer']}>
                        <FieldSubmissionForm />
                    </ProtectedRoute>
                }
            />

            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

// Helper to redirect based on role
const getDashboardRoute = (role) => {
    switch (role) {
        case 'admin':
            return '/admin';
        case 'stakeholder':
            return '/stakeholder';
        case 'farmer':
            return '/farmer';
        default:
            return '/';
    }
};

export default App;