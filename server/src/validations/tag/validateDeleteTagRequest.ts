import ApiError from '@controllers/errorController';
import { exists, using } from '@validations/dataValidationMethods';

const validateDeleteTagRequest = async (
  next: Next,
  tagId: string,
) => {
  if (typeof tagId !== 'string') {
    next(ApiError.badRequest('Tag invalida'));
    return false;
  }

  if (tagId === '') {
    next(ApiError.badRequest('Tag invalida'));
    return false;
  }

  if (await exists.tagId(tagId) === false) {
    next(ApiError.badRequest('Está tag não existe'));
    return false;
  }

  if (await using.tag(tagId) === true) {
    next(ApiError.badRequest('Está tag não pode ser deletada pois está sendo usada em um leilão'));
    return false;
  }

  return true;
};

export default validateDeleteTagRequest;
