import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";


// Create Project
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }


    const { name, description, language } = await req.json();


    if (!name || !language) {
      return NextResponse.json(
        { error: "Project name and language are required" },
        { status: 400 }
      );
    }


    const project = await prisma.project.create({
      data: {
        name,
        description,
        language,

        // comes from NextAuth session
        ownerId: session.user.id,
      },
    });


    return NextResponse.json(project, {
      status: 201,
    });


  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );

  }
}



// Get Projects
export async function GET() {

  try {

    const session = await getServerSession(authOptions);


    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }


    const projects = await prisma.project.findMany({

      where: {
        ownerId: session.user.id,
      },

      orderBy: {
        createdAt: "desc",
      },

    });


    return NextResponse.json(projects);


  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );

  }
}