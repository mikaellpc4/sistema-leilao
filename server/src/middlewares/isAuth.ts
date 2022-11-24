import { usersRepository } from '@config/repositories';
import generateToken from '@controllers/generateToken';
import validateToken from '@controllers/validateToken';
import jwt from 'jsonwebtoken';

const isAuth = async (req: Req, res: Res, next: Next) => {
  const acessToken = req.headers.acesstoken as string;
  const refreshToken = req.headers.refreshtoken as string;
  // if no token, user not previous logged in
  if (acessToken || refreshToken) {
    const validAcess = validateToken.acess(acessToken);
    const validRefresh = await validateToken.refresh(refreshToken);
    if (validAcess === true) {
      const acessData = jwt.decode(acessToken) as {
        userId: string,
        userRole: Role,
        iat: number,
        exp: number
      };
      if (acessData.userRole === 'ADMIN') {
        req.body.admin = true;
      }
      return next();
    }
    switch (validRefresh) {
      case true: {
        const newAcessToken = generateToken.acess(refreshToken);
        return res.status(202).json({ newAcessToken });
      }
      case 'revokedToken': {
        return res.status(401).json({ message: 'Sessão encerrada' });
      }
      case 'TokenExpiredError': {
        const tokenData = jwt.decode(refreshToken) as { userId: string };
        const { userId } = tokenData;
        const findedUser = await usersRepository.getUserById(userId);
        if (findedUser?.getRefreshTokens()?.includes(refreshToken)) {
          const newRefreshToken = generateToken.refresh(findedUser);
          await usersRepository.removeRefreshToken(refreshToken);
          return res.status(202).json({ newRefreshToken });
        }
        return res.status(401).json({ message: 'Sessão expirada' });
      }
      default: {
        return res.status(401).json({ message: 'Sessão invalida' });
      }
    }
  }
  return res.status(401).json({ message: 'Headers invalidos' });
};

export default isAuth;
