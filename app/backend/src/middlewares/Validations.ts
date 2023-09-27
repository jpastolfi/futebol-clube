import { Request, Response, NextFunction } from 'express';
import Token from '../utils/Token';

export default class Validations {
  static verifyLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });
    if (String(password).length < 6 || !emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const token = authorization.split(' ')[1];
    const role = Token.verify(token);
    if (!role) return res.status(401).json({ message: 'Token must be a valid token' });
    return res.status(200).json({ role });
    next();
  }
}
