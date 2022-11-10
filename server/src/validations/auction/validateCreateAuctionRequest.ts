import ApiError from '@controllers/errorController';
import ICreateAuctionRequestDTO from 'useCases/auction/createAuction/createAuctionDTO';
import { exists } from '@validations/dataValidationMethods';
import validateTypes from '@validations/validateTypes';

const validateCreateTagRequest = async (
  next: Next,
  data: ICreateAuctionRequestDTO,
) => {
  const {
    name,
    imageLink,
    description,
    minimumBid,
    endAt,
    tagId,
  } = data;

  const request = {
    name, imageLink, description, minimumBid, endAt,
  };

  const validRequest = {
    name: 'string',
    imageLink: 'string',
    description: 'string',
    minimumBid: 'number',
    endAt: 'number',
  };

  if (validateTypes(request, validRequest) === false) {
    next(ApiError.badRequest('Leilão invalido'));
    return false;
  }

  if (tagId) {
    if (typeof tagId !== 'string' && 'null') {
      next(ApiError.badRequest('Tag invalida'));
      return false;
    }
  }

  if (name === '') {
    next(ApiError.badRequest('O nome do leilão é obrigatorio'));
    return false;
  }

  if (imageLink === '') {
    next(ApiError.badRequest('Uma imagem para o leilão é obrigatorio'));
    return false;
  }

  if (description === '') {
    next(ApiError.badRequest('O descrição do leilão é obrigatorio'));
    return false;
  }

  if (minimumBid === 0) {
    next(ApiError.badRequest('O lance minimo do leilão é obrigatorio'));
    return false;
  }

  if (endAt === 0) {
    next(ApiError.badRequest('O leilão deve possuir uma data final'));
    return false;
  }

  if (tagId && await exists.tagId(tagId) === false) {
    next(ApiError.badRequest('Tag inexistente atribuida ao leilão'));
    return false;
  }

  return true;
};

export default validateCreateTagRequest;
