import React from 'react';

const Navbar: React.FC = () => {
    return(
        <nav className="bg-white/90 backdrop-blur-md shadow-lg fixed top-2 left-2 right-2 mx-auto max-w-screen-2xl	 rounded-xl z-50 border border-gray-100">
            <div className="px-4 py-3 flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center space-x-3">
                    <svg 
                        width="40" 
                        height="40" 
                        viewBox="0 0 100 100" 
                        className="rounded-lg"
                    >
                        <rect width="100" height="100" fill="#10B981" rx="15"/>
                        <text 
                            x="50%" 
                            y="50%" 
                            dominantBaseline="middle" 
                            textAnchor="middle" 
                            fill="white" 
                            fontSize="50"
                            fontWeight="bold"
                        >
                            V
                        </text>
                    </svg>
                    <span className="text-2xl font-bold text-emerald-800">𝘝𝘺𝘢𝘢𝘺</span>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center space-x-6">
                   
                    <div className="flex items-center space-x-4">
                        <a 
                            href="/login" 
                            className="text-emerald-700 hover:text-emerald-900 font-semibold transition-colors"
                        >
                            Login
                        </a>
                        <a 
                            href="/signup" 
                            className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg 
                            hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg"
                        >
                            Sign Up
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar