import { loginUserController } from '@useCases/user/loginUser';
import { registerUserController } from '@useCases/user/registerUser';
import { auctionsRepository, tagsRepository, usersRepository } from '@config/repositories';
import express from 'express';
import { addBidController } from '@useCases/user/addBid';
import isAuth from '@middlewares/isAuth';
import prisma from 'services/database';
import jwt from 'jsonwebtoken';

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
  const tokens = await loginUserController.handle(req, next);
  if (res.headersSent === false) {
    return res.status(200).json({ message: 'Logado com sucesso', tokens });
  }
  return null;
});

userRoutes.post('/user/logout', isAuth, async (req, res) => {
  const { refreshToken } = req.body as { refreshToken: string };
  await usersRepository.removeRefreshToken(refreshToken);
  res.status(200).json({ message: 'Deslogado com sucesso' });
});

userRoutes.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  if (typeof id === 'string') {
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        role: true,
        LCoins: true,
      },
    });
    if (user) {
      return res.status(200).json(user);
    }
  }
  return res.status(404).json('Usuario não encontrado');
});

userRoutes.get('/authenticate', isAuth, async (req, res) => {
  const acessToken = req.headers.acesstoken as string;
  const { userId } = jwt.decode(acessToken) as { userId: string };
  const user = await usersRepository.getUserById(userId);
  const userData = user?.getData();
  return res.status(200).json({ message: 'Autenticado', userData });
});

userRoutes.get('/auctions', async (req, res) => {
  const auctions = await auctionsRepository.getAuctions();
  return res.status(200).json(auctions);
});

userRoutes.post('/auction/bid', isAuth, async (req, res, next) => {
  const newData = await addBidController.handle(req, next);
  if (newData !== null) {
    const { bidValue, newUserBalance } = newData;
    return res.status(200).json({ message: 'Lance feito com sucesso', bidValue, newUserBalance });
  }
  return null;
});

// Only for tests
userRoutes.get('/tags', async (req, res) => {
  const tags = await tagsRepository.getTags();
  return res.status(200).json({ messages: 'Tags', tags });
});

export default userRoutes;
