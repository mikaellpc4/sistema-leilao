import { auctionsRepository } from '@config/repositories';
import LoginUserController from './createAuctionController';
import LoginUserUseCase from './createAuctionUseCase';

const repository = auctionsRepository;

const createAuctionUseCase = new LoginUserUseCase(repository);

const createAuctionController = new LoginUserController(createAuctionUseCase);

export { createAuctionUseCase, createAuctionController };
