"use client";

import { fetchTransaction } from "@/lib/features/transactions/transactionSlice";
import { AppDispatch } from "@/lib/store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ViewTransaction from "./components/viewTransaction";
import { BeatLoading, SpinLoading} from 'respinner'

const Transactions = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams() as { id: string };
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const loadTransaction = async () => {
      await dispatch(fetchTransaction(parseInt(id)));
      setLoading(false); // Set loading to false after fetch completes
    };

    loadTransaction();
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <BeatLoading size={10} fill="bg-btnGreen" count={4} /> 
      </div>
    );
  }
  

  return (
    <div className="items-center justify-center">
      <ViewTransaction />
    </div>
  );
};

export default Transactions;
