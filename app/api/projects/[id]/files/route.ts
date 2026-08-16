import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =========================
// POST /api/projects/[id]/files
// Create File
// =========================

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const {
      name,
      language,
      folderId,
    } = body;

    // =========================
    // Validate required fields
    // =========================

    if (!name || !language) {
      return NextResponse.json(
        {
          error: "Name and language required",
        },
        {
          status: 400,
        }
      );
    }

    // =========================
    // Check project
    // =========================

    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!project) {
      return NextResponse.json(
        {
          error: "Project not found",
        },
        {
          status: 404,
        }
      );
    }

    // =========================
    // Check folder if provided
    // =========================

    if (folderId) {
      const folder = await prisma.folder.findFirst({
        where: {
          id: folderId,
          projectId: id,
        },
      });

      if (!folder) {
        return NextResponse.json(
          {
            error: "Folder not found in this project",
          },
          {
            status: 404,
          }
        );
      }
    }

    // =========================
    // Create File
    // =========================

    const file = await prisma.file.create({
      data: {
        name,
        language,
        content: "",
        projectId: id,

        // null = project root
        // folder ID = file inside folder
        folderId: folderId || null,
      },

      // Return folder information too
      include: {
        folder: true,
      },
    });

    return NextResponse.json(file, {
      status: 201,
    });

  } catch (error) {
    console.error("CREATE FILE ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to create file",
      },
      {
        status: 500,
      }
    );
  }
}

// =========================
// GET /api/projects/[id]/files
// Get All Files
// =========================

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // =========================
    // Check project
    // =========================

    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!project) {
      return NextResponse.json(
        {
          error: "Project not found",
        },
        {
          status: 404,
        }
      );
    }

    // =========================
    // Get Files
    // =========================

    const files = await prisma.file.findMany({
      where: {
        projectId: id,
      },

      orderBy: {
        createdAt: "asc",
      },

      // Include folder information
      include: {
        folder: true,
      },
    });

    return NextResponse.json(files);

  } catch (error) {
    console.error("GET FILES ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch files",
      },
      {
        status: 500,
      }
    );
  }
}  