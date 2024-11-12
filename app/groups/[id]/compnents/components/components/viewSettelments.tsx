"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store"; // Update this path to match your store setup
import { useEffect } from "react";
import { fetchSplits } from "@/lib/features/splits/splitSlice";

const ViewSettelments: React.FC<{ id: number }> = ({ id }) => {
  const dispatch: AppDispatch = useDispatch();

  // Get splits and loading state from Redux
  const { splits, status, error } = useSelector((state: RootState) => state.splits);

  // Dispatch action to fetch splits when the component mounts or when `id` changes
  useEffect(() => {
    if (id) {
      dispatch(fetchSplits(id)); // Fetch splits based on the transaction id
    }
  }, [id, dispatch]); // Only re-run the effect if `id` or `dispatch` changes

  // Handle loading and error states
  if (status == "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading splits: {error}</div>;
  }

  // Render splits table
  return (
    <div>
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
              <td className="px-4 py-2">{split.paid ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSettelments;
