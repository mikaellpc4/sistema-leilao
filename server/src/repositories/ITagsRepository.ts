import Tag from '@entities/tag';

interface ITagsRepository {
  getTagById(tagId: string): Promise<Tag | null>
  getTagByName(tagName: string): Promise<Tag | null>

  save(tag: Tag): Promise<void>
  delete(tagId: string): Promise<void>
}

export default ITagsRepository;
