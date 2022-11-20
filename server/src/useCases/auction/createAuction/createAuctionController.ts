import ICreateAuctionRequestDTO from './createAuctionDTO';
import CreateAuctionUseCase from './createAuctionUseCase';

export default class CreatAuctionController {
  constructor(
    private createAuctionUseCase: CreateAuctionUseCase,
  ) { }

  async handle(req: Req, next: Next): Promise<void> {
    const {
      name,
      imageLink,
      description,
      minimumBid,
      endAt,
      tagId,
    } = req.body as ICreateAuctionRequestDTO;
    this.createAuctionUseCase.execute(next, {
      name,
      imageLink,
      description,
      minimumBid,
      endAt,
      tagId,
    });
  }
}
