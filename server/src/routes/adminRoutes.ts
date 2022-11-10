import { tagsRepository } from '@config/repositories';
import { createTagController } from '@useCases/tag/createTag';
import { deleteTagController } from '@useCases/tag/deleteTag';
import express from 'express';

const adminRoutes = express.Router();

// for tests only
adminRoutes.get('/tag', async (req, res) => {
  const tags = await tagsRepository.getTags();
  return res.status(200).json(tags);
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

adminRoutes.post('/auction/create', (req, res) => {

});

adminRoutes.post('/auction/finish', (req, res) => {

});

export default adminRoutes;
