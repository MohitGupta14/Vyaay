"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import Members from "./components/members";

export default function Amount({ session }: { session: any }) {
  const [amount, setAmount] = useState("");
  const [handleClick, setHandleClick] = useState(false);
  const [description, setDescription] = useState("");
  const { id } = useParams() as { id: string };
  const { members } = useSelector((state: any) => state.members);

  const addAmount = () => {
    // Set handleClick to true to trigger a re-render
    setHandleClick(true);
  };

  const handleEqSplit = async () => {
    try {
      const response = await axios.post("/api/transactions", {
        amount: parseInt(amount),
        groupId: parseInt(id),
        description,
        paidByid: session.user.id,
      });

      let splits: Array<{
        userId: number;
        shares: number;
        transactionId: number;
      }> = [];

      for (let i = 0; i < members.length; i++) {
        splits.push({
          userId: members[i].id, // Assuming users is a string that can be converted to a number
          shares: parseInt(amount) / members.length,
          transactionId: response.data.id,
        });
      }

      createSplit(splits);
    } catch (error) {
      console.error("Error creating Transaction:", error);
    }
  };

  async function createSplit(splits: Array<{ [key: number]: number }>) {
    try {
      await axios.post("/api/splits", {
        data: {
          splits,
        },
      });
    } catch (error) {
      // Handle errors properly, you might want to show an error message to the user
      console.error("Error creating Split:", error);
    }
  }

  return (
    <div className="flex justify-center w-1/3">
      {/* Conditionally render content based on handleClick */}
      {handleClick ? (
        <Members
          amount={parseInt(amount)}
          setHandleClick={setHandleClick}
          session={session}
        />
      ) : (
        // Render a different component or content before the state change
        <div className="w-full">
          <div>
            <h1 className="text-xl font-semibold w-full">
              Hello! Click to Enter Amount
            </h1>
            <input
              type="number"
              className="mt-4 px-6  mr-2 py-2 border border-gray-300 rounded-md  "
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              className="mt-4 px-4 py-2 bg-btnGreen text-white rounded-md"
              onClick={addAmount}
            >
              Next
            </button>
          </div>
          {/* <div className="flex items-center justify-center ">
            <button
              className="mt-4 px-4 py-2 mr-2 bg-btnGreen text-white rounded-md"
              onClick={handleEqSplit}
            >
              Split Equally
            </button>
            
          </div> */}
        </div>
      )}
    </div>
  );
}
