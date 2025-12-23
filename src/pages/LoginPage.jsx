// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getFarmerByEmail } from '../data/Farmers';
import {
    Leaf,
    Mail,
    Lock,
    Chrome,
    Loader2,
    User,
    Shield,
} from 'lucide-react';

// ============= DESIGN TOKENS =============
const colors = {
    primary: '#00853E',
    light: '#4CAF50',
    accent: '#00A86B',
    dark: '#0A2F1A',
    card: '#F8FFF9',
};

// ============= REUSABLE COMPONENTS (unchanged from your original) =============

// Button Component
const Button = ({
    variant = 'primary',
    isLoading = false,
    children,
    className = '',
    onClick,
    type = 'button',
    disabled = false,
    ...props
}) => {
    const [ripples, setRipples] = useState([]);

    const handleClick = (e) => {
        if (disabled || isLoading) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();
        setRipples((prev) => [...prev, { x, y, id }]);
        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);
        if (onClick) onClick(e);
    };

    const variants = {
        primary: 'bg-gradient-to-r from-green-700 to-green-600 text-white hover:shadow-lg hover:shadow-green-500/30',
        secondary: 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20',
        outline: 'bg-transparent border-2 border-green-700 text-green-700 hover:bg-green-700/10',
    };

    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            className={`relative overflow-hidden px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
            onClick={handleClick}
            type={type}
            disabled={disabled}
            {...props}
        >
            <AnimatePresence>
                {ripples.map((ripple) => (
                    <motion.span
                        key={ripple.id}
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 4, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute bg-white rounded-full"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            width: 20,
                            height: 20,
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                ))}
            </AnimatePresence>
            <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                {children}
            </span>
        </motion.button>
    );
};

// Input Component
const Input = ({
    label,
    error,
    icon,
    className = '',
    type = 'text',
    value,
    onChange,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value);

    return (
        <div className="relative w-full">
            <motion.div animate={{ scale: isFocused ? 1.02 : 1 }} className="relative">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    value={value}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => {
                        setHasValue(!!e.target.value);
                        onChange(e);
                    }}
                    className={`w-full px-4 ${icon ? 'pl-12' : ''} pt-6 pb-2 bg-white/5 backdrop-blur-md border-2 rounded-xl text-white placeholder-transparent transition-all duration-300 focus:outline-none focus:border-green-600 focus:bg-white/10 ${error ? 'border-red-400' : 'border-white/20'} ${className}`}
                    {...props}
                />
                <motion.label
                    animate={{
                        top: isFocused || hasValue ? '0.5rem' : '50%',
                        translateY: isFocused || hasValue ? 0 : '-50%',
                        fontSize: isFocused || hasValue ? '0.75rem' : '1rem',
                        color: isFocused ? colors.accent : error ? '#f87171' : 'rgba(255,255,255,0.6)',
                    }}
                    className={`absolute ${icon ? 'left-12' : 'left-4'} pointer-events-none transition-all duration-300`}
                >
                    {label}
                </motion.label>
            </motion.div>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2 ml-1"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
};

// Card Component
const Card = ({ children, className = '' }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden ${className}`}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        <div className="relative z-10">{children}</div>
    </motion.div>
);

