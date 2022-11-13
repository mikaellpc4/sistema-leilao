import ApiError from '@controllers/errorController';
import { auctionsRepository, usersRepository } from '@config/repositories';
import IAddBidRequestDTO from '@useCases/user/addBid/addBidDTO';
import { exists } from '@validations/dataValidationMethods';
import validateTypes from '@validations/validateTypes';

const validateAddBidRequest = async (
  next: Next,
  data: IAddBidRequestDTO,
) => {
  const {
    auctionId,
    bidValue,
    bidUserId,
  } = data;

  const validRequest = {
    auctionId: 'string',
    bidValue: 'number',
    bidUserId: 'string',
  };

  if (validateTypes(data, validRequest) === false) {
    next(ApiError.badRequest('Lance invalido'));
    return false;
  }

  if (auctionId === '') {
    next(ApiError.badRequest('O id do leilão é obrigatorio'));
    return false;
  }

  if (bidValue <= 0) {
    next(ApiError.badRequest('O valor do lance deve ser maior que 0'));
    return false;
  }

  const auctionActualBid = await auctionsRepository.checkActualBid(auctionId);

  if (bidValue <= auctionActualBid) {
    next(ApiError.badRequest('O lance deve ser maior que o lance anterior'));
    return false;
  }

  if (await exists.userId(bidUserId) === false) {
    next(ApiError.badRequest('O usuario que fez o lance não existe'));
    return false;
  }

  const userBalance = await usersRepository.checkUserBalance(bidUserId);

  if (userBalance < bidValue) {
    next(ApiError.badRequest('Você não possui saldo suficiente'));
    return false;
  }

  return true;
};

export default validateAddBidRequest;
