import User from '@entities/user';
import IUsersRepository from '@repositories/IUsersRepository';
import validateRegisterRequest from '@validations/user/validateRegisterRequest';
import bcrypt from 'bcrypt';
import IRegisterUserRequestDTO from './registerUserDTO';

export default class RegisterUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(
    next: Next,
    data: IRegisterUserRequestDTO,
  ): Promise<void> {
    if (await validateRegisterRequest(next, data)) {
      const {
        name,
        email,
        password,
      } = data;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: 'USER',
      });
      await this.usersRepository.save(newUser);
    }
  }
}
