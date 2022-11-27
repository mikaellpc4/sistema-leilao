import Auction from '@entities/auction';
import IAuctionsRepository from '@repositories/IAuctionsRepository';
import dayjs from 'dayjs';

import prisma from '@services/database';
import { Prisma } from '@prisma/client';

export default class PrismaAuctionsRepository implements IAuctionsRepository {
  async getAuctions(
    limit?: number,
    cursor?: string,
  ): Promise<{ auctions: Auction[], nextAuction: string | undefined }> {
    let take: number | undefined;
    take = limit;
    if (!take) take = 5;
    if (take > 10) take = 10;
    const args: Prisma.AuctionsFindManyArgs = {
      take,
      orderBy: {
        endAt: 'desc',
      },
      include: {
        buyer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    };
    if (cursor) {
      args.cursor = {
        id: cursor,
      };
    }
    const auctions = await prisma.auctions.findMany(args);
    const nextAuction = await prisma.auctions.findFirst({
      skip: 1,
      cursor: {
        id: auctions[auctions.length - 1].id,
      },
      orderBy: {
        endAt: 'desc',
      },
      select: {
        id: true,
      },
    });
    return {
      auctions: auctions.map((auction) => new Auction(auction)),
      nextAuction: nextAuction?.id,
    };
  }

  async getAuctionById(id: string): Promise<Auction | null> {
    const auction = await prisma.auctions.findUnique({
      where: {
        id,
      },
      include: {
        buyer: {
          select: {
            id: true,
            name: true,
          },
        },
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

  async addBid(auctionId: string, bidValue: number, bidUserId: string): Promise<{
    newUserBalance: number
  }> {
    const auction = await prisma.auctions.findUnique({
      where: {
        id: auctionId,
      },
    });
    if (auction?.buyerId) {
      // Refund the previous buyer
      await prisma.users.update({
        where: {
          id: auction.buyerId,
        },
        data: {
          LCoins: {
            increment: auction.actualBid as number,
          },
        },
      });
    }
    await prisma.auctions.update({
      where: {
        id: auctionId,
      },
      data: {
        actualBid: bidValue,
        buyerId: bidUserId,
      },
    });
    const updatedUser = await prisma.users.update({
      where: {
        id: bidUserId,
      },
      data: {
        LCoins: {
          decrement: bidValue,
        },
      },
    });
    const newUserBalance = updatedUser.LCoins;
    return { newUserBalance };
  }

  async checkBids(auctionId: string): Promise<{ actualBid: number, minimumBid: number }> {
    const { actualBid, minimumBid } = await prisma.auctions.findUnique({
      where: {
        id: auctionId,
      },
      select: {
        actualBid: true,
        minimumBid: true,
      },
    }) as { actualBid: number, minimumBid: number };
    return { actualBid, minimumBid };
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
