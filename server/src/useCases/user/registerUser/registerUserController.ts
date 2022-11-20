import IRegisterUserRequestDTO from './registerUserDTO';
import RegisterUserUseCase from './registerUserUseCase';

export default class RegisterUserController {
  constructor(
    private registerUserUseCase: RegisterUserUseCase,
  ) { }

  async handle(req: Req, res: Res, next: Next): Promise<void> {
    const {
      name,
      email,
      password,
      passwordConfirm,
    } = req.body as IRegisterUserRequestDTO;
    await this.registerUserUseCase.execute(next, {
      name,
      email,
      password,
      passwordConfirm,
    });
  }
}
