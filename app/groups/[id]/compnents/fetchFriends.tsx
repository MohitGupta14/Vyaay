"use client";

import addFriend from "@/app/utils/svg";
import { fetchMembers } from "@/lib/features/groupMembers/memberSlice";
import { AppDispatch } from "@/lib/store";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function FetchFriends() {
  const friends = useSelector((state: any) => state.friends.friends); // Directly access friends
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const { id } = useParams() as { id: string };

  const dispatch: AppDispatch = useDispatch(); // Use the typed dispatch

  useEffect(() => {
      dispatch(fetchMembers(parseInt(id)));
  }, [dispatch]);

  const handleAddFriendsInGroup = async (memberId: number) => {
    try {
      const response = await axios.post(`/api/groups`, {
        action: "addMember",
        groupId: parseInt(id),
        memberId: memberId,
      });
  
      if(response.status === 200){
        toast.success('Successfully added in the group!')
      }else{
        toast.error(response.data.error);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error('Already present in the group!!');
      } else {
        toast.error('Unexpected error:');
        alert('An unexpected error occurred while adding the member.');
      }
    }
  };
  
  return (
    <div className="absolute top-5 right-5 p-6 ">
      <button
        onClick={toggleDropdown}
        className="bg-btnGreen text-white rounded-full p-2 hover:bg-navbar transition"
        aria-label="Add Friend"
      >
        {addFriend}{" "}
      </button>
      <div
        className={`absolute left-0 w-full mt-5 bg-white text-black rounded shadow-lg transition-all duration-300 ease-in-out ${
          isDropdownOpen ? "max-h-60 overflow-auto	" : "max-h-0"
        }`}
        style={{ transition: "max-height 0.3s ease-in-out" }}
      >
        {isDropdownOpen && (
          <div>
            {friends.map((friend: any) =>
              friend.data.map((fri: any) => {
                return (
                  <button
                  key={fri.friend.id}
                  className="w-full text-left p-2 hover:bg-gray-200 focus:outline-none" // Ensure full width and remove outline on focus
                  onClick={() => handleAddFriendsInGroup(fri.friend.id)} // Call API on click
                >
                    {fri.friend.name}
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
