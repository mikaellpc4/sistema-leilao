import Tag from '@entities/tag';
import ITagsRepository from '@repositories/ITagsRepository';
import validateCreateTagRequest from '@validations/validateCreateTagRequest';
import ICreateTagRequestDTO from './createTagDTO';

export default class CreateTagUserUseCase {
  constructor(
    private tagsRepository: ITagsRepository,
  ) { }

  async execute(
    next: Next,
    data: ICreateTagRequestDTO,
  ): Promise<void> {
    if (await validateCreateTagRequest(next, data)) {
      const newTag = new Tag(data);
      await this.tagsRepository.save(newTag);
    }
  }
}
