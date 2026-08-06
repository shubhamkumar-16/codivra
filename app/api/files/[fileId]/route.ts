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