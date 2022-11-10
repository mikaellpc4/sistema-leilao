import ApiError from '@controllers/errorController';
import ITagsRepository from '@repositories/ITagsRepository';
import validateDeleteTagRequest from '@validations/validateDeleteTagRequest';

export default class DeleteTagUseCase {
  constructor(
    private tagsRepository: ITagsRepository,
  ) { }

  async execute(
    next: Next,
    tagId: string,
  ): Promise<void> {
    if (await validateDeleteTagRequest(next, tagId)) {
      await this.tagsRepository.delete(tagId);
    }
  }
}
