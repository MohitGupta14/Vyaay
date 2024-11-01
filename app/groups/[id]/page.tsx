import { options } from "../../options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Sidebar from "../../dashboard/components/sidenav";
import FetchFriends from "./compnents/fetchFriends";

export default async function groups() {
  
  const session = await getServerSession(options);

  if (!session) {
    redirect("/login");
  }
  
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
          <h1>Welcome {session?.user?.name} </h1>
        </div>
        <div className="absolute top-5 right-5 p-6 ">
         <FetchFriends/>
        </div>
      </div>
    </div>
  );
}
