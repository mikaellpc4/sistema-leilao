/*
  Warnings:

  - You are about to drop the `RefreshTokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RefreshTokens" DROP CONSTRAINT "RefreshTokens_userId_fkey";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "refreshTokens" TEXT[];

-- DropTable
DROP TABLE "RefreshTokens";
