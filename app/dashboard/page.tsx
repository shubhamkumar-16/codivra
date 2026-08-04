import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "./LogoutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Editor window chrome */}
        <div className="rounded-t-xl bg-gray-900 px-4 py-3 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-gray-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-gray-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-gray-700" />
          <span className="ml-3 text-xs text-gray-400 font-(family-name:--font-geist-mono)">
            dashboard.ts
          </span>
        </div>

        <div className="rounded-b-xl border border-t-0 border-gray-200 bg-white px-8 py-10 shadow-xl shadow-gray-900/5">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome, {session.user?.name}
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                {session.user?.email}
              </p>
            </div>
            <LogoutButton />
          </div>

          <div className="mt-10 rounded-lg border border-gray-200 bg-gray-50 px-6 py-8">
            <p className="text-sm text-gray-500 font-(family-name:--font-geist-mono)">
              {"// TODO"}
            </p>
            <p className="mt-2 text-gray-700">
              This is your protected dashboard. Only logged-in users can see
              this page — anyone without a session gets redirected to{" "}
              <code className="rounded bg-gray-200 px-1.5 py-0.5 text-sm">
                /login
              </code>{" "}
              automatically.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}