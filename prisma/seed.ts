import prisma from "../src/configs/prisma";
import slugify from "slugify";

const tags = [
  "Web Development",
  "Fiction",
  "Self Improvement",
  "Productivity",
  "Artificial Intelligence",
  "Software Engineering",
  "Universitas Indonesia",
  "Pop Culture",
  "Science",
  "Life",
];

async function main() {
  console.log("\nClearing db...");
  await prisma.tag.deleteMany();
  console.log("- Done table Tag");
  await prisma.tagsOnArticles.deleteMany();
  console.log("- Done table TagsOnArticles");
  await prisma.user.deleteMany();
  console.log("- Done table User");
  await prisma.article.deleteMany();
  console.log("- Done table Artikel");

  console.log("\nSeeding db...");

  console.log("\nSeeding Tag table...");
  tags.forEach(async (tag) => {
    await prisma.tag.create({
      data: {
        id: slugify(tag, { lower: true, strict: true }),
        name: tag,
      },
    });
    console.log("- Done tag for " + tag);
  });
}

main()
  .then(async () => {
    console.log("\nAll Done!");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    console.log("\nError in seeding");
    await prisma.$disconnect();
    process.exit(1);
  });
