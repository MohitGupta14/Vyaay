"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Home, Users, GroupIcon, LogOut } from "lucide-react";
import { getFriendById } from "@/lib/features/friends/friendSlice";
import { AppDispatch } from "@/lib/store";
import GroupsModal from "./groupmodal";


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
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

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
          className="text-white hover:bg-gray-700 p-6 font-bold text-4xl mb-6 rounded flex items-center"
        >
          𝘝𝘺𝘢𝘢𝘺
        </Link>

        <Link
          href="/dashboard"
          className="text-white hover:bg-gray-700 p-3 rounded flex gap-3 items-center transition-colors duration-200"
        >
          <Home size={20} />
          <span className="hidden md:inline">Dashboard</span>
        </Link>

        <button
          onClick={() => setIsGroupModalOpen(true)}
          className="text-white hover:bg-gray-700 p-3 rounded w-full text-left flex items-center gap-3 transition-colors duration-200"
        >
          <GroupIcon size={20} />
          <span className="hidden md:inline">My Groups</span>
        </button>

        <Link
          href="/friends"
          className="text-white hover:bg-gray-700 p-3 rounded flex items-center gap-3 transition-colors duration-200"
        >
          <Users size={20} />
          <span className="hidden md:inline">Friends</span>
        </Link>

        <Link
          href="/logout"
          className="text-white hover:bg-gray-700 p-3 rounded flex items-center gap-3 transition-colors duration-200"
        >
          <LogOut size={20} />
          <span className="hidden md:inline">Logout</span>
        </Link>
      </nav>
    </div>
  );

  return (
    <>
      <DesktopSidebar />

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-navbar flex justify-around items-center py-3 z-40 shadow-lg">
        <Link 
          href="/" 
          className="flex flex-col items-center text-white hover:text-gray-300 transition-colors duration-200"
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <button
          onClick={() => setIsGroupModalOpen(true)}
          className="flex flex-col items-center text-white hover:text-gray-300 transition-colors duration-200"
        >
          <GroupIcon size={20} />
          <span className="text-xs mt-1">Groups</span>
        </button>

        <Link 
          href="/friends" 
          className="flex flex-col items-center text-white hover:text-gray-300 transition-colors duration-200"
        >
          <Users size={20} />
          <span className="text-xs mt-1">Friends</span>
        </Link>

        <Link 
          href="/logout" 
          className="flex flex-col items-center text-white hover:text-gray-300 transition-colors duration-200"
        >
          <LogOut size={20} />
          <span className="text-xs mt-1">Logout</span>
        </Link>
      </div>

      {/* Groups Modal */}
      <GroupsModal
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
        groups={groups}
        loading={loading}
        error={error}
      />
    </>
  );
}