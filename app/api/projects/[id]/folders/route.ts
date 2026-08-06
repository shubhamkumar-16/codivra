import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Get project id from URL
    const { id } = await params;

    // Read request body
    const body = await req.json();

    const { name } = body;

    // Validation
    if (!name) {
      return NextResponse.json(
        {
          error: "Folder name is required",
        },
        {
          status: 400,
        }
      );
    }

    // Create folder
    const folder = await prisma.folder.create({
  data: {
    name,
    projectId: id,
  },
});

    return NextResponse.json(folder, {
      status: 201,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to create folder",
      },
      {
        status: 500,
      }
    );
  }
}



// =========================//



export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const folders = await prisma.folder.findMany({
      where: {
        projectId: id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(folders);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch folders",
      },
      {
        status: 500,
      }
    );
  }
}