import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) return res.status(403).json({ mensagem: 'Não autenticado' });

  jwt.verify(token, 'secret', (err: any, decoded: any) => {
    if (err) return res.status(403).json({ mensagem: 'Token inválido' });

    req.user = decoded;
    next();
  });
};