// Tabs Component
const Tabs = ({ tabs, activeTab, onChange }) => (
    <div className="relative flex gap-2 p-1 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
        {tabs.map((tab, index) => (
            <button
                key={index}
                onClick={() => onChange(index)}
                className={`relative flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 z-10 ${
                    activeTab === index ? 'text-white' : 'text-white/60 hover:text-white/80'
                }`}
            >
                <span className="relative z-10 flex items-center justify-center gap-2">
                    {index === 0 ? <User className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                    {tab}
                </span>
                {activeTab === index && (
                    <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-600 rounded-xl"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                )}
            </button>
        ))}
    </div>
);

// Loading Spinner
const LoadingSpinner = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-green-950 via-green-700 to-green-950 z-50"
    >
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
            <Loader2 className="w-16 h-16 text-white" />
        </motion.div>
        <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white text-xl font-semibold mt-8"
        >
            Syncing field data...
        </motion.p>
    </motion.div>
);

// ============= MAIN LOGIN PAGE =============
const LoginPage = () => {
    const [activeTab, setActiveTab] = useState(0); // 0 = Farmer, 1 = Admin
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field) => (e) => {
        setFormData((prev) => ({
            ...prev,
            [field]: e.target.value.trim(),
        }));
        setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        try {
            if (activeTab === 0) {
                // Farmer Login
                const farmer = getFarmerByEmail(formData.email);

                if (!farmer) {
                    setErrors({ email: 'No farmer found with this email' });
                    setIsLoading(false);
                    return;
                }

                // Mock password check (in real app, you'd hash/compare)
                if (formData.password !== 'password') {
                    setErrors({ password: 'Incorrect password' });
                    setIsLoading(false);
                    return;
                }

                login({
                    id: farmer.id,
                    name: farmer.name,
                    email: farmer.email,
                    location: farmer.location,
                    role: 'farmer',
                });

                setShowSuccess(true);
                setTimeout(() => navigate('/farmer'), 1500);
            } else {
                // Admin Login (hardcoded for now)
                if (formData.email !== 'admin@example.com' || formData.password !== 'password') {
                    setErrors({ email: 'Invalid admin credentials' });
                    setIsLoading(false);
                    return;
                }

                login({
                    name: 'Dr. Aisha Mohammed',
                    email: 'admin@example.com',
                    role: 'admin',
                });

                setShowSuccess(true);
                setTimeout(() => navigate('/admin'), 1500);
            }
        } catch (err) {
            setErrors({ general: 'Login failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: 'ur[](https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070)',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-green-950/95 via-green-700/90 to-green-950/95" />
            </div>

            {/* Main Card */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
                <Card className="w-full max-w-md p-8 md:p-10">
                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                        className="flex justify-center mb-8"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-600 rounded-full blur-xl opacity-50" />
                            <div className="relative bg-gradient-to-r from-green-700 to-green-600 p-4 rounded-full">
                                <Leaf className="w-10 h-10 text-white" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Header */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome to IFT-DMS</h1>
                        <p className="text-white/70 text-sm md:text-base">Empowering Nigerian Agriculture Through Technology</p>
                    </motion.div>

                    {/* Tabs */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-8">
                        <Tabs
                            tabs={['Farmer / Extension Agent', 'Admin / Stakeholder']}
                            activeTab={activeTab}
                            onChange={setActiveTab}
                        />
                    </motion.div>

                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <Input
                            label="Email Address"
                            type="email"
                            icon={<Mail className="w-5 h-5" />}
                            value={formData.email}
                            onChange={handleChange('email')}
                            error={errors.email}
                            placeholder="musa@example.com"
                        />

                        <Input
                            label="Password"
                            type="password"
                            icon={<Lock className="w-5 h-5" />}
                            value={formData.password}
                            onChange={handleChange('password')}
                            error={errors.password}
                            placeholder={activeTab === 0 ? 'password123' : 'admin123'}
                        />

                        {errors.general && (
                            <p className="text-red-400 text-sm text-center">{errors.general}</p>
                        )}

                        <Button type="submit" variant="primary" isLoading={isLoading} className="w-full">
                            Sign In
                        </Button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/20" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-transparent text-white/60">Or continue with</span>
                            </div>
                        </div>

                        <Button type="button" variant="secondary" className="w-full">
                            <Chrome className="w-5 h-5" />
                            Sign in with Google
                        </Button>
                    </motion.form>

                    {/* Footer */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8 text-center">
                        <p className="text-white/50 text-xs">Powered by SpringCore Africa • 2025</p>
                    </motion.div>
                </Card>
            </div>

            {/* Success Animation */}
            <AnimatePresence>{showSuccess && <LoadingSpinner />}</AnimatePresence>
        </div>
    );
};

export default LoginPage;