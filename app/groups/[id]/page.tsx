// app/dashboard/page.tsx
import { options } from "../../options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Sidebar from "../../dashboard/components/sidenav";

export default async function groups() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/login");
  }

  const addFriend = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="7" r="4" />
      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <line x1="20" y1="8" x2="20" y2="12" />
      <line x1="18" y1="10" x2="22" y2="10" />
    </svg>
  );
  return (
    <div className="bg-bgGreen min-h-screen flex bg-light-dots">
      {session ? (
        <Sidebar session={session} />
      ) : (
        <div>Please log in to create a group.</div>
      )}

      <div className="flex-1 p-5">
        <div className="font-bold text-2xl mb-5">
          {" "}
          {/* Added margin-bottom for spacing */}
          <h1>Welcome {session.user.name}!!</h1>
        </div>
        <div className="absolute top-5 right-5 p-6 ">
          <button
            // onClick={} // Replace with your click handler function
            className="bg-btnGreen text-white rounded-full p-2 hover:bg-navbar transition"
            aria-label="Add Friend" 
          >
            {addFriend}{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
