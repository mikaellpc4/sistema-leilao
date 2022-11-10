import ApiError from '@controllers/errorController';
import ICreateTagRequestDTO from 'useCases/tag/createTag/createTagDTO';
import { exists } from '@validations/dataValidationMethods';
import validateTypes from '@validations/validateTypes';

const validateCreateTagRequest = async (
  next: Next,
  data: ICreateTagRequestDTO,
) => {
  const {
    name,
    thumbnailLink,
  } = data;

  const validRequest = {
    name: 'string',
    thumbnailLink: 'string',
  };

  if (validateTypes(data, validRequest) === false) {
    next(ApiError.badRequest('Tag invalida'));
    return false;
  }

  if (name === '') {
    next(ApiError.badRequest('O nome da tag é obrigatorio'));
    return false;
  }

  if (thumbnailLink === '') {
    next(ApiError.badRequest('Uma imagem para a tag é obrigatoria'));
    return false;
  }

  if (await exists.tagName(name) === true) {
    next(ApiError.badRequest('Está tag ja existe'));
    return false;
  }

  return true;
};

export default validateCreateTagRequest;
