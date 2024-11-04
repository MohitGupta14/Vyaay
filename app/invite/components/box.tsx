'use client';
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface BoxProps {
    mail: string;
    userId: string;
  }

const Box: React.FC<BoxProps> = ({ mail, userId }) => {
    
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
 
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mounted) return;
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.post(`/api/inviteFriends`, {
        mail,
        userId,
        action: "addFriend",
        name,
        password,
      });

      if(response.status === 200){
        toast.success(response.data.message)
      }
  
      // Redirect on success
      router.push('/login');
    } catch (error : any) {
      toast.error("something went wrong", error);
      setError("Failed to add friend. Please try again."); 
      setLoading(false);
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
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Box;