import { sign, SignOptions, verify } from 'jsonwebtoken';
import { User } from '../entities';
import { privateKey } from '../config';

const signOptions: SignOptions = {
  expiresIn: '7d',
};

export const getToken = (user: User): string => {
  return sign(user, privateKey, signOptions);
};

export const verifyToken = (token: string): User => {
  try {
    const decoded: User = <User>verify(token, privateKey);
    return decoded;
  } catch (error) {
    return null;
  }
};
