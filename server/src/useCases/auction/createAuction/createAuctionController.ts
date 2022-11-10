import ICreateAuctionRequestDTO from './createAuctionDTO';
import CreateAuctionUseCase from './createAuctionUseCase';

export default class CreatAuctionController {
  constructor(
    private createAuctionUseCase: CreateAuctionUseCase,
  ) { }

  async handle(req: Req, next: Next): Promise<void> {
    const data: ICreateAuctionRequestDTO = req.body;
    this.createAuctionUseCase.execute(next, data);
  }
}
