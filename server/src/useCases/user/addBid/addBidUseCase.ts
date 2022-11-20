import IAuctionsRepository from '@repositories/IAuctionsRepository';
import validateAddBidRequest from '@validations/user/validateAddBidRequest';
import { TAddBidRequestDTO, TAddBidResponseDTO } from './addBidDTO';

export default class DoABidUseCase {
  constructor(
    private auctionsRepository: IAuctionsRepository,
  ) { }

  async execute(
    next: Next,
    data: TAddBidRequestDTO,
  ): Promise<TAddBidResponseDTO | null> {
    if (await validateAddBidRequest(next, data)) {
      const { auctionId, bidValue, bidUserId } = data;
      const { newUserBalance } = await this.auctionsRepository.addBid(
        auctionId,
        bidValue,
        bidUserId,
      );
      return { newUserBalance, bidValue };
    }
    return null;
  }
}
