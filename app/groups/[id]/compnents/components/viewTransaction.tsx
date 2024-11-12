import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store"; // Update this path to match your store setup
import ViewSettelments from "./components/viewSettelments";

const ViewTransaction = () => {
  // State for showing the settlement modal and selected transaction ID
  const [showSettlement, setShowSettlement] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);

  // Get transactions and loading status from Redux
  const { transactions, status } = useSelector((state: RootState) => state.transactions);

  // Handle click on "Settle" button
  const handleSettleClick = (transactionId: number) => {
    setSelectedTransactionId(transactionId);  // Set the selected transaction ID
    setShowSettlement(true);  // Show the settlement modal
  };

  // Close the settlement modal
  const closeSettlement = () => {
    setShowSettlement(false);
    setSelectedTransactionId(null);  // Clear selected transaction ID when modal is closed
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="overflow-x-auto w-full max-w-7xl">
        {status !== "succeeded" ? (
          // Show loading state
          <table className="min-w-full bg-white shadow-md rounded-xl">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">Index</th>
                <th className="py-3 px-4 text-left">User</th>
              </tr>
            </thead>
            <tbody className="text-gray-900">
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <tr key={index} className="border-b border-gray-200 animate-pulse">
                    <td className="px-4 py-2 bg-gray-200">{index + 1}</td>
                    <td className="px-4 py-2 bg-gray-200">Loading...</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          // Render transactions if available
          <table className="min-w-full bg-white shadow-md rounded-xl">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">Index</th>
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Settlement</th>
              </tr>
            </thead>
            <tbody className="text-gray-900">
              {transactions && transactions.length > 0 ? (
                transactions.map((transaction: any, index: number) => (
                  <tr key={transaction.id} className="border-b border-gray-200">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{transaction.paidBy.name}</td>
                    <td className="px-4 py-2">{transaction.amount}</td>
                    <td className="px-4 py-2">{transaction.description}</td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-btnGreen p-3 rounded-lg text-white"
                        onClick={() => handleSettleClick(transaction.id)} // Pass transaction.id to the handler
                      >
                        Settle
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* Modal for settlement */}
        {showSettlement && selectedTransactionId && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <ViewSettelments id={selectedTransactionId} />
              <button
                onClick={closeSettlement}
                className="mt-4 p-2 bg-gray-200 rounded-lg text-gray-800 hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTransaction;
