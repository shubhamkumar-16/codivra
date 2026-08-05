import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "./prisma";

export async function getProjects() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return [];
  }

  return await prisma.project.findMany({
    where: {
      ownerId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}