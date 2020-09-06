import { Response, NextFunction, Request } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // pegando o header da aplicação

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    // neste decoded que vai constar o payload, parte do JWT que guarda informações, como por exemplo qual parte do sistema o usuário terá acesso
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayLoad; // forçando a variável a assumir o tipo TokenPayLoad

    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}
