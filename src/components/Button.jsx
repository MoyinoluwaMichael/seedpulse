import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = ({
                    children,
                    variant = 'primary',
                    size = 'md',
                    loading = false,
                    disabled = false,
                    fullWidth = false,
                    leftIcon = null,
                    rightIcon = null,
                    onClick,
                    className = '',
                    type = 'button',
                    ...props
                }) => {

    const variants = {
        primary: 'bg-gradient-to-r from-[#00853E] to-[#00A86B] text-white shadow-lg shadow-[#00853E]/30 hover:shadow-xl hover:shadow-[#00853E]/40',
        secondary: 'bg-white/80 text-[#0A2F1A] border-2 border-[#00853E] hover:bg-[#F8FFF9] shadow-md shadow-[#00853E]/10',
        outline: 'bg-transparent text-[#00853E] border-2 border-[#00853E] hover:bg-[#00853E]/10',
        ghost: 'bg-transparent text-[#00853E] hover:bg-[#4CAF50]/10',
        danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40',
        success: 'bg-gradient-to-r from-[#4CAF50] to-[#00A86B] text-white shadow-lg shadow-[#4CAF50]/30 hover:shadow-xl hover:shadow-[#4CAF50]/40',
        farm: 'bg-gradient-to-br from-[#00853E] via-[#00A86B] to-[#4CAF50] text-white shadow-2xl shadow-[#00853E]/40 relative overflow-hidden'
    };

    const sizes = {
        xs: 'px-3 py-1.5 text-xs',
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
        xl: 'px-10 py-5 text-xl'
    };

    const baseClasses = `
    font-['Inter'] font-medium rounded-xl
    transition-all duration-300 ease-out
    disabled:opacity-50 disabled:cursor-not-allowed
    relative inline-flex items-center justify-center
    focus:outline-none focus:ring-4 focus:ring-[#00853E]/20
  `;

    const variantClass = variants[variant] || variants.primary;
    const sizeClass = sizes[size] || sizes.md;
    const widthClass = fullWidth ? 'w-full' : '';

    const buttonContent = (
        <>
            {/* Farm variant special background animation */}
            {variant === 'farm' && (
                <>
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div
                        className="absolute inset-0 bg-[#00A86B]/30"
                        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </>
            )}

            {/* Ripple effect container */}
            <motion.span className="absolute inset-0 rounded-xl overflow-hidden">
                <motion.span
                    className="absolute inset-0 bg-white/20"
                    initial={{ scale: 0, opacity: 1 }}
                    whileTap={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                />
            </motion.span>

            {/* Button content */}
            <span className="relative flex items-center justify-center gap-2 z-10">
        {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
        ) : leftIcon ? (
            <span className="flex-shrink-0">{leftIcon}</span>
        ) : null}

                {children && <span>{children}</span>}

                {!loading && rightIcon && (
                    <span className="flex-shrink-0">{rightIcon}</span>
                )}
      </span>
        </>
    );

    return (
        <motion.button
            type={type}
            onClick={disabled || loading ? undefined : onClick}
            disabled={disabled || loading}
            className={`
        ${baseClasses}
        ${variantClass}
        ${sizeClass}
        ${widthClass}
        ${className}
      `}
            whileHover={!disabled && !loading ? { scale: 1.02, y: -2 } : {}}
            whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25
            }}
            style={{
                backgroundImage: variant === 'primary' || variant === 'farm'
                    ? 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.05\' /%3E%3C/svg%3E")'
                    : 'none'
            }}
            {...props}
        >
            {buttonContent}
        </motion.button>
    );
};

// Button Group Component for organizing multiple buttons
export const ButtonGroup = ({ children, className = '', orientation = 'horizontal' }) => {
    return (
        <div
            className={`
        flex ${orientation === 'horizontal' ? 'flex-row gap-3' : 'flex-col gap-2'}
        ${className}
      `}
        >
            {children}
        </div>
    );
};

