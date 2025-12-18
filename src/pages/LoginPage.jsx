import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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

// ============= REUSABLE COMPONENTS =============

// 1. Button Component
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

// 2. Input Component
const Input = ({
                   label,
                   error,
                   icon,
                   className = '',
                   type = 'text',
                   value,
                   onChange,
                   onFocus,
                   onBlur,
                   ...props
               }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value);

    const handleFocus = (e) => {
        setIsFocused(true);
        if (onFocus) onFocus(e);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        if (onBlur) onBlur(e);
    };

    const handleChange = (e) => {
        setHasValue(!!e.target.value);
        if (onChange) onChange(e);
    };

    return (
        <div className="relative w-full">
            <motion.div
                animate={{
                    scale: isFocused ? 1.02 : 1,
                }}
                className="relative"
            >
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    value={value}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={`w-full px-4 ${
                        icon ? 'pl-12' : ''
                    } pt-6 pb-2 bg-white/5 backdrop-blur-md border-2 rounded-xl text-white placeholder-transparent transition-all duration-300 focus:outline-none focus:border-green-600 focus:bg-white/10 ${
                        error ? 'border-red-400' : 'border-white/20'
                    } ${className}`}
                    {...props}
                />
                <motion.label
                    animate={{
                        top: isFocused || hasValue ? '0.5rem' : '50%',
                        translateY: isFocused || hasValue ? 0 : '-50%',
                        fontSize: isFocused || hasValue ? '0.75rem' : '1rem',
                        color: isFocused
                            ? colors.accent
                            : error
                                ? '#f87171'
                                : 'rgba(255,255,255,0.6)',
                    }}
                    className={`absolute ${
                        icon ? 'left-12' : 'left-4'
                    } pointer-events-none transition-all duration-300`}
                >
                    {label}
                </motion.label>
            </motion.div>
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-400 text-sm mt-2 ml-1"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
};

// 3. Card Component
const Card = ({ children, className = '' }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden ${className}`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
};

// 4. PageTransition Component
const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
};

// 5. FloatingLeaves Component
const FloatingLeaves = () => {
    const leaves = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 10,
    }));

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {leaves.map((leaf) => (
                <motion.div
                    key={leaf.id}
                    initial={{ y: -100, opacity: 0, rotate: 0 }}
                    animate={{
                        y: '100vh',
                        opacity: [0, 0.6, 0.6, 0],
                        rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                        x: [0, 50 * (Math.random() > 0.5 ? 1 : -1), -50 * (Math.random() > 0.5 ? 1 : -1), 0],
                    }}
                    transition={{
                        duration: leaf.duration,
                        delay: leaf.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    style={{ left: leaf.left }}
                    className="absolute"
                >
                    <Leaf className="w-6 h-6 text-green-400/30" />
                </motion.div>
            ))}
        </div>
    );
};

// 6. Tab Component
const Tabs = ({ tabs, activeTab, onChange }) => {
    return (
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
};

// 7. Loading Component
const LoadingSpinner = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-green-950 via-green-700 to-green-950 z-50"
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="relative"
            >
                <Loader2 className="w-16 h-16 text-white" />
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 border-4 border-white/20 rounded-full"
                />
            </motion.div>
            <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white text-xl font-semibold mt-8"
            >
                Syncing field data...
            </motion.p>
            <motion.div
                className="flex gap-2 mt-4"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.2,
                        },
                    },
                }}
            >
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        variants={{
                            hidden: { scale: 0 },
                            visible: { scale: 1 },
                        }}
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                            y: {
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.2,
                            },
                        }}
                        className="w-3 h-3 bg-white rounded-full"
                    />
                ))}
            </motion.div>
        </motion.div>
    );
};

// ============= MAIN LOGIN PAGE =============
const LoginPage = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();
    const { login, loading } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChange = (field) => (e) => {
        setFormData((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: '',
            }));
        }
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation...
    // (your existing validation code)

    setIsLoading(true);

    const role = activeTab === 0 ? 'farmer' : 'admin';

    const userData = {
        email: formData.email,
        role,
        name: role === 'farmer' ? 'Musa Abdullahi' : 'Dr. Aisha Mohammed',
    };

    // Mock delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    login(userData); // This now saves to sessionStorage

    setIsLoading(false);
    setShowSuccess(true); // Your existing success animation

    setTimeout(() => {
        navigate(role === 'farmer' ? '/farmer' : '/admin');
    }, 1500); // After success message
};

    return (
        <PageTransition>
            <div className="relative min-h-screen overflow-hidden">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            'ur[](https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070)',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-950/95 via-green-700/90 to-green-950/95" />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JhaW4iIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmYiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhaW4pIiBvcGFjaXR5PSIwLjAzIi8+PC9zdmc+')] opacity-30" />
                </div>

                <FloatingLeaves />

                {/* Main Content */}
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
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-center mb-8"
                        >
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                Welcome to IFT-DMS
                            </h1>
                            <p className="text-white/70 text-sm md:text-base">
                                Empowering Nigerian Agriculture Through Technology
                            </p>
                        </motion.div>

                        {/* Tabs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mb-8"
                        >
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
                                error={errors.email}
                                value={formData.email}
                                onChange={handleChange('email')}
                            />

                            <Input
                                label="Password"
                                type="password"
                                icon={<Lock className="w-5 h-5" />}
                                error={errors.password}
                                value={formData.password}
                                onChange={handleChange('password')}
                            />

                            <div className="flex justify-end">
                                <motion.a
                                    whileHover={{ x: 5 }}
                                    href="#"
                                    className="text-green-400 hover:text-green-500 text-sm font-medium transition-colors"
                                >
                                    Forgot password?
                                </motion.a>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                isLoading={isLoading}
                                disabled={isLoading}
                                className="w-full"
                            >
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/20" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-white/60">
                    Or continue with
                  </span>
                                </div>
                            </div>

                            <Button
                                type="button"
                                variant="secondary"
                                className="w-full"
                                onClick={() => alert('Google login would be integrated here')}
                            >
                                <Chrome className="w-5 h-5" />
                                Sign in with Google
                            </Button>
                        </motion.form>

                        {/* Footer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-8 text-center"
                        >
                            <p className="text-white/50 text-xs">
                                Powered by SpringCore Africa • 2025
                            </p>
                        </motion.div>
                    </Card>
                </div>

                {/* Success Loading Screen */}
                <AnimatePresence>
                    {showSuccess && <LoadingSpinner />}
                </AnimatePresence>
            </div>
        </PageTransition>
    );
};

export default LoginPage;