/*
  Warnings:

  - Changed the type of `createdAt` on the `Auctions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endAt` on the `Auctions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Auctions" DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" INTEGER NOT NULL,
DROP COLUMN "endAt",
ADD COLUMN     "endAt" INTEGER NOT NULL;
