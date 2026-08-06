import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(
  req: Request,
  context: {
    params: Promise<{
      fileId: string;
    }>;
  }
) {
  try {

    const params = await context.params;

    console.log("PARAMS:", params);


    const file = await prisma.file.findUnique({
      where: {
        id: params.fileId,
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


    return NextResponse.json(file);


  } catch (error) {

    console.error("FILE API ERROR:", error);


    return NextResponse.json(
      {
        error: String(error),
      },
      {
        status: 500,
      }
    );

  }
}
//////////////////////////////////////////////////////////////////

export async function PATCH(
  req: Request,
  context: {
    params: Promise<{
      fileId: string;
    }>;
  }
) {
  try {
    const params = await context.params;

    const { content } = await req.json();

    const updatedFile = await prisma.file.update({
      where: {
        id: params.fileId,
      },
      data: {
        content,
      },
    });

    return NextResponse.json(updatedFile);
  } catch (error) {
    console.error("PATCH FILE ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to update file",
      },
      {
        status: 500,
      }
    );
  }
}