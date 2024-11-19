"use client";

import { useSelector } from "react-redux";

export default function FetchFriends() {
  const friends = useSelector((state: any) => state.friends.friends); 

  // Create a Set to track unique friend IDs
  const uniqueFriends = new Set();
  const displayedFriends: String[] = [];

  // Flatten the friends array and filter duplicates
  friends.forEach((friendGroup: any) => {
    friendGroup.data.forEach((friend: any) => {
      if (!uniqueFriends.has(friend.friend.id)) {
        uniqueFriends.add(friend.friend.id);
        displayedFriends.push(friend.friend);
      }
    });
  });

  return (
    <div className="m-4 p-4 bg-white rounded-lg shadow-md w-8/12">
      <h2 className="text-xl font-semibold mb-4">Friends List</h2>
      <div className="grid grid-cols-1 gap-4 overflow-auto h-[75vh]">
        {displayedFriends.length > 0 ? (
          displayedFriends.map((friend: any) => (
            <p key={friend.id} className="block p-2 border-b hover:bg-gray-200 transition duration-200">
              {friend.name}
            </p>
          ))
        ) : (
          <p className="text-gray-500">No friends found.</p>
        )}
      </div>
    </div>
  );
}
