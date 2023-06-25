/*
  Warnings:

  - The primary key for the `TagsOnPosts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `TagsOnPosts` table. All the data in the column will be lost.
  - Added the required column `tagId` to the `TagsOnPosts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TagsOnPosts" DROP CONSTRAINT "TagsOnPosts_categoryId_fkey";

-- AlterTable
ALTER TABLE "TagsOnPosts" DROP CONSTRAINT "TagsOnPosts_pkey",
DROP COLUMN "categoryId",
ADD COLUMN     "tagId" INTEGER NOT NULL,
ADD CONSTRAINT "TagsOnPosts_pkey" PRIMARY KEY ("postId", "tagId");

-- AddForeignKey
ALTER TABLE "TagsOnPosts" ADD CONSTRAINT "TagsOnPosts_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
