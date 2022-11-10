import { tagsRepository, usersRepository } from '@config/repositories';
import { createAuctionController } from '@useCases/auction/createAuction';
import { finishAuctionController } from '@useCases/auction/finishAuction';
import { createTagController } from '@useCases/tag/createTag';
import { deleteTagController } from '@useCases/tag/deleteTag';
import express from 'express';

const adminRoutes = express.Router();

// Only for tests
adminRoutes.get('/tags', async (req, res) => {
  const tags = await tagsRepository.getTags();
  return res.status(200).json({ messages: 'Tags', tags });
});

// Only for tests
adminRoutes.get('/users', async (req, res) => {
  const users = await usersRepository.getUsers();
  return res.status(200).json({ message: 'Usuarios', users });
});

adminRoutes.post('/tag/create', async (req, res, next) => {
  await createTagController.handle(req, next);
  if (res.headersSent === false) {
    return res.status(200).json('Tag criada');
  }
  return null;
});

adminRoutes.post('/tag/delete', async (req, res, next) => {
  await deleteTagController.handle(req, next);
  if (res.headersSent === false) {
    return res.status(200).json('Tag deletada');
  }
  return null;
});

adminRoutes.post('/auction/create', async (req, res, next) => {
  await createAuctionController.handle(req, next);
  if (res.headersSent === false) {
    return res.status(200).json('Leilão criado');
  }
  return null;
});

// Premature Finish if admin wants
adminRoutes.post('/auction/finish', async (req, res, next) => {
  await finishAuctionController.handle(req, next);
  if (res.headersSent === false) {
    return res.status(200).json('Leilão finalizado');
  }
  return null;
});

export default adminRoutes;
