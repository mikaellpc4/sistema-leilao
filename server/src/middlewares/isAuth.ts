import generateToken from '@controllers/generateToken';
import validateToken from '@controllers/validateToken';

const isAuth = async (req: Req, res: Res, next: Next) => {
  const acessToken = req.headers.acesstoken as string;
  const refreshToken = req.headers.refreshtoken as string;
  // if no token, user not previous logged in
  if (acessToken || refreshToken) {
    const validAcess = validateToken.acess(acessToken);
    const validRefresh = await validateToken.refresh(refreshToken);
    if (validAcess === true) {
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
        return res.status(401).json({ message: 'Sessão expirada' });
      }
      default: {
        return res.status(400).json({ message: 'Sessão invalida' });
      }
    }
  }
  return res.status(400).json({ message: 'Headers invalidos' });
};

export default isAuth;
