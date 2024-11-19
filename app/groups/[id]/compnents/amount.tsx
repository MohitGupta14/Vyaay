"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import Description from "./components/description";

export default function Amount({ session }: { session: any }) {
  const [amount, setAmount] = useState("");
  const [handleStep1, setHandleStep1] = useState(false);
  const [handleStep2, setHandleStep2] = useState(false)
  const [description, setDescription] = useState("");

  const addAmount = () => {
    // Set handleClick to true to trigger a re-render
    if(amount.length == 0 || parseInt(amount)<=0){
      toast.error("Please enter a valid amount");
      return; 
    }
    setHandleStep1(true);
  };

  return (
    <div className="flex justify-center w-full">
      {handleStep1 ? (
        <Description
          description={description}
          setDescription={setDescription}
          amount={parseInt(amount, 10)} 
          session={session}
          handleStep1={handleStep1}
          handleStep2={handleStep2}
          setHandleStep1={setHandleStep1}
          setHandleStep2={setHandleStep2}
        />
      ) : (
        // Render a different component or content before the state change
        <div className="flex w-8/12">
          <div className="w-full text-center mb-16">
           
            <div className="flex px-4">
              <input
                type="number"
                className="mt-4 px-6 py-2 w-full border border-gray-300 rounded-md"
                value={amount}
                placeholder="Enter Amount which will be split"
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <button
                className="mt-4 px-4 py-2 bg-btnGreen text-white rounded-md"
                onClick={addAmount}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
}
