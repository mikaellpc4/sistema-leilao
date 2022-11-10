/*
  Warnings:

  - Added the required column `actualBid` to the `Auctions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usersId` to the `Auctions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auctions" ADD COLUMN     "actualBid" INTEGER NOT NULL,
ADD COLUMN     "usersId" TEXT NOT NULL;
