/*
  Warnings:

  - You are about to drop the `Friends` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FriendsToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[friendshipId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_FriendsToUser" DROP CONSTRAINT "_FriendsToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_FriendsToUser" DROP CONSTRAINT "_FriendsToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "friendshipId" INTEGER;

-- DropTable
DROP TABLE "Friends";

-- DropTable
DROP TABLE "_FriendsToUser";

-- CreateTable
CREATE TABLE "Friendship" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_friendshipId_key" ON "User"("friendshipId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_friendshipId_fkey" FOREIGN KEY ("friendshipId") REFERENCES "Friendship"("id") ON DELETE SET NULL ON UPDATE CASCADE;
