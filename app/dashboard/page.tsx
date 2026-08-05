import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getProjects } from "@/lib/project";

import LogoutButton from "./LogoutButton";
import NewProjectButton from "./components/NewProjectButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-gray-100">

      {/* Header */}

      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

          <div>
            <h1 className="text-3xl font-bold text-blue-600">
              Codivra
            </h1>

            <p className="text-gray-500">
              Welcome, {session.user.name}
            </p>
          </div>

          <LogoutButton />

        </div>
      </header>


      {/* Dashboard */}

      <section className="mx-auto max-w-7xl p-8">

        <div className="mb-10 flex items-center justify-between">

          <div>
            <h2 className="text-3xl font-bold">
              My Projects
            </h2>

            <p className="mt-2 text-gray-500">
              Manage all your coding projects.
            </p>
          </div>


          {/* New Project Button */}
          <NewProjectButton />


        </div>


        {projects.length === 0 ? (

          <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-16 text-center">

            <h2 className="text-2xl font-semibold">
              No Projects Yet
            </h2>

            <p className="mt-3 text-gray-500">
              Create your first project to start coding.
            </p>

          </div>

        ) : (

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {projects.map((project) => (

              <div
                key={project.id}
                className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg"
              >

                <h3 className="text-xl font-bold">
                  {project.name}
                </h3>

                <p className="mt-3 text-gray-600">
                  {project.description || "No description"}
                </p>


                <div className="mt-5 flex items-center justify-between">

                  <span className="rounded bg-gray-100 px-3 py-1 text-sm">
                    {project.language}
                  </span>


                  <Link
                    href={`/dashboard/projects/${project.id}`}
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Open
                  </Link>


                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}