// Demo Component
const ButtonDemo = () => {
    const [loading, setLoading] = React.useState({});
    const [count, setCount] = React.useState(0);

    const handleClick = (buttonId) => {
        setLoading(prev => ({ ...prev, [buttonId]: true }));
        setTimeout(() => {
            setLoading(prev => ({ ...prev, [buttonId]: false }));
            setCount(prev => prev + 1);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F8FFF9] via-[#E8F5E9] to-[#F8FFF9] p-8">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-[#0A2F1A] font-['Poppins'] mb-4">
                        Button Component Library
                    </h1>
                    <p className="text-[#00853E] font-['Inter'] text-lg">
                        Production-ready buttons with Nigerian farm energy 🌾
                    </p>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="mt-6 inline-block bg-white/80 backdrop-blur-xl px-6 py-3 rounded-full border border-[#4CAF50]/20 shadow-lg"
                    >
            <span className="text-[#0A2F1A] font-['Poppins'] font-semibold">
              Button Clicks: {count} 🎯
            </span>
                    </motion.div>
                </motion.div>

                {/* Variants Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-[#00853E]/10 border border-[#4CAF50]/20"
                    style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.03\' /%3E%3C/svg%3E")'
                    }}
                >
                    <h2 className="text-2xl font-bold text-[#0A2F1A] font-['Poppins'] mb-6">
                        🎨 Button Variants
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'farm'].map((variant, idx) => (
                            <motion.div
                                key={variant}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <Button
                                    variant={variant}
                                    onClick={() => handleClick(variant)}
                                    loading={loading[variant]}
                                    fullWidth
                                >
                                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Sizes Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-[#00853E]/10 border border-[#4CAF50]/20"
                    style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.03\' /%3E%3C/svg%3E")'
                    }}
                >
                    <h2 className="text-2xl font-bold text-[#0A2F1A] font-['Poppins'] mb-6">
                        📏 Button Sizes
                    </h2>
                    <div className="flex flex-wrap items-center gap-4">
                        {['xs', 'sm', 'md', 'lg', 'xl'].map((size, idx) => (
                            <motion.div
                                key={size}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <Button
                                    size={size}
                                    onClick={() => handleClick(`size-${size}`)}
                                    loading={loading[`size-${size}`]}
                                >
                                    {size.toUpperCase()}
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Icons Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-[#00853E]/10 border border-[#4CAF50]/20"
                    style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.03\' /%3E%3C/svg%3E")'
                    }}
                >
                    <h2 className="text-2xl font-bold text-[#0A2F1A] font-['Poppins'] mb-6">
                        🎯 Buttons with Icons
                    </h2>
                    <ButtonGroup>
                        <Button
                            variant="farm"
                            leftIcon={<span>🌾</span>}
                            onClick={() => handleClick('icon-left')}
                            loading={loading['icon-left']}
                        >
                            Add Farm
                        </Button>
                        <Button
                            variant="success"
                            rightIcon={<span>📊</span>}
                            onClick={() => handleClick('icon-right')}
                            loading={loading['icon-right']}
                        >
                            View Analytics
                        </Button>
                        <Button
                            variant="secondary"
                            leftIcon={<span>⚙️</span>}
                            rightIcon={<span>→</span>}
                            onClick={() => handleClick('icon-both')}
                            loading={loading['icon-both']}
                        >
                            Settings
                        </Button>
                    </ButtonGroup>
                </motion.div>

                {/* States Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-[#00853E]/10 border border-[#4CAF50]/20"
                    style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.03\' /%3E%3C/svg%3E")'
                    }}
                >
                    <h2 className="text-2xl font-bold text-[#0A2F1A] font-['Poppins'] mb-6">
                        🔄 Button States
                    </h2>
                    <ButtonGroup>
                        <Button onClick={() => handleClick('normal')}>
                            Normal State
                        </Button>
                        <Button loading={true}>
                            Loading State
                        </Button>
                        <Button disabled={true}>
                            Disabled State
                        </Button>
                    </ButtonGroup>
                </motion.div>

                {/* Full Width Demo */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-br from-[#00853E] to-[#00A86B] rounded-3xl p-8 shadow-2xl shadow-[#00853E]/30 text-white"
                >
                    <h2 className="text-2xl font-bold font-['Poppins'] mb-6">
                        📱 Full Width Button
                    </h2>
                    <Button
                        variant="secondary"
                        size="lg"
                        fullWidth
                        leftIcon={<span>🚀</span>}
                        onClick={() => handleClick('fullwidth')}
                        loading={loading['fullwidth']}
                    >
                        Deploy to Production
                    </Button>
                </motion.div>

                {/* Usage Code */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-[#00853E]/10 border border-[#4CAF50]/20"
                >
                    <h3 className="text-2xl font-bold text-[#0A2F1A] font-['Poppins'] mb-4">
                        📖 Usage Examples
                    </h3>
                    <div className="bg-[#0A2F1A] text-[#4CAF50] p-6 rounded-xl font-mono text-sm overflow-x-auto">
            <pre>{`import Button, { ButtonGroup } from './Button';

// Basic usage
<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>

// With icons
<Button 
  variant="farm" 
  leftIcon={<Icon />}
  loading={isLoading}
>
  Submit
</Button>

// Button group
<ButtonGroup>
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Save</Button>
</ButtonGroup>`}</pre>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Button;
export { ButtonDemo };