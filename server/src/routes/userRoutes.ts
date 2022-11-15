import { loginUserController } from '@useCases/user/loginUser';
import { registerUserController } from '@useCases/user/registerUser';
import { auctionsRepository, usersRepository } from '@config/repositories';
import express from 'express';
import { addBidController } from '@useCases/user/addBid';
import isAuth from '@middlewares/isAuth';
import prisma from 'services/database';
import jwt from 'jsonwebtoken';

const userRoutes = express.Router();

userRoutes.get('/', (req, res) => res.status(200).json({ message: 'API de leilão' }));

userRoutes.post('/user/register', async (req, res, next) => {
  const tokens = await registerUserController.handle(req, res, next);
  if (res.headersSent === false) {
    return res.status(200).json({ message: 'Registrado com sucesso', tokens });
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

userRoutes.get('/user/:id', async (req, res, next) => {
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

userRoutes.get('/authenticate', isAuth, async (req, res, next) => {
  const acessToken = req.headers.acesstoken as string;
  const acessSecret = process.env.ACESS_SECRET as string;
  const { userId } = jwt.verify(acessToken, acessSecret) as { userId: string };
  const user = await usersRepository.getUserById(userId);
  const userData = user?.getData();
  return res.status(200).json({ message: 'Autenticado', userData });
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
