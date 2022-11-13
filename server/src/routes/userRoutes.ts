import { loginUserController } from '@useCases/user/loginUser';
import { registerUserController } from '@useCases/user/registerUser';
import { auctionsRepository, usersRepository } from '@config/repositories'; import express from 'express';
import { addBidController } from '@useCases/user/addBid';
import isAuth from '@middlewares/isAuth';

const userRoutes = express.Router();

userRoutes.get('/', (req, res) => res.status(200).json({ message: 'API de leilão' }));

userRoutes.post('/user/register', async (req, res, next) => {
  await registerUserController.handle(req, res, next);
  if (res.headersSent === false) {
    return res.status(200).json({ message: 'Registrado com sucesso' });
  }
  return null;
});

userRoutes.post('/user/login', async (req, res, next) => {
  const refreshToken = await loginUserController.handle(req, next);
  if (res.headersSent === false) {
    return res.status(200).json({ message: 'Logado com sucesso', refreshToken });
  }
  return null;
});

userRoutes.get('/authenticate', isAuth, (req, res, next) => {
  res.status(200).json({ message: 'Autenticado' });
});

userRoutes.get('/auctions', async (req, res) => {
  const auctions = await auctionsRepository.getAuctions();
  return res.status(200).json(auctions);
});

userRoutes.post('/auction/bid', async (req, res, next) => {
  const bidValue = await addBidController.handle(req, next);
  if (bidValue !== null) {
    return res.status(200).json(`Lance de ${bidValue}LCoins feito com sucesso`);
  }
  return null;
});

export default userRoutes;
