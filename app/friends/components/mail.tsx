"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import addFriend from "@/app/utils/svg";

interface AddFriendParams {
  userId: string; // Adjust type if necessary (e.g., number)
  mail: string;
}

interface InviteResponse {
  success: boolean;
  message?: string;
}

export default function Mail({ userId }: { userId: number }) {
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  const inviteFriends = async (mail: string): Promise<InviteResponse | undefined> => {
    try {
      const response = await axios.post<InviteResponse>('/api/inviteFriends', {
        userId,
        mail,
        action: 'sendMail'
      });

      if (response.status === 200) {
        toast.success("Email sent successfully");
      }

      return response.data;
    } catch (error: any) {
      toast.error('Error adding friend: ' + error.message);
      return undefined;
    }
  };

  const handleButtonClick = async () => {
    const email = prompt("Enter the email address to send the invite:");

    if (email) {
      await inviteFriends(email); // Send the invite with the entered email
    }
  };

  return (
    <div className="relative">
      {/* Button to trigger the email prompt */}
      <button
        onClick={handleButtonClick}
        className="absolute bottom-2 right-5 bg-btnGreen text-white rounded-full p-2 hover:bg-navbar transition"
        aria-label="Add Friend"
      >
        {addFriend}
      </button>
    </div>
  );
}
