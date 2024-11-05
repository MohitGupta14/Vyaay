"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Members() {
    // Fetch members from Redux store
    const { members } = useSelector((state: any) => state.members);

    // State to store the percentage input for each member
    const [percentages, setPercentages] = useState<{ [key: number]: number }>({});

    // Handle input change for percentage
    const handlePercentageChange = (memberId: number, value: number) => {
        setPercentages((prev) => ({
            ...prev,
            [memberId]: value,
        }));
    };

    // Handle the split action (You can add logic here to split amounts based on percentages)
    const handleSplit = () => {
        // Example: You can calculate the total percentage and check if it's 100%
        const totalPercentage = Object.values(percentages).reduce((sum, perc) => sum + perc, 0);

        if (totalPercentage === 100) {
            alert("Splitting amounts...");
            // Add your logic to perform the split here (e.g., dividing amounts between members)
        } else {
            alert("The total percentage should equal 100%");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center p-6">
            <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">Members Split</h2>
                <form>
                    <div className="max-h-96 overflow-y-auto mb-6">
                        {/* Scrollable container for the member inputs */}
                        {members.map((member: any) => (
                            <div key={member.id} className="flex items-center justify-between mb-4">
                                <label className="text-lg font-medium">{member.name}</label>
                                <input
                                    type="number"
                                    value={percentages[member.id] || 0}
                                    onChange={(e) =>
                                        handlePercentageChange(member.id, Number(e.target.value))
                                    }
                                    className="w-24 p-2 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter %"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex justify-center">
                        <button
                            type="button"
                            onClick={handleSplit}
                            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Split
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
