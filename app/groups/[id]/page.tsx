import { options } from "../../options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Sidebar from "../../dashboard/components/sidenav";
import FetchFriends from "./compnents/fetchFriends";
import Amount from "./compnents/amount";

export default async function groups() {
  
  const session = await getServerSession(options);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="bg-bgGreen min-h-screen flex bg-light-dots">
      {/* Sidebar visible only if the user is logged in */}
      {session ? (
        <Sidebar session={session} />
      ) : (
        <div className="flex justify-center items-center w-full">
          <div>Please log in to create a group.</div>
        </div>
      )}

      {/* Main content area */}
      <div className="min-h-screen flex-grow flex flex-col justify-center items-center relative w-full">
        {/* Heading */}
        {/* <h1 className="text-2xl font-semibold  mb-6 p-8">Group Split</h1> */}

        {/* Amount component centered */}
        <div className="flex justify-center items-center flex-grow w-full">
          <Amount />
        </div>

        {/* Fixed FetchFriends in top-right corner */}
        <div className="absolute top-5 right-5 p-6">
          <FetchFriends />
        </div>
      </div>
    </div>
  );
} 