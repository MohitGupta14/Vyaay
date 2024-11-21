"use client";
import axios from "axios";
import { Params } from "next/dist/server/request/params";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BeatLoading } from "respinner";

const VerifyUser = () => {
  const { id } = useParams() as unknown as Params;
  const [isVerify, setIsVerify] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await axios.patch("/api/users", { action: "verifyUser", email: id });
        setIsVerify(true);
        router.push("/login");
      } catch (error) {
        console.error("Error verifying user:", error);
      }
    };

    verifyUser();
  }, [id]);

  return isVerify ? (
    <div className="flex items-center justify-center">
      <BeatLoading size={10} fill="bg-btnGreen" count={4} />
    </div>
  ) : null;
};

export default VerifyUser;
