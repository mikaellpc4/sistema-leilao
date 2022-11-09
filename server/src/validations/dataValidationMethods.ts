import usersRepository from '@config/repositories';

const isValid = {
  // Hegex logics
  email(email: string) {
    const valid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    return valid;
    // qual-quer-co.i.sa@qual-quer-co.i.sa.algo
  },
};

const exists = {
  async email(email: string) {
    if (await usersRepository.getUserByEmail(email) !== null) {
      return true;
    }
    return false;
  },
};

export { isValid, exists };
