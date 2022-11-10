import DeleteTagUseCase from './deleteTagUseCase';

export default class LoginUserController {
  constructor(
    private deleteTagUseCase: DeleteTagUseCase,
  ) { }

  async handle(req: Req, next: Next): Promise<void> {
    const { tagId } = req.body as { tagId: string };
    await this.deleteTagUseCase.execute(next, tagId);
  }
}
