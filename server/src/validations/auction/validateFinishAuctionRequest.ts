import ApiError from '@controllers/errorController';
import { exists, finished } from '@validations/dataValidationMethods';

const validateFinishAuctionRequest = async (
  next: Next,
  auctionId: string,
) => {
  if (typeof auctionId !== 'string') {
    next(ApiError.badRequest('Leilão invalido'));
    return false;
  }

  if (auctionId === '') {
    next(ApiError.badRequest('Leilão invalido'));
    return false;
  }

  if (await exists.auctionId(auctionId) === false) {
    next(ApiError.badRequest('Este leilão não existe'));
    return false;
  }

  if (await finished.auctionId(auctionId) === true) {
    next(ApiError.badRequest('Este leilão ja foi finalizado'));
    return false;
  }

  return true;
};

export default validateFinishAuctionRequest;
