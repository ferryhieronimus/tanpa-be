-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;
