/*
  Warnings:

  - You are about to drop the column `usersId` on the `Auctions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Auctions" DROP COLUMN "usersId",
ALTER COLUMN "endAt" DROP NOT NULL;
