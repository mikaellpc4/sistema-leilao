import Tag from '@entities/tag';
import ITagRepository from '@repositories/ITagsRepository';

import prisma from '@services/database';

export default class PrismaTagsRepository implements ITagRepository {
  async getTagById(tagId: string): Promise<Tag | null> {
    const tag = await prisma.tags.findUnique({
      where: {
        id: tagId,
      },
    });
    if (tag) {
      return new Tag(tag);
    }
    return null;
  }

  async getTagByName(tagName: string): Promise<Tag | null> {
    const tag = await prisma.tags.findUnique({
      where: {
        name: tagName,
      },
    });
    if (tag) {
      return new Tag(tag);
    }
    return null;
  }

  async save(tag: Tag): Promise<void> {
    const id = tag.getId() as string;
    const { name, thumbnailLink } = tag.getData();
    await prisma.tags.create({
      data: {
        id,
        name,
        thumbnailLink,
      },
    });
  }

  async delete(tagId: string): Promise<void> {
    await prisma.tags.delete({
      where: {
        id: tagId,
      },
    });
  }

  async getTags(): Promise<Tag[]> {
    const tags = await prisma.tags.findMany();
    const findedTags = tags.map((tag) => new Tag(tag));
    return findedTags;
  }
}
