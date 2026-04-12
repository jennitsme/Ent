import { Request, Response, NextFunction } from 'express';
import { store } from '../store';

export function authGuard(req: Request, res: Response, next: NextFunction) {
  const config = store.getConfig();
  if (!config.authToken) {
    return next();
  }

  const header = req.headers['authorization'];
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const token = header.replace('Bearer ', '').trim();
  if (token !== config.authToken) {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }

  return next();
}
