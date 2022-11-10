import { tagsRepository } from '@config/repositories';
import DeleteTagController from './deleteTagController';
import DeleteTagUseCase from './deleteTagUseCase';

const repository = tagsRepository;

const deleteTagUseCase = new DeleteTagUseCase(repository);

const deleteTagController = new DeleteTagController(deleteTagUseCase);

export { deleteTagUseCase, deleteTagController };
