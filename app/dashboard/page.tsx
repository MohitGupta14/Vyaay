// app/dashboard/page.tsx
import { options } from "../options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="bg-bgGreen min-h-screen flex flex-col">
      <div>
        <h1>Welcome, {session.user?.name || session.user?.email}!</h1>
      </div>
    </div>
  );
}
