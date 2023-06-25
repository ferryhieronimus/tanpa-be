/*
  Warnings:

  - You are about to drop the column `deleted` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username,isDeleted]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "deleted",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_isDeleted_key" ON "User"("username", "isDeleted");
