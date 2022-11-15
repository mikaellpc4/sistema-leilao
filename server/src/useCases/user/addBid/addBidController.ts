import IAddBidRequestDTO from './addBidDTO';
import AddBidUseCase from './addBidUseCase';

export default class addBidController {
  constructor(
    private addBidUseCase: AddBidUseCase,
  ) { }

  async handle(req: Req, next: Next): Promise<number | null> {
    const data: IAddBidRequestDTO = req.body;
    data.bidValue *= 100;
    return this.addBidUseCase.execute(next, data);
  }
}
