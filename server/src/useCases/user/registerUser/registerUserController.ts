import IRegisterUserRequestDTO from './registerUserDTO';
import RegisterUserUseCase from './registerUserUseCase';

export default class RegisterUserController {
  constructor(
    private registerUserUseCase: RegisterUserUseCase,
  ) { }

  async handle(req: Req, res: Res, next: Next): Promise<{ refresh: string, acess: string } | null> {
    const data: IRegisterUserRequestDTO = req.body;
    return this.registerUserUseCase.execute(next, data);
  }
}
