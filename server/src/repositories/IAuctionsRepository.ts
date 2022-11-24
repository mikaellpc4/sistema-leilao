import Auction from '@entities/auction';

interface IAuctionsRepository {
  getAuctions(
    limit?: number,
    cursor?: string,
  ): Promise<Auction[]>
  getAuctionById(id: string): Promise<Auction | null>
  auctionIsFinished(auctionId: string): Promise<boolean>

  save(auction: Auction): Promise<void>
  finish(auctionId: string): Promise<void>

  addBid(auctionId: string, bidValue: number, bidUserId: string): Promise<{
    newUserBalance: number
  }>
  checkBids(auctionId: string): Promise<{ actualBid: number, minimumBid: number }>

  usingTag(tagId: string): Promise<boolean>
}

export default IAuctionsRepository;
