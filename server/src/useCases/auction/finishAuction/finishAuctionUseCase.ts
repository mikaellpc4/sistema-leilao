import IAuctionsRepository from '@repositories/IAuctionsRepository';
import validateFinishAuctionRequest from '@validations/auction/validateFinishAuctionRequest';

export default class LoginUserUseCase {
  constructor(
    private auctionsRepository: IAuctionsRepository,
  ) { }

  async execute(
    next: Next,
    auctionId: string,
  ): Promise<void> {
    if (await validateFinishAuctionRequest(next, auctionId)) {
      await this.auctionsRepository.finish(auctionId);
    }
  }
}
