"use client";

import { useSelector } from "react-redux";

export default function FetchFriends() {
  const friends = useSelector((state: any) => state.friends.friends); // Directly access friends

  return (
    <div className="m-4 p-4 bg-white rounded-lg shadow-md w-8/12">
      <h2 className="text-xl font-semibold mb-4">Friends List</h2>
      <div className="grid grid-cols-1 gap-4">
        {friends.length > 0 ? (
          friends.map((friendGroup: any) =>
            friendGroup.data.map((friend: any) => (
              <p key={friend.friend.id} className="block p-2 border-b hover:bg-gray-200 transition duration-200">
                {friend.friend.name}
              </p>
            ))
          )
        ) : (
          <p className="text-gray-500">No friends found.</p>
        )}
      </div>
    </div>
  );
}
