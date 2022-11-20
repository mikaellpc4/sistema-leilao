import normalizeMoney from 'services/normalizeMoney';
import { TAddBidRequestDTO, TAddBidResponseDTO } from './addBidDTO';
import AddBidUseCase from './addBidUseCase';

export default class addBidController {
  constructor(
    private addBidUseCase: AddBidUseCase,
  ) { }

  async handle(req: Req, next: Next): Promise<TAddBidResponseDTO | null> {
    const { auctionId, bidValue, bidUserId } = req.body as TAddBidRequestDTO;
    const normalizedBidValue = normalizeMoney(bidValue);
    const addBidResponse = await this.addBidUseCase.execute(next, {
      auctionId,
      bidValue: normalizedBidValue,
      bidUserId,
    });
    return addBidResponse;
  }
}
