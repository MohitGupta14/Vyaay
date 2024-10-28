// app/components/Sidebar.tsx
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-navbar p-5 flex flex-col">
      <nav className="flex flex-col gap-4">

      <Link href="/" className="text-white hover:bg-gray-700 p-2 font-bold text-4xl mb-6 rounded">
      𝘝𝘺𝘢𝘢𝘺
        </Link>
        <Link href="/my-group" className="text-white hover:bg-gray-700 p-2 rounded">
          My Group
        </Link>
        <Link href="/join-group" className="text-white hover:bg-gray-700 p-2 rounded">
          Join Group
        </Link>
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
