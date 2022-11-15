import { usersRepository } from '@config/repositories';
import { loginUserUseCase } from '../loginUser';
import RegisterUserController from './registerUserController';
import RegisterUserUseCase from './registerUserUseCase';

const registerUserUseCase = new RegisterUserUseCase(usersRepository, loginUserUseCase);
const registerUserController = new RegisterUserController(registerUserUseCase);

export { registerUserUseCase, registerUserController };
