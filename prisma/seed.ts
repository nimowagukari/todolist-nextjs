import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const task1 = await prisma.task.upsert({
    where: { id: 1 },
    update: {},
    create: {
      status: "not started yet",
      summary: "task1",
      description: "task1 description",
    },
  });
  const task2 = await prisma.task.upsert({
    where: { id: 2 },
    update: {},
    create: {
      status: "in progress",
      summary: "task2",
    },
  });
  const task3 = await prisma.task.upsert({
    where: { id: 3 },
    update: {},
    create: {
      status: "closed",
      summary: "task3",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
