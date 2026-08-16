import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =====================================================
// POST /api/projects/[id]/files
// Create File
// =====================================================

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params;

    const body = await req.json();

    const { name, language } = body;

    if (!name || !language) {
      return NextResponse.json(
        {
          error: "Name and language are required",
        },
        {
          status: 400,
        }
      );
    }

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
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

    const file = await prisma.file.create({
      data: {
        name,
        language,
        content: "",
        projectId,
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

// =====================================================
// GET /api/projects/[id]/files
// Get All Files
// =====================================================

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params;

    const files = await prisma.file.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(files, {
      status: 200,
    });
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

// =====================================================
// PATCH /api/projects/[id]/files
// Rename File
// =====================================================

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params;

    const body = await req.json();

    const { fileId, name } = body;

    if (!fileId || !name) {
      return NextResponse.json(
        {
          error: "fileId and name are required",
        },
        {
          status: 400,
        }
      );
    }

    const existingFile = await prisma.file.findFirst({
      where: {
        id: fileId,
        projectId,
      },
    });

    if (!existingFile) {
      return NextResponse.json(
        {
          error: "File not found",
        },
        {
          status: 404,
        }
      );
    }

    const updatedFile = await prisma.file.update({
      where: {
        id: fileId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(updatedFile, {
      status: 200,
    });
  } catch (error) {
    console.error("RENAME FILE ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to rename file",
      },
      {
        status: 500,
      }
    );
  }
}

// =====================================================
// DELETE /api/projects/[id]/files
// Delete File
// =====================================================

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params;

    const body = await req.json();

    const { fileId } = body;

    if (!fileId) {
      return NextResponse.json(
        {
          error: "fileId is required",
        },
        {
          status: 400,
        }
      );
    }

    // Make sure the file belongs to this project
    const existingFile = await prisma.file.findFirst({
      where: {
        id: fileId,
        projectId,
      },
    });

    if (!existingFile) {
      return NextResponse.json(
        {
          error: "File not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.file.delete({
      where: {
        id: fileId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "File deleted successfully",
        fileId,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("DELETE FILE ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to delete file",
      },
      {
        status: 500,
      }
    );
  }
}