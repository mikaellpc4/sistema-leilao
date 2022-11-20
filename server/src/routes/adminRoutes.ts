import { usersRepository } from '@config/repositories';
import ApiError from '@controllers/errorController';
import isAuth from '@middlewares/isAuth';
import { createAuctionController } from '@useCases/auction/createAuction';
import { finishAuctionController } from '@useCases/auction/finishAuction';
import { createTagController } from '@useCases/tag/createTag';
import { deleteTagController } from '@useCases/tag/deleteTag';
import express from 'express';
import normalizeMoney from 'services/normalizeMoney';

const adminRoutes = express.Router();

// Only for tests
adminRoutes.get('/users', async (req, res) => {
  const users = await usersRepository.getUsers();
  return res.status(200).json({ message: 'Usuarios', users });
});

adminRoutes.get('/user/balance', async (req, res) => {
  const { userId } = req.body;
  const balance = await usersRepository.checkUserBalance(userId);
  return res.status(200).json(balance);
});

adminRoutes.post('/admin/addLCoins', isAuth, async (req, res, next) => {
  const { userId, LCoins, admin } = req.body;
  if (!admin) return next(ApiError.unauthorized('Você não tem permissão para fazer isso'));
  if (!userId) return next(ApiError.badRequest('O ID do usuário é obrigatorio'));
  if (await usersRepository.getUserById(userId) === null) return next(ApiError.badRequest('O usuário não existe'));
  if (!LCoins) return next(ApiError.badRequest('A quantidade de LCoins é obrigatoria'));
  if (LCoins <= 0) return next(ApiError.badRequest('A quantidade de LCoins deve ser maior que 0,00'));

  const normalizedCoins = normalizeMoney(LCoins);
  await usersRepository.addLCoins(userId, normalizedCoins);

  return res.status(200).json('LCoins adicionadas com sucesso');
});

adminRoutes.post('/tag/create', isAuth, async (req, res, next) => {
  const { admin } = req.body;
  if (!admin) return next(ApiError.unauthorized('Você não tem permissão para fazer isso'));
  if (req.body.admim) {
    await createTagController.handle(req, next);
    if (res.headersSent === false) {
      return res.status(200).json('Tag criada');
    }
  }
  return null;
});

adminRoutes.post('/tag/delete', isAuth, async (req, res, next) => {
  const { admin } = req.body;
  if (!admin) return next(ApiError.unauthorized('Você não tem permissão para fazer isso'));
  if (!req.body.admim) {
    await deleteTagController.handle(req, next);
    if (res.headersSent === false) {
      return res.status(200).json('Tag deletada');
    }
  }
  return null;
});

adminRoutes.post('/auction/create', isAuth, async (req, res, next) => {
  const { admin } = req.body;
  if (!admin) return next(ApiError.unauthorized('Você não tem permissão para fazer isso'));
  await createAuctionController.handle(req, next);
  if (res.headersSent === false) {
    return res.status(200).json('Leilão criado');
  }
  return null;
});

// Premature Finish if admin wants
adminRoutes.post('/auction/finish', isAuth, async (req, res, next) => {
  const { admin } = req.body;
  if (!admin) return next(ApiError.unauthorized('Você não tem permissão para fazer isso'));
  await finishAuctionController.handle(req, next);
  if (res.headersSent === false) {
    return res.status(200).json('Leilão finalizado');
  }
  return null;
});

export default adminRoutes;
