import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProjectWorkspace from "./components/ProjectWorkspace";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectPage({ params }: Props) {

  const { id } = await params;


  const project = await prisma.project.findUnique({
    where: {
      id,
    },

    include: {
      files: true,
      folders: true, 
    },
  }); 


  if (!project) {
    notFound();
  }


  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="mx-auto max-w-7xl">


        {/* Project Header */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            {project.name}
          </h1>


          <p className="mt-3 text-gray-600">
            {project.description || "No description"}
          </p>

        </div>



        {/* Project Info */}

        <div className="rounded-xl bg-white p-6 shadow">

          <p>
            <strong>Language:</strong>{" "}
            {project.language}
          </p>


          <p className="mt-3">
            <strong>Visibility:</strong>{" "}
            {project.visibility}
          </p>


          <p className="mt-3 text-sm text-gray-500">
            Created: {project.createdAt.toDateString()}
          </p>

        </div>




        {/* Workspace */}

        <div className="mt-8 flex min-h-125 overflow-hidden rounded-xl bg-white shadow">

          <ProjectWorkspace
            files={project.files}
          />

        </div>


      </div>


    </main>
  );
}