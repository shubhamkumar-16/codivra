import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =========================
// Create File
// POST /api/projects/[id]/files
// =========================

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const { name, language } = body;

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

    const file = await prisma.file.create({
      data: {
        name,
        language,
        projectId: id,
        content: "",
      },
    });

    return NextResponse.json(file, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

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
// Get All Files
// GET /api/projects/[id]/files
// =========================

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const files = await prisma.file.findMany({
      where: {
        projectId: id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(files);
  } catch (error) {
    console.error(error);

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

// =========================
// Rename File
// PATCH /api/projects/[id]/files
// =========================

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const { fileId, name } = body;

    // Validate request
    if (!fileId || !name) {
      return NextResponse.json(
        {
          error: "File ID and name are required",
        },
        {
          status: 400,
        }
      );
    }

    // Make sure the name isn't just spaces
    const trimmedName = name.trim();

    if (!trimmedName) {
      return NextResponse.json(
        {
          error: "File name cannot be empty",
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
        projectId: id,
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

    // Update file name
    const updatedFile = await prisma.file.update({
      where: {
        id: fileId,
      },
      data: {
        name: trimmedName,
      },
    });

    return NextResponse.json(updatedFile);
  } catch (error) {
    console.error(error);

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

// =========================
// DELETE File
// DELETE /api/projects/[id]/files
// =========================

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const { fileId } = body;

    if (!fileId) {
      return NextResponse.json(
        {
          error: "File ID is required",
        },
        {
          status: 400,
        }
      );
    }

    // Make sure the file belongs to this project
    const file = await prisma.file.findFirst({
      where: {
        id: fileId,
        projectId: id,
      },
    });

    if (!file) {
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

    return NextResponse.json({
      message: "File deleted successfully",
      fileId,
    });

  } catch (error) {
    console.error("Delete file error:", error);

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