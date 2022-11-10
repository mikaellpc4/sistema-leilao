import { loginUserController } from '@useCases/user/loginUser';
import { registerUserController } from '@useCases/user/registerUser';
import { auctionsRepository, usersRepository } from '@config/repositories';
import express from 'express';
import isAuth from '@middlewares/isAuth';

const userRouter = express.Router();

userRouter.get('/', (req, res) => res.status(200).json({ message: 'API de leilão' }));

userRouter.post('/user/register', async (req, res, next) => {
  await registerUserController.handle(req, res, next);
  if (res.headersSent === false) {
    return res.status(200).json({ message: 'Registrado com sucesso' });
  }
  return null;
});

userRouter.post('/user/login', async (req, res, next) => {
  const refreshToken = await loginUserController.handle(req, next);
  if (res.headersSent === false) {
    return res.status(200).json({ message: 'Logado com sucesso', refreshToken });
  }
  return null;
});

userRouter.get('/authenticate', isAuth, (req, res, next) => {
  res.status(200).json({ message: 'Autenticado' });
});

userRouter.get('/auctions', async (req, res) => {
  const auctions = await auctionsRepository.getAuctions();
  return res.status(200).json(auctions);
});

export default userRouter;
