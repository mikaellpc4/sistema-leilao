import IAuctionsRepository from '@repositories/IAuctionsRepository';
import validateAddBidRequest from '@validations/user/validateAddBidRequest';
import IAddBidDTO from './addBidDTO';

export default class DoABidUseCase {
  constructor(
    private auctionsRepository: IAuctionsRepository,
  ) { }

  async execute(
    next: Next,
    data: IAddBidDTO,
  ): Promise<number | null> {
    if (await validateAddBidRequest(next, data)) {
      const { auctionId, bidValue, bidUserId } = data;
      await this.auctionsRepository.addBid(auctionId, bidValue, bidUserId);
      return data.bidValue / 100;
    }
    return null;
  }
}
