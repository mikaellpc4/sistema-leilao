// import ExampleUsersRepository from '@repositories/implementations/exampleUsersRepository';
import PrismaTagsRepository from '@repositories/implementations/prisma/prismaTagsRepository';
import PrismaAuctionsRepository from '@repositories/implementations/prisma/prismaAuctionsRepository';
import PrismaUsersRepository from '@repositories/implementations/prisma/prismaUsersRepository';

const tagsRepository = new PrismaTagsRepository();
const auctionsRepository = new PrismaAuctionsRepository();
const usersRepository = new PrismaUsersRepository();
// const usersRepository = new ExampleUsersRepository();

export { tagsRepository, auctionsRepository, usersRepository };
