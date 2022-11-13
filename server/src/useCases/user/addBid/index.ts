import { auctionsRepository } from '@config/repositories';
import AddBidController from './addBidController';
import AddBidUseCase from './addBidUseCase';

const repository = auctionsRepository;

const addBidUseCase = new AddBidUseCase(repository);

const addBidController = new AddBidController(addBidUseCase);

export { addBidUseCase, addBidController };
