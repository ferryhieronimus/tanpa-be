/*
  Warnings:

  - The primary key for the `TagsOnArticles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tagId` on the `TagsOnArticles` table. All the data in the column will be lost.
  - Added the required column `tagName` to the `TagsOnArticles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TagsOnArticles" DROP CONSTRAINT "TagsOnArticles_tagId_fkey";

-- AlterTable
ALTER TABLE "TagsOnArticles" DROP CONSTRAINT "TagsOnArticles_pkey",
DROP COLUMN "tagId",
ADD COLUMN     "tagName" TEXT NOT NULL,
ADD CONSTRAINT "TagsOnArticles_pkey" PRIMARY KEY ("articleId", "tagName");

-- AddForeignKey
ALTER TABLE "TagsOnArticles" ADD CONSTRAINT "TagsOnArticles_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "Tag"("name") ON DELETE CASCADE ON UPDATE CASCADE;
