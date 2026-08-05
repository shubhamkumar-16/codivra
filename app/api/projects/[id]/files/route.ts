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