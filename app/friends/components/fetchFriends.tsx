"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Users, Search, UserPlus, MessageCircle, MoreVertical, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { inviteFriends } from "./mail";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Session {
  user: User;
}

interface CreateGroupProps {
  session: Session;
}

export default function FetchFriends({ session }: CreateGroupProps) {
  const friends = useSelector((state: any) => state.friends.friends);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
  const [newFriendEmail, setNewFriendEmail] = useState("");

  // Create a Set to track unique friend IDs
  const uniqueFriends = new Set();
  const displayedFriends: any[] = [];

  // Flatten the friends array and filter duplicates
  friends.forEach((friendGroup: any) => {
    friendGroup.data.forEach((friend: any) => {
      if (!uniqueFriends.has(friend.friend.id)) {
        uniqueFriends.add(friend.friend.id);
        displayedFriends.push(friend.friend);
      }
    });
  });

  // Filter friends based on search term
  const filteredFriends = displayedFriends.filter((friend) => 
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg md:rounded-2xl shadow-lg w-full md:w-[100vh] h-[90vh] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#41515d] to-[#478485] text-white p-3 md:p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 md:space-x-3">
          <Users size={20} className="md:w-6 md:h-6" />
          <h2 className="text-lg md:text-xl font-bold">Friends List</h2>
        </div>
        <div className="flex items-center">
          <UserPlus 
            size={32} 
            className="cursor-pointer hover:scale-110 transition md:w-10 md:h-10" 
            onClick={() => setIsAddFriendModalOpen(true)}
          />
        </div>
      </div>

      {/* Add Friend Modal */}
      {isAddFriendModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-sm md:w-96 p-4 md:p-6 relative"
          >
            <button 
              onClick={() => setIsAddFriendModalOpen(false)}
              className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-500 hover:text-gray-800"
            >
              <X size={20} className="md:w-6 md:h-6" />
            </button>
            <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-800">Add New Friend</h3>
            <input 
              type="email" 
              placeholder="Enter friend's email" 
              value={newFriendEmail}
              onChange={(e) => setNewFriendEmail(e.target.value)}
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#50B498] mb-4 text-sm md:text-base"
            />
            <button 
              onClick={() => inviteFriends(session.user.id, newFriendEmail).then()}
              className="w-full bg-[#50B498] text-white py-2 rounded-md hover:bg-[#2C8A6E] transition text-sm md:text-base"
            >
              Send Friend Request
            </button>
          </motion.div>
        </div>
      )}

      {/* Search Bar */}
      <div className="p-3 md:p-4 bg-gray-50">
        <div className="relative">
          <Search 
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 md:w-5 md:h-5" 
          />
          <input 
            type="text" 
            placeholder="Search friends..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 md:pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#50B498] transition text-sm md:text-base"
          />
        </div>
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {filteredFriends.length > 0 ? (
            filteredFriends.map((friend) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="px-3 md:px-4 py-2 md:py-3 border-b border-gray-100 hover:bg-gray-50 transition relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div 
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#478485] text-white 
                      flex items-center justify-center font-bold uppercase text-sm md:text-base"
                    >
                      {friend.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 truncate max-w-[120px] md:max-w-[150px] text-sm md:text-base">
                        {friend.name}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 truncate max-w-[120px] md:max-w-[150px]">
                        {friend.email}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MessageCircle 
                      size={16}
                      className="text-[#50B498] hover:scale-110 transition cursor-pointer md:w-[18px] md:h-[18px]" 
                    />
                    <div className="relative">
                      <MoreVertical 
                        size={16}
                        className="text-gray-500 hover:scale-110 transition cursor-pointer md:w-[18px] md:h-[18px]"
                        onClick={() => setActiveMenu(activeMenu === friend.id ? null : friend.id)}
                      />
                      {activeMenu === friend.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute right-0 top-full mt-2 w-32 md:w-36 bg-white shadow-lg rounded-lg border z-10"
                        >
                          <ul>
                            <li className="px-3 py-2 text-xs md:text-sm hover:bg-gray-100 cursor-pointer">Profile</li>
                            <li className="px-3 py-2 text-xs md:text-sm hover:bg-gray-100 cursor-pointer">Remove</li>
                          </ul>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 md:py-10 text-gray-500 text-sm md:text-base">
              <p>No friends found.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}