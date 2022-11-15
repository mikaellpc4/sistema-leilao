import ApiError from '@controllers/errorController';
import generateToken from '@controllers/generateToken';
import IUsersRepository from '@repositories/IUsersRepository';
import validateLoginRequest from '@validations/user/validateLoginRequest';
import ILoginRequestDTO from './loginUserDTO';

export default class LoginUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(
    next: Next,
    data: ILoginRequestDTO,
  ): Promise<{ acessToken: string, refreshToken: string } | null> {
    if (await validateLoginRequest(next, data)) {
      const {
        email,
        password,
      } = data;
      const loggedUser = await this.usersRepository.login(email, password);
      if (loggedUser === null) {
        next(ApiError.badRequest('Email ou senha incorreto(os)'));
        return null;
      }
      const userId = loggedUser.getId() as string;
      const refreshToken = generateToken.refresh(loggedUser);
      await this.usersRepository.addRefreshToken(userId, refreshToken);
      const acessToken = generateToken.acess(refreshToken);
      const tokens = { acessToken, refreshToken };
      return tokens;
    }
    return null;
  }
}
