/*
  Warnings:

  - You are about to drop the column `userId` on the `Auctions` table. All the data in the column will be lost.
  - Made the column `endAt` on table `Auctions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Auctions" DROP CONSTRAINT "Auctions_userId_fkey";

-- AlterTable
ALTER TABLE "Auctions" DROP COLUMN "userId",
ADD COLUMN     "buyerId" TEXT,
ALTER COLUMN "endAt" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Auctions" ADD CONSTRAINT "Auctions_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
