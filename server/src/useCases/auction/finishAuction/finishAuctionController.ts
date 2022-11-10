import FinishAuctionUseCase from './finishAuctionUseCase';

export default class FinishAuctionController {
  constructor(
    private finishAuctionUseCase: FinishAuctionUseCase,
  ) { }

  async handle(req: Req, next: Next): Promise<void> {
    const { auctionId } = req.body as { auctionId: string };
    await this.finishAuctionUseCase.execute(next, auctionId);
  }
}
