import ICreateTagRequestDTO from './createTagDTO';
import CreateTagUseCase from './createTagUseCase';

export default class CreateTagController {
  constructor(
    private createTagUseCase: CreateTagUseCase,
  ) { }

  async handle(req: Req, next: Next): Promise<void> {
    const data: ICreateTagRequestDTO = req.body;
    await this.createTagUseCase.execute(next, data);
  }
}
