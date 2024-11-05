"use client";

import { useState } from "react";
import Members from "./components/members";

export default function Amount() {
    const [amount, setAmount] = useState(0);
    const [handleClick, setHandleClick] = useState(false);

   

    const addAmount = () => {
        // Set handleClick to true to trigger a re-render
        setHandleClick(true);
    };

    return (
        <div className="flex justify-center p-4">
            {/* Conditionally render content based on handleClick */}
            {!handleClick ? (
                <Members />
            ) : (
                // Render a different component or content before the state change
                <div>
                    <h1 className="text-xl font-semibold">Hello! Click to Enter Amount</h1>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                        onClick={addAmount}
                    >
                        Start
                    </button>
                </div>
            )}
        </div>
    );
}
