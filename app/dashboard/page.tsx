// app/dashboard/page.tsx
import { options } from "../options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Sidebar from "./components/sidenav";
import CreateGroup from "./components/box";
import DashboardStats from "./components/stats";

export default async function DashboardPage() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="bg-bgGreen min-h-screen flex bg-light-dots">
      {session ? <Sidebar session={session} /> : <div>Please log in to create a group.</div>}

      <div className="flex-1 p-5">
        
        <div className="flex  items-top ">
        {session ? <DashboardStats session={session} /> : <div>Please log in to create a group.</div>}
        </div>

        {/* <div className="flex justify-center m-12">
          {session ? <CreateGroup session={session} /> : <div>Please log in to create a group.</div>}
        </div> */}
      </div>
    </div>
  );
}
