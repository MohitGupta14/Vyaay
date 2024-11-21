// pages/index.tsx
"use client";

import Link from "next/link";
import Navbar from "./components/navbar.";
import Footer from "./components/footer";
import { motion } from 'framer-motion';

import { 
  Wallet as WalletIcon, 
  Users as UsersIcon, 
  BarChart2 as ChartBarIcon 
} from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-bgGreen min-h-screen flex flex-col overflow-x-hidden">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-16 bg-light-dots">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Main Headline */}
            <h2 className="mt-20 font-funnel text-2xl md:text-5xl font-semibold text-gray-800 leading-tight">
             Effortlessly Split and Track Expenses with{" "}
              <span className="text-darkGreen font-extrabold">𝘝𝘺𝘢𝘢𝘺</span>
            </h2>
            
            {/* Subheadline */}
            <p className="text-lg md:text-xl text-green-800 max-w-2xl mx-auto">
              Simplify group expenses with intelligent tracking and seamless splitting
            </p>
            
            {/* Call to Action */}
            <div className="pt-8">
              <Link href="/signup">
                <button className="px-10 py-4 bg-btnGreen text-white font-semibold 
                  rounded-full shadow-lg transform transition-all 
                  hover:scale-105 hover:bg-darkGreen 
                  focus:outline-none focus:ring-2 focus:ring-darkGreen focus:ring-opacity-50
                  text-lg">
                  Get Started
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Feature Highlights */}
          <div className="mt-16 grid md:grid-cols-3 gap-6 px-4">
            {[
              {
                icon: <WalletIcon className="w-12 h-12 text-darkGreen mx-auto" />,
                title: "Easy Splitting",
                description: "Divide expenses with a single tap"
              },
              {
                icon: <UsersIcon className="w-12 h-12 text-darkGreen mx-auto" />,
                title: "Group Management",
                description: "Track shared expenses across multiple groups"
              },
              {
                icon: <ChartBarIcon className="w-12 h-12 text-darkGreen mx-auto" />,
                title: "Detailed Reports",
                description: "Get insights into your spending patterns"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md 
                  hover:shadow-xl transition-all group"
              >
                <div className="transition-transform group-hover:scale-105">
                  {feature.icon}
                  <h3 className="mt-4 text-xl font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;

