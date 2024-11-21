"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function Box({ session }: CreateGroupProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [invitationLink, setInvitationLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNextStep = () => {
    setError(null);
    if (step === 1 && !groupName) {
      setError("Group name is required.");
    } else if (step === 2 && !groupDescription) {
      setError("Group description is required.");
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setError(null);
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = {
        groupName,
        description: groupDescription,
        adminId: session?.user?.id,
        action: "createGroup",
        invitationLink,
      };

      await axios.post("/api/groups", data);
      toast.success("Group created successfully");
      router.push("/dashboard"); 
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred. Please try again."); 
    } finally {
      setLoading(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.9 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.1 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <motion.div 
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="bg-[#DEF9C4]  flex items-center justify-center  bg-opacity-100"
    >
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl w-full max-w-md md:max-w-lg lg:max-w-xl p-8 border border-[#50B498]/20"
      >
        <div className="flex items-center justify-center mb-6">
          <Users className="w-12 h-12 text-[#50B498] mr-3" />
          <h2 className="text-2xl md:text-3xl font-bold text-[#468585]">Create New Group</h2>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-4 text-center"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {/* Step 1 - Group Name */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <label 
                    htmlFor="groupName" 
                    className="block text-[#508D4E] mb-2 font-semibold"
                  >
                    Group Name
                  </label>
                  <input
                    id="groupName"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter group name"
                    required
                    className="w-full p-3 border border-[#50B498]/50 rounded-lg focus:ring-2 focus:ring-[#50B498] transition-all duration-300"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full bg-[#50B498] text-white py-3 rounded-lg hover:bg-[#468585] transition-colors duration-300"
                >
                  Next
                </button>
              </motion.div>
            )}

            {/* Step 2 - Group Description */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <label 
                    htmlFor="groupDescription" 
                    className="block text-[#508D4E] mb-2 font-semibold"
                  >
                    Group Description
                  </label>
                  <textarea
                    id="groupDescription"
                    value={groupDescription}
                    onChange={(e) => setGroupDescription(e.target.value)}
                    placeholder="Describe your group"
                    required
                    rows={4}
                    className="w-full p-3 border border-[#50B498]/50 rounded-lg focus:ring-2 focus:ring-[#50B498] transition-all duration-300"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="w-1/2 bg-gray-200 text-[#468585] py-3 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-1/2 bg-[#50B498] text-white py-3 rounded-lg hover:bg-[#468585] transition-colors disabled:opacity-50"
                  >
                    {loading ? "Creating..." : "Create Group"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </motion.div>
  );
}