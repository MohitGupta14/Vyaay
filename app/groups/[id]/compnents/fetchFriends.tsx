"use client";

import addFriend from "@/app/utils/svg";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function FetchFriends() {
  const friends = useSelector((state: any) => state.friends.friends); // Directly access friends
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const { id } = useParams() as { id: string };

  const handleAddFriendsInGroup = async (memberId: number) => {
    await axios.post(`/api/groups`, {
      action: "addMember",
      groupId: parseInt(id),
      memberId: memberId,
    });
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
          isDropdownOpen ? "max-h-60 overflow-hidden" : "max-h-0"
        }`}
        style={{ transition: "max-height 0.3s ease-in-out" }}
      >
        {isDropdownOpen && (
          <div>
            {friends.map((friend: any) =>
              friend.data.map((fri: any) => {
                return (
                  <p
                    key={fri.friend.id}
                    className="block p-2 hover:bg-gray-200"
                    onClick={() => handleAddFriendsInGroup(fri.friend.id)} // Call API on click
                  >
                    {fri.friend.name}
                  </p>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
