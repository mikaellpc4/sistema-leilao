import ITagsRepository from '@repositories/ITagsRepository';
import validateDeleteTagRequest from '@validations/tag/validateDeleteTagRequest';

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
