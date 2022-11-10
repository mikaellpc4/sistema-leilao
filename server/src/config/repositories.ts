// import ExampleUsersRepository from '@repositories/implementations/exampleUsersRepository';
import PrismaTagsRepository from '@repositories/implementations/prisma/prismaTagsRepository';
import PrismaUsersRepository from '@repositories/implementations/prisma/prismaUsersRepository';

const usersRepository = new PrismaUsersRepository();
const tagsRepository = new PrismaTagsRepository();
// const usersRepository = new ExampleUsersRepository();

export { usersRepository, tagsRepository };
