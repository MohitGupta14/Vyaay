"use client";

import { toast } from "react-hot-toast";
import axios from "axios";

interface InviteResponse {
  success: boolean;
  message?: string;
}

export const inviteFriends = async (userId: String , mail: string): Promise<InviteResponse | undefined> => {
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
