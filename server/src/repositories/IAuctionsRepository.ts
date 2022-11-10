import Auction from '@entities/auction';

interface IAuctionsRepository {
  getAuctions(): Promise<Auction[]>
  getAuctionById(id: string): Promise<Auction | null>
  auctionIsFinished(auctionId: string): Promise<boolean>

  save(auction: Auction): Promise<void>
  finish(auctionId: string): Promise<void>

  addBid(auctionId: string, bidValue: number, bidUserId: string): Promise<void>
}

export default IAuctionsRepository;
