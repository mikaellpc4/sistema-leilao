import { tagsRepository } from '@config/repositories';
import CreateTagController from './createTagController';
import CreateTagUseCase from './createTagUseCase';

const repository = tagsRepository;

const createTagUseCase = new CreateTagUseCase(repository);

const createTagController = new CreateTagController(createTagUseCase);

export { createTagUseCase, createTagController };
