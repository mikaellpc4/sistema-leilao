import ILoginUserRequestDTO from './loginUserDTO';
import LoginUserUseCase from './loginUserUseCase';

export default class LoginUserController {
  constructor(
    private loginUserUseCase: LoginUserUseCase,
  ) { }

  async handle(req: Req, next: Next): Promise<{ refresh: string, acess: string } | null> {
    const { email, password } = req.body as ILoginUserRequestDTO;
    return this.loginUserUseCase.execute(next, { email, password });
  }
}
