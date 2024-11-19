import React, { useState, ChangeEvent } from "react";
import { toast } from "react-hot-toast";
import Members from "./members";

const Description: React.FC<{
  description: string;
  amount: number;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  session: any;
  handleStep1: boolean;
  handleStep2: boolean;
  setHandleStep1: React.Dispatch<React.SetStateAction<boolean>>;
  setHandleStep2: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  description,
  setDescription,
  amount,
  session,
  handleStep1,
  handleStep2,
  setHandleStep1,
  setHandleStep2,
}) => {
  const handleNext = () => {
    
    if(description.length < 10){
     toast.error("Please write a description of atleast 10 characters");
     return;
    }
    setHandleStep2(true);
  };

  const handleBack = () => {
    setHandleStep1(false);
  };

  return (
    <div className="flex w-8/12">
      {!handleStep2 ? (
        <div className="w-full text-center mb-16">
            <textarea
              className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:border-darkGreen"
              id="groupDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter the description of the transaction"
              required
            />
            <div className="flex">
              <button
                className="px-4 py-2 mx-2 text-white bg-btnGreen rounded-lg "
                onClick={handleBack}
              >
                Back
              </button>

              <button
                className="px-4 py-2 mx-2 text-white bg-btnGreen rounded-lg end "
                onClick={handleNext}
              >
                Next
              </button>
            </div>
        </div>
      ) : (
        <Members
          amount={amount}
          session={session}
          description={description}
          handleStep1={handleStep1}
          handleStep2={handleStep2}
          setHandleStep1={setHandleStep1}
          setHandleStep2={setHandleStep2}
        />
      )}
    </div>
  );
};

export default Description;
