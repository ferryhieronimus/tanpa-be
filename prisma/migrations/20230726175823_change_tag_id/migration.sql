/*
  Warnings:

  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Tag` table. All the data in the column will be lost.
  - The primary key for the `TagsOnArticles` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "TagsOnArticles" DROP CONSTRAINT "TagsOnArticles_tagId_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "TagsOnArticles" DROP CONSTRAINT "TagsOnArticles_pkey",
ALTER COLUMN "tagId" SET DATA TYPE TEXT,
ADD CONSTRAINT "TagsOnArticles_pkey" PRIMARY KEY ("articleId", "tagId");

-- AddForeignKey
ALTER TABLE "TagsOnArticles" ADD CONSTRAINT "TagsOnArticles_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("name") ON DELETE CASCADE ON UPDATE CASCADE;
