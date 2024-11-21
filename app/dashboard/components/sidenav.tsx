"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Home, Users, GroupIcon, LogOut } from "lucide-react";
import { getFriendById } from "@/lib/features/friends/friendSlice";
import { AppDispatch } from "@/lib/store";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Session {
  user: User;
}

interface SidebarProps {
  session: Session;
}

export default function Sidebar({ session }: SidebarProps) {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGroupDropdownOpen, setIsGroupDropdownOpen] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getFriendById(session?.user?.id));
  }, [dispatch, session.user.id]);

  useEffect(() => {
    const fetchGroups = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await axios.get(
          `/api/groups?action=getGroupByUserId&userId=${session.user.id}`
        );
        setGroups(response.data);
      } catch (err) {
        setError("Failed to fetch groups.");
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, [session]);

  const DesktopSidebar = () => (
    <div className="hidden md:flex flex-col w-20 md:w-64 min-h-screen bg-navbar transition-all duration-300 ease-in-out">
      <nav className="flex flex-col gap-6 p-4">
        <Link
          href="/"
          className="text-white hover:bg-gray-700 p-6 font-bold text-4xl mb-6 rounded flex items-center "
        >
          𝘝𝘺𝘢𝘢𝘺
        </Link>

        <Link
          href="/dashboard"
          className="text-white hover:bg-gray-700 p-3 rounded flex gap-3"
        >
          <Home size={20} />
          <span className="hidden md:inline">Dashboard</span>
        </Link>

        <div className="relative">
          <button
            onClick={() => setIsGroupDropdownOpen(!isGroupDropdownOpen)}
            className="text-white hover:bg-gray-700 p-3 rounded w-full text-left flex items-center gap-3"
          >
            <GroupIcon size={20} />
            <span className="hidden md:inline">My Groups</span>
          </button>

          {isGroupDropdownOpen && (
            <div className="absolute left-0 w-full bg-white text-black rounded shadow-lg z-10">
              {loading ? (
                <p className="p-2">Loading groups...</p>
              ) : error ? (
                <p className="text-red-500 p-2">{error}</p>
              ) : (
                groups.map((group: any) => (
                  <Link
                    key={group.id}
                    href={`/groups/${group.id}`}
                    className="block p-2 hover:bg-gray-200"
                  >
                    {group.groupName}
                  </Link>
                ))
              )}
            </div>
          )}
        </div>

        <Link
          href="/friends"
          className="text-white hover:bg-gray-700 p-3 rounded flex items-center gap-3"
        >
          <Users size={20} />
          <span className="hidden md:inline">Friends</span>
        </Link>

        <Link
          href="/logout"
          className="text-white hover:bg-gray-700 p-3 rounded flex items-center gap-3"
        >
          <LogOut size={20} />
          <span className="hidden md:inline">Logout</span>
        </Link>
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-navbar flex justify-around items-center py-3 z-50 shadow-lg">
        <Link 
          href="/" 
          className="flex flex-col items-center text-white hover:text-gray-300"
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <div className="relative">
          <button 
            onClick={() => setIsGroupDropdownOpen(!isGroupDropdownOpen)}
            className="flex flex-col items-center text-white hover:text-gray-300"
          >
            <GroupIcon size={20} />
            <span className="text-xs mt-1">Groups</span>
          </button>

          {isGroupDropdownOpen && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-48 bg-white text-black rounded shadow-lg z-10 mb-2">
              {loading ? (
                <p className="p-2">Loading groups...</p>
              ) : error ? (
                <p className="text-red-500 p-2">{error}</p>
              ) : (
                groups.map((group: any) => (
                  <Link
                    key={group.id}
                    href={`/groups/${group.id}`}
                    className="block p-2 hover:bg-gray-200"
                  >
                    {group.groupName}
                  </Link>
                ))
              )}
            </div>
          )}
        </div>

        <Link 
          href="/friends" 
          className="flex flex-col items-center text-white hover:text-gray-300"
        >
          <Users size={20} />
          <span className="text-xs mt-1">Friends</span>
        </Link>

        <Link 
          href="/logout" 
          className="flex flex-col items-center text-white hover:text-gray-300"
        >
          <LogOut size={20} />
          <span className="text-xs mt-1">Logout</span>
        </Link>
      </div>
    </>
  );
}