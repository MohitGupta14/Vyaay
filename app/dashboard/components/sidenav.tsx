// app/components/Sidebar.tsx
"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email : string
}

interface Session {
  user: User;
}

interface CreateGroupProps {
  session: Session;
}
export default function Sidebar({ session }: CreateGroupProps) {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await axios.get(`/api/groups?action=getGroupByUserId&userId=${session.user.id}`);
        setGroups(response.data); // Assuming the API returns an array of groups
      } catch (err) {
        console.error(err);
        setError("Failed to fetch groups.");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [session]);

  return (
    <div className="w-64 min-h-screen bg-navbar p-5 flex flex-col">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="text-white hover:bg-gray-700 p-2 font-bold text-4xl mb-6 rounded">
          𝘝𝘺𝘢𝘢𝘺
        </Link>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
            className="text-white hover:bg-gray-700 p-2 rounded w-full text-left"
          >
            My Groups
          </button>

          {/* Animate dropdown */}
          <div
            className={`absolute left-0 w-full bg-white text-black rounded shadow-lg transition-all duration-300 ease-in-out ${isDropdownOpen ? 'max-h-60 overflow-hidden' : 'max-h-0'}`}
            style={{ transition: 'max-height 0.3s ease-in-out' }}
          >
            {isDropdownOpen && (
              <>
                {loading ? (
                  <p className="p-2">Loading groups...</p>
                ) : error ? (
                  <p className="text-red-500 p-2">{error}</p>
                ) : (
                  groups.map((group: any) => (
                    <Link key={group.id} href={`/groups/${group.id}`} className="block p-2 hover:bg-gray-200">
                      {group.groupName}
                    </Link>
                  ))
                )}
              </>
            )}
          </div>
        </div>

        <Link href="/friends" className="text-white hover:bg-gray-700 p-2 rounded">
          Friends
        </Link>
        <Link href="/logout" className="text-white hover:bg-gray-700 p-2 rounded">
          Logout
        </Link>
      </nav>
    </div>
  );
}