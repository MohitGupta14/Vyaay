"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

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
      setStep((prev) => prev + 1); // If we remove step 3, it will just move to submission directly
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
      // Prepare the data object
      const data = {
        groupName,
        description: groupDescription,
        adminId: session?.user?.id,
        action: "createGroup",
        invitationLink,
      };

      // Send the request (without image)
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

  return (
    <div className="rounded-lg p-10 w-1/2">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Step 1 - Group Name */}
        {step === 1 && (
          <div className="mb-6 flex items-center space-x-4">
            <input
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter the group name"
              required
              className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-darkGreen focus:border-darkGreen transition duration-200 ease-in-out"
            />
            <button
              type="button"
              onClick={handleNextStep}
              className="bg-btnGreen text-white font-semibold rounded-lg w-1/4 py-3 hover:bg-darkGreen focus:outline-none focus:ring-2 focus:ring-darkGreen focus:ring-opacity-50 transition duration-200 ease-in-out"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2 - Group Description */}
        {step === 2 && (
          <div className="mb-6">
            <label
              className="block text-gray-700 text-lg font-semibold mb-2"
              htmlFor="groupDescription"
            >
              Group Description
            </label>
            <textarea
              className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:border-darkGreen"
              id="groupDescription"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              required
            />
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="bg-gray-500 text-white font-semibold rounded-lg px-4 py-3"
                onClick={handlePrevStep}
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-btnGreen text-white font-semibold rounded-lg px-4 py-3"
                disabled={loading}
              >
                {loading ? "Creating Group..." : "Create Group"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
