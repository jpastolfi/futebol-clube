import * as jwt from 'jsonwebtoken';

export default class Token {
  private static jwtSecret = process.env.JWT_SECRET || 'jwt_secret';
  private static config: jwt.SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  static sign(payload: jwt.JwtPayload): string {
    return jwt.sign(payload, Token.jwtSecret, Token.config);
  }

  static verify(token: string): jwt.JwtPayload | boolean {
    try {
      const payload = jwt.verify(token, this.jwtSecret) as jwt.JwtPayload;
      const { role } = payload;
      return role;
    } catch (e) {
      return false;
    }
  }
}
