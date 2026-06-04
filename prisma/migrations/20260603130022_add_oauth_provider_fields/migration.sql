/*
  Warnings:

  - A unique constraint covering the columns `[userId,classId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[providerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `classType` on the `Like` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Like_userId_classId_classType_key";

-- DropIndex
DROP INDEX "User_userName_key";

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "classType",
ADD COLUMN     "classType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" TEXT NOT NULL DEFAULT 'credentials',
ADD COLUMN     "providerId" TEXT,
ALTER COLUMN "password" DROP NOT NULL;

-- DropEnum
DROP TYPE "LikeType";

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_classId_key" ON "Like"("userId", "classId");

-- CreateIndex
CREATE UNIQUE INDEX "User_providerId_key" ON "User"("providerId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_provider_providerId_idx" ON "User"("provider", "providerId");
