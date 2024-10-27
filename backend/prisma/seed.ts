import { PrismaClient } from '@prisma/client';
/*import projects from '../src/data/projekter.json';
const prisma = new PrismaClient();

async function main() {
  for (const project of projects) {
    await prisma.project.create({
      data: {
        title: project.title,
        description: project.description,
        status: project.status,
        link: project.link,
        createdAt: new Date(project.createdAt),
        category: project.category,
        public: project.public,
        author: project.author,
        languages: {
          create: project.Languages.map((language: string) => ({
            name: language,
          })),
        },
        tags: {
          create: project.tags.map((tag: string) => ({
            name: tag,
          })),
        },
        demos: {
          create: project.demos.map((demo: string) => ({
            url: demo,
          })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
*/