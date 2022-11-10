import { auctionsRepository } from '@config/repositories';
import FinishAuctionController from './finishAuctionController';
import FinishAuctionUseCase from './finishAuctionUseCase';

const repository = auctionsRepository;

const finishAuctionUseCase = new FinishAuctionUseCase(repository);

const finishAuctionController = new FinishAuctionController(finishAuctionUseCase);

export { finishAuctionUseCase, finishAuctionController };
