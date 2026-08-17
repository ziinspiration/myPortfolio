import { prisma } from "@/lib/prisma";
import HomeClient from "./home-client";

export default async function Home() {
  const profile = await prisma.profile.findFirst();

  const skills = await prisma.skill.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      sortOrder: "asc",
    },
  });

  return <HomeClient profile={profile} skills={skills} />;
}
