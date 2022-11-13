import Auction from '@entities/auction';
import IAuctionsRepository from '@repositories/IAuctionsRepository';
import dayjs from 'dayjs';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class PrismaAuctionsRepository implements IAuctionsRepository {
  async getAuctions(): Promise<Auction[]> {
    const auctions = await prisma.auctions.findMany();
    return auctions.map((auction) => new Auction(auction));
  }

  async getAuctionById(id: string): Promise<Auction | null> {
    const auction = await prisma.auctions.findUnique({
      where: {
        id,
      },
    });
    if (auction) {
      return new Auction(auction);
    }
    return null;
  }

  async auctionIsFinished(auctionId: string): Promise<boolean> {
    const auction = await prisma.auctions.findUnique({
      where: {
        id: auctionId,
      },
    });
    const endAt = auction?.endAt as number;
    const isFinished = dayjs().isAfter(dayjs.unix(endAt));
    return isFinished;
  }

  async save(auction: Auction): Promise<void> {
    const id = auction.getId() as string;
    const createdAt = auction.getCreatedAt() as number;
    const {
      name,
      imageLink,
      description,
      minimumBid,
      actualBid,
      soldFor,
      buyerId,
      endAt,
      tagId,
    } = auction.getData();
    await prisma.auctions.create({
      data: {
        id,
        name,
        imageLink,
        description,
        minimumBid,
        actualBid,
        soldFor,
        buyerId,
        createdAt,
        endAt,
        tagId,
      },
    });
  }

  async finish(auctionId: string): Promise<void> {
    await prisma.auctions.update({
      where: {
        id: auctionId,
      },
      data: {
        endAt: dayjs().unix(),
      },
    });
  }

  async addBid(auctionId: string, bidValue: number, bidUserId: string): Promise<void> {
    await prisma.auctions.update({
      where: {
        id: auctionId,
      },
      data: {
        actualBid: bidValue,
        buyerId: bidUserId,
      },
    });
  }

  async checkActualBid(auctionId: string): Promise<number> {
    const { actualBid } = await prisma.auctions.findUnique({
      where: {
        id: auctionId,
      },
      select: {
        actualBid: true,
      },
    }) as { actualBid: number };
    return actualBid;
  }

  async usingTag(tagId: string): Promise<boolean> {
    const auctions = await prisma.auctions.findMany({
      where: {
        tagId,
      },
    });
    if (auctions) {
      return true;
    }
    return false;
  }
}
