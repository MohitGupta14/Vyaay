// app/dashboard/page.tsx
import { options } from "../options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Sidebar from "../dashboard/components/sidenav";
import FetchFriends from "./components/fetchFriends";
import addFriend from "../utils/svg";
import Mail from "./components/mail";

export default async function friend() {
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
        <div className="font-bold text-3xl mb-5">
          {" "}
          {/* Added margin-bottom for spacing */}
          <h1>Welcome {session.user.name}!!</h1>
          <div className="absolute top-40 right-6 m-10 p-4">
            <Mail userId={session.user.id}/>
          </div>
      </div>
        <div className="p-5"> <FetchFriends /></div>
      </div>
    </div>
  );
}
