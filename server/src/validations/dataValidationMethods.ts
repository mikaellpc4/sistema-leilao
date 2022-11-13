import { usersRepository, tagsRepository, auctionsRepository } from '@config/repositories';

const isValid = {
  // Hegex logics
  email(email: string) {
    const valid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    return valid;
    // qual-quer-co.i.sa@qual-quer-co.i.sa.algo
  },
};

const exists = {
  async userId(userId: string) {
    if (await usersRepository.getUserById(userId) !== null) {
      return true;
    }
    return false;
  },
  async email(email: string) {
    if (await usersRepository.getUserByEmail(email) !== null) {
      return true;
    }
    return false;
  },
  async tagId(tagId: string) {
    if (await tagsRepository.getTagById(tagId) !== null) {
      return true;
    }
    return false;
  },
  async tagName(tagName: string) {
    if (await tagsRepository.getTagByName(tagName) !== null) {
      return true;
    }
    return false;
  },
  async auctionId(auctionId: string) {
    return auctionsRepository.auctionIsFinished(auctionId);
  },
};

const using = {
  async tag(tagId: string) {
    return auctionsRepository.usingTag(tagId);
  },
};

const finished = {
  async auctionId(auctionId: string) {
    return auctionsRepository.auctionIsFinished(auctionId);
  },
};

export {
  isValid, exists, using, finished,
};
