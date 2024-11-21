// app/dashboard/page.tsx
import { options } from "../options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Sidebar from "../dashboard/components/sidenav";
import FetchFriends from "./components/fetchFriends";

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

      <div className="flex-1 p-8">
        <div className=" justify-center items-center flex"> <FetchFriends  session={session}/></div>
      </div>
    </div>
  );
}
