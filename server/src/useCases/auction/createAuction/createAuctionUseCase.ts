import Auction from '@entities/auction';
import IAuctionsRepository from '@repositories/IAuctionsRepository';
import validateCreateAuctionRequest from '@validations/auction/validateCreateAuctionRequest';
import ILoginRequestDTO from './createAuctionDTO';

export default class CreateAuctionUseCase {
  constructor(
    private auctionsRepository: IAuctionsRepository,
  ) { }

  async execute(
    next: Next,
    data: ILoginRequestDTO,
  ): Promise<void> {
    if (await validateCreateAuctionRequest(next, data)) {
      const auction = new Auction(data);
      await this.auctionsRepository.save(auction);
    }
  }
}
