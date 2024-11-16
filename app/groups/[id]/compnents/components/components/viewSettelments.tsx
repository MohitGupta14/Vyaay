"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store"; // Update this path to match your store setup
import { useEffect, useState } from "react";
import { fetchSplits } from "@/lib/features/splits/splitSlice";
import axios from "axios";
import { toast } from "react-hot-toast";

const ViewSettelments: React.FC<{ id: number }> = ({ id }) => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState<any>({});

  // Get splits and loading state from Redux
  const { splits, status, error } = useSelector(
    (state: RootState) => state.splits
  );


  useEffect(() => {
    if (id) {
      dispatch(fetchSplits(id)); 
    }
  }, [id, dispatch]); 

  useEffect(() => {
    splits.map((splits: any) => {
      setSelectedOption((prev: any) => ({
        ...prev,
        [splits.id]: splits.paid ? "Settled" : "Unsettled",
      }));
    });
  }, [splits]);

  // Handle loading and error states
  if (status == "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading splits: {error}</div>;
  }

  const handleSettelment = async (id: number, userId: number) => {
    try {
      // Make the API call to settle the split
      const { data, status } = await axios.patch("/api/splits", {
        action: "settled",
        id,
        userId,
      });

      // Check for successful status code
      if (status === 200) {
        toast.success(data.message);
      } else {
        // Handle unexpected status codes (if needed)
        toast.error("Unexpected response from server");
      }

      setSelectedOption((prev: any) => ({
        ...prev,
        [id]: true,
      }));
      dispatch(fetchSplits(id));
    } catch (error: any) {
      // Handle the error and show the error toast
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMessage);
    }
  };

  // Render splits table
  return (
    <div>
      {Object.keys(selectedOption).length > 0 ? (
        <table className="min-w-full bg-white shadow-md rounded-xl">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-4 text-left">Index</th>
              <th className="py-3 px-4 text-left">User ID</th>
              <th className="py-3 px-4 text-left">Shares</th>
              <th className="py-3 px-4 text-left">Paid</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {splits.map((split: any, index: number) => (
              <tr key={split.id} className="border-b border-gray-200">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{split.user.name}</td>
                <td className="px-4 py-2">{split.shares}</td>
                <td className="px-4 py-2">
                  <button
                    className="p-4 rounded-lg bg-btnGreen text-white"
                    onClick={() => handleSettelment(split.id, split.userId)}
                    disabled={selectedOption[split.id] === "Settled"}
                  >
                    {selectedOption[split.id]}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default ViewSettelments;