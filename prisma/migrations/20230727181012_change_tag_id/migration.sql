/*
  Warnings:

  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TagsOnArticles` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "TagsOnArticles" DROP CONSTRAINT "TagsOnArticles_tagId_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Tag_id_seq";

-- AlterTable
ALTER TABLE "TagsOnArticles" DROP CONSTRAINT "TagsOnArticles_pkey",
ALTER COLUMN "tagId" SET DATA TYPE TEXT,
ADD CONSTRAINT "TagsOnArticles_pkey" PRIMARY KEY ("articleId", "tagId");

-- AddForeignKey
ALTER TABLE "TagsOnArticles" ADD CONSTRAINT "TagsOnArticles_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
