import React from 'react';

const SignupBox: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-bgGreen border-darkGreen">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:border-darkGreen"
              type="email"
              id="email"
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
              required
            />
          </div>
          <button
            type="submit"
            className="bg-btnGreen text-white font-semibold rounded-lg w-full py-2 hover:bg-blue-500 transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupBox;
