"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

type MembersProps = {
  amount: number;
  session: any;
  description: string;
  handleStep1: boolean;
  handleStep2: boolean;
  setHandleStep1: React.Dispatch<React.SetStateAction<boolean>>;
  setHandleStep2: React.Dispatch<React.SetStateAction<boolean>>;
};
const Members: React.FC<MembersProps> = ({
  amount,
  session,
  description,
  setHandleStep1,
  setHandleStep2,
}) => {
  // Fetch members from Redux store
  const { members } = useSelector((state: any) => state.members);
  const { id } = useParams() as { id: string };
  const [percentages, setPercentages] = useState<{ [key: number]: number }>({});

  const handlePercentageChange = (memberId: number, value: number) => {
    setPercentages((prev) => ({
      ...prev,
      [memberId]: value,
    }));
  };
  
  async function createSplit(splits: Array<{ [key: number]: number }>) {
    try {
      toast.success("Successfully split the amount");
    
      await axios.post("/api/splits", {
        data: { splits },
      });

      setHandleStep1(false);
    } catch (error: any) {
      // Improved error handling:
      const errorMessage = error?.response?.data?.message || "An error occurred while creating the split";
  
      // Show error message
      toast.error(errorMessage);
  
      // Log the error with more detail for debugging
      console.error("Error creating split:", error);
    }
  }
  

  const handleSplit = async () => {
    // Calculate the total percentage and check if it's 100%
    const totalPercentage = Object.values(percentages).reduce((sum, perc) => sum + perc, 0);
  
    // Early return if total percentage isn't 100
    if (totalPercentage !== 100) {
      toast.error("The total percentage should equal 100%");
      return;
    }
  
  
    try {
      // Send the transaction data to the server
      const response = await axios.post("/api/transactions", {
        amount,
        groupId: parseInt(id),
        description,
        paidByid: session.user.id,
      });
  
      // Create splits directly using map() for better readability
       const splits = Object.entries(percentages).map(([userIdStr, shares]) => {
        const userId = parseInt(userIdStr);  // Convert userId from string to number
        return {
          userId,
          shares,
          transactionId: response.data.id,  // Use the returned transaction ID
        };
      });
  
      // Create the splits in the database or elsewhere
      createSplit(splits);
  
      console.log("Transaction created successfully:", response);
    } catch (error) {
      // More descriptive error handling
      console.error("Error creating transaction:", error);
    }
  };
  

  const handleBack = () => {
    setHandleStep2(false);
  };

  const handleEqSplit = async () => {
    try {
      const response = await axios.post("/api/transactions", {
        amount,
        groupId: parseInt(id),
        description,
        paidByid: session.user.id,
      });

      let splits: Array<{ userId: number; shares: number; transactionId: number }> = [];

      for (let i = 0; i < members.length; i++) {
        splits.push({
          userId: members[i].id, // Assuming users is a string that can be converted to a number
          shares: amount / members.length,
          transactionId: response.data.id,
        });
      }

      createSplit(splits);
      toast.success("Successfully split the amount");
    } catch (error) {
      console.log("Error creating Transaction:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
    <div className="bg-white w-full max-w-2xl p-8 mx-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Contribution</h2>
      <form>
        <div className="max-h-96 overflow-y-auto mb-6">
          {/* Scrollable container for the member inputs */}
          {members.map((member: any) => (
            <div
              key={member.id}
              className="flex items-center justify-between mb-4"
            >
              <label className="text-lg font-medium">{member.name}</label>
              <input
                type="number"
                onChange={(e) =>
                  handlePercentageChange(member.id, Number(e.target.value))
                }
                className="w-24 p-2 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navbar"
                placeholder="Enter %"
              />
            </div>
          ))}
        </div>
  
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-2 bg-btnGreen text-white rounded-md hover:bg-navbar focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Back
          </button>
  
          <button
            type="button"
            onClick={handleEqSplit}
            className="px-6 py-4 bg-btnGreen text-white rounded-md hover:bg-navbar focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Split Equally
          </button>
  
          <button
            type="button"
            onClick={handleSplit}
            className="px-6 py-4 bg-btnGreen text-white rounded-md hover:bg-navbar focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Split
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default Members;