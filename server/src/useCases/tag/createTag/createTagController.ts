import ICreateTagRequestDTO from './createTagDTO';
import CreateTagUseCase from './createTagUseCase';

export default class CreateTagController {
  constructor(
    private createTagUseCase: CreateTagUseCase,
  ) { }

  async handle(req: Req, next: Next): Promise<void> {
    const { name, thumbnailLink } = req.body as ICreateTagRequestDTO;
    await this.createTagUseCase.execute(next, { name, thumbnailLink });
  }
}
