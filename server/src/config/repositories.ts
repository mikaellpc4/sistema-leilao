// import ExampleUsersRepository from '@repositories/implementations/exampleUsersRepository';
import PrismaUsersRepository from '@repositories/implementations/prisma/prismaUsersRepository';

const usersRepository = new PrismaUsersRepository();
// const usersRepository = new ExampleUsersRepository();

export default usersRepository;
