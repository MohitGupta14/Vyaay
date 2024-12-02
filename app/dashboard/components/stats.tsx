"use client";
import React, { useState, useEffect } from "react";
import { Users, Group, DollarSign, UserCircle2, PlusCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import Box from "./box";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Session {
  user: User;
}

interface CreateGroupProps {
  session: Session;
}

export default function Stats({ session }: CreateGroupProps) {
  const [userData, setUserData] = useState({
    name: session.user.name,
    totalFriends: 120,
    totalGroups: 15,
    totalTransactions: 45,
    totalUnsetteledTransactions: 7
  });
  const [loading, setLoading] = useState(true);
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const StatCard: React.FC<{ 
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; 
    title: string; 
    value: number | string; 
    loading: boolean; 
    variant?: "default" | "profile" | "add" | "warning"; 
    onClick?: () => void; 
    className?: string;
  }> = ({ 
    icon: Icon, 
    title, 
    value, 
    loading, 
    variant = "default", 
    onClick = () => {}, 
    className = "" 
  }) => (
    <motion.div 
      variants={itemVariants}
      onClick={onClick}
      className={`
        bg-white shadow-lg p-4 sm:p-6 md:p-8 rounded-lg flex flex-col items-center justify-center text-center 
        transition-all duration-300 cursor-pointer
        hover:scale-105 hover:shadow-xl
        ${variant === "profile" ? "bg-gradient-to-r from-[#50B498] to-[#2C8A6E] text-white" : 
        variant === "add" ? "border-2 border-dashed border-[#50B498] text-[#50B498]" :
        variant === "warning" ? "border-2 border-red-500 text-red-500" : ""}
        ${className}
      `}
    >
      {variant === "profile" ? (
        <div className="flex flex-col items-center">
          <UserCircle2 size={48} className="text-white mb-2 sm:mb-4" />
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">{value}</h2>
          <p className="text-xs sm:text-sm font-medium opacity-80">Personal Profile</p>
        </div>
      ) : variant === "add" ? (
        <div className="flex flex-col items-center">
          <PlusCircle size={48}  className="mb-2 sm:mb-4" />
          <h3 className="text-base sm:text-lg md:text-xl font-semibold">Add Group</h3>
        </div>
      ) : (
        <>
          <Icon className={`
            ${variant === "warning" ? "text-red-500" : "text-[#50B498]"} 
            w-8 h-8 sm:w-10 sm:h-10
          `} />
          <h3 className="mt-2 sm:mt-4 text-base sm:text-lg md:text-xl font-semibold text-gray-700">{title}</h3>
          <motion.p 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`
              text-2xl sm:text-3xl md:text-xl font-bold mt-1 sm:mt-2
              ${variant === "warning" ? "text-red-500" : "text-[#50B498]"}
            `}
          >
            {loading ? (
              <span className="animate-pulse text-gray-400">Loading...</span>
            ) : (
              value
            )}
          </motion.p>
        </>
      )}
    </motion.div>
  );

  const handleModalClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsAddGroupModalOpen(false);
    }
  };

  return (
    <>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-[#DEF9C4] p-4 sm:p-6 w-full flex items-top"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          <StatCard 
            icon={UserCircle2} 
            title="Profile" 
            value={userData.name} 
            loading={loading}
            variant="profile"
            className="col-span-2 sm:col-span-1 w-full"
          />
          <StatCard 
            icon={Users} 
            title="Total Friends" 
            value={userData.totalFriends} 
            loading={loading} 
            className="w-full"
          />
          <StatCard 
            icon={Group} 
            title="Total Groups" 
            value={userData.totalGroups} 
            loading={loading} 
            className="w-full"
          />
          <StatCard 
            icon={DollarSign} 
            title="Total Transactions" 
            value={userData.totalTransactions} 
            loading={loading} 
            className="w-full"
          />
          <StatCard 
            icon={AlertCircle} 
            title="Unsettled Transactions" 
            value={userData.totalUnsetteledTransactions} 
            loading={loading} 
            variant="warning"
            className="w-full"
          />
          <StatCard 
            icon={PlusCircle} 
            title="Add Group" 
            value="Add Group" 
            loading={loading}
            variant="add"
            onClick={() => setIsAddGroupModalOpen(true)}
            className="col-span-2 w-full"
          />
        </div>
      </motion.div>

      {/* Modal code remains the same */}
      <AnimatePresence>
        {isAddGroupModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            onClick={handleModalClose}
          >
            <motion.div
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 100 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <Box 
                session={session} 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}