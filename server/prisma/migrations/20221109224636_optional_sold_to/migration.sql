-- DropForeignKey
ALTER TABLE "Auctions" DROP CONSTRAINT "Auctions_tagId_fkey";

-- DropForeignKey
ALTER TABLE "Auctions" DROP CONSTRAINT "Auctions_userId_fkey";

-- AlterTable
ALTER TABLE "Auctions" ALTER COLUMN "tagId" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Auctions" ADD CONSTRAINT "Auctions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auctions" ADD CONSTRAINT "Auctions_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tags"("id") ON DELETE SET NULL ON UPDATE CASCADE;
