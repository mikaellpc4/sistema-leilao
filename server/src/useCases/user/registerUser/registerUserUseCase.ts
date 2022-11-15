import User from '@entities/user';
import IUsersRepository from '@repositories/IUsersRepository';
import validateRegisterRequest from '@validations/user/validateRegisterRequest';
import bcrypt from 'bcrypt';
import LoginUserUseCase from '../loginUser/loginUserUseCase';
import IRegisterUserRequestDTO from './registerUserDTO';

export default class RegisterUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private loginUserUseCase: LoginUserUseCase,
  ) { }

  async execute(
    next: Next,
    data: IRegisterUserRequestDTO,
  ): Promise<{refresh:string, acess: string} | null> {
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
      return this.loginUserUseCase.execute(next, { email, password });
    }
    return null;
  }
}
