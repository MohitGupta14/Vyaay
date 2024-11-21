'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';

const SignupBox: React.FC = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mounted) return;
    setLoading(true);
    setError(null);

    try {
      await axios.post('/api/users', {
        name,
        email,
        password,
      });

      toast.success("Account created! Verify your email and let's get started!");
      router.push('/login');
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="signup-container relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Lighter Gradient Background Animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-[#F0FFDF] via-[#E6F5E0] to-[#D0F0C0] bg-size-200 animate-gradient"
        initial={{ backgroundPosition: '0% 50%' }}
        animate={{ 
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-6 border border-[#468585]/30"
      >
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center text-[#508D4E] mb-6"
        >
          Create Account
        </motion.h2>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-[#508D4E] text-sm font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#468585]" size={20} />
              <input
                className="pl-10 border border-[#468585]/30 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-[#50B498] transition duration-300"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-[#508D4E] text-sm font-semibold mb-2" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#468585]" size={20} />
              <input
                className="pl-10 border border-[#468585]/30 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-[#50B498] transition duration-300"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-[#508D4E] text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#468585]" size={20} />
              <input
                className="pl-10 pr-10 border border-[#468585]/30 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-[#50B498] transition duration-300"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#468585]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            type="submit"
            disabled={loading}
            style={{ backgroundColor: '#50B498' }}
            className="text-white font-semibold rounded-lg w-full py-3 hover:opacity-90 transition duration-300 ease-in-out transform disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <span className="animate-pulse">Creating Account...</span>
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default SignupBox;