/*
  Warnings:

  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TagsOnArticles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tagName` on the `TagsOnArticles` table. All the data in the column will be lost.
  - Added the required column `tagId` to the `TagsOnArticles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TagsOnArticles" DROP CONSTRAINT "TagsOnArticles_tagName_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TagsOnArticles" DROP CONSTRAINT "TagsOnArticles_pkey",
DROP COLUMN "tagName",
ADD COLUMN     "tagId" INTEGER NOT NULL,
ADD CONSTRAINT "TagsOnArticles_pkey" PRIMARY KEY ("articleId", "tagId");

-- AddForeignKey
ALTER TABLE "TagsOnArticles" ADD CONSTRAINT "TagsOnArticles_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
