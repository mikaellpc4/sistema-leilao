import ApiError from '@controllers/errorController';
import IRegisterUserRequestDTO from 'useCases/user/registerUser/registerUserDTO';
import { isValid, exists } from '@validations/dataValidationMethods';
import validateTypes from '@validations/validateTypes';

const validateRegisterRequest = async (
  next: Next,
  data: IRegisterUserRequestDTO,
) => {
  const {
    name,
    email,
    password,
    passwordConfirm,
  } = data;

  const validRequest = {
    name: 'string',
    email: 'string',
    password: 'string',
    passwordConfirm: 'string',
  };

  // Validação de dados
  if (validateTypes(data, validRequest) === false) {
    next(ApiError.badRequest('Dados invalidos'));
    return false;
  }

  if (name === '') {
    next(ApiError.badRequest('O nome é obrigatório'));
    return false;
  }

  if (name.length < 3) {
    next(ApiError.badRequest('O nome deve possuir no minimo 3 caracters'));
    return false;
  }

  if (email === '') {
    next(ApiError.badRequest('O email é obrigatório'));
    return false;
  }

  if (isValid.email(email) === false) {
    next(ApiError.badRequest('O email não é valido'));
    return false;
  }

  if (await exists.email(email) === true) {
    next(ApiError.badRequest('Este email ja foi registrado'));
    return false;
  }

  if (password === '') {
    next(ApiError.badRequest('A senha deve possuir no minimo 8 caracters'));
    return false;
  }

  if (password.length < 8) {
    next(ApiError.badRequest('A senha deve possuir no minimo 8 caracters'));
    return false;
  }

  if (password !== passwordConfirm) {
    next(ApiError.badRequest('As senhas não coincidem'));
    return false;
  }

  return true;
};

export default validateRegisterRequest;
