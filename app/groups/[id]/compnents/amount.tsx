"use client";

import { useState } from "react";
import Members from "./components/members";

export default function Amount({ session }: { session: any }) {
    const [amount, setAmount] = useState("");
    const [handleClick, setHandleClick] = useState(false);

    const addAmount = () => {
        // Set handleClick to true to trigger a re-render
        setHandleClick(true);
    };

    return (
        <div className="flex justify-center items-center w-1/3">
            {/* Conditionally render content based on handleClick */}
            {handleClick ? (
                <Members amount={parseInt(amount)} setHandleClick={setHandleClick} session = {session} />
            ) : (
                // Render a different component or content before the state change
                <div className="w-full">
                    <h1 className="text-xl font-semibold w-full">Hello! Click to Enter Amount</h1>
                    <input
                        type="number"
                        className="mt-4 px-16  mr-2 py-2 border border-gray-300 rounded-md  "
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
            )}
        </div>
    );
}
