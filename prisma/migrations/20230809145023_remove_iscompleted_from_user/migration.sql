/*
  Warnings:

  - You are about to drop the column `isCompleted` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isCompleted",
ALTER COLUMN "firstName" DROP NOT NULL;
