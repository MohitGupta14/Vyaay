'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const SignupBox: React.FC = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      // Register the user by sending data to your backend
    
      await axios.post('/api/users', {
        name,
        email,
        password,
      });

      toast.success("Account created! Verify your email and let's get started!");

    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
      router.push('/login')
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-bgGreen border-darkGreen">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:border-darkGreen"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:border-darkGreen"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:border-darkGreen"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="bg-btnGreen text-white font-semibold rounded-lg w-full py-2 hover:bg-blue-500 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* <div className="mt-6 text-center">
          <p className="text-gray-500">or</p>
          <button
            onClick={handleGoogleSignIn}
            className="bg-red-600 text-white font-semibold rounded-lg w-full py-2 hover:bg-red-500 transition duration-200 mt-4"
            disabled={loading}
          >
            {loading ? 'Signing in with Google...' : 'Sign Up with Google'}
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default SignupBox;
