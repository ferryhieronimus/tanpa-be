/*
  Warnings:

  - Changed the type of `assignedById` on the `TagsOnArticles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "TagsOnArticles" ALTER COLUMN "assignedAt" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "assignedById",
ADD COLUMN     "assignedById" INTEGER NOT NULL;
