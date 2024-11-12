import { options } from "../../options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Sidebar from "../../dashboard/components/sidenav";
import FetchFriends from "./compnents/fetchFriends";
import Amount from "./compnents/amount";
import Transactions from "./compnents/transactions";

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
        <div className="flex justify-center items-center w-full p-4">
          <div>Please log in to create a group.</div>
        </div>
      )}

      {/* Main content area */}
      <div className="min-h-screen flex-grow flex flex-col w-full">
        {/* Amount component centered */}
        <div className="flex justify-center items-center m-8 flex-grow">
          <Amount session={session as any} />
        </div>

        {/* Fixed FetchFriends in top-right corner */}
        <div className="absolute top-5 right-5 p-6">
          <FetchFriends />
        </div>

        {/* Center Transactions in the middle of the screen */}
        <div className="flex justify-center items-center flex-grow">
          <div className="w-full max-w-4xl p-4">
            <Transactions />
          </div>
        </div>
      </div>
    </div>
  );
}
