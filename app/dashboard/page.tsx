// app/dashboard/page.tsx
import { options } from "../options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Sidebar from "./components/sidenav";
import CreateGroup from "./components/box";

export default async function DashboardPage() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="bg-bgGreen min-h-screen flex bg-light-dots">
    <Sidebar />
    <div className="flex-1 p-5">
      <div className="font-bold text-2xl mb-5"> {/* Added margin-bottom for spacing */}
        <h1>Welcome {session.user.name}!!</h1>
      </div>
      <div className="flex justify-center items-center h-full -mt-12">
        <CreateGroup />
      </div>
    </div>
  </div>
  
  );
}
