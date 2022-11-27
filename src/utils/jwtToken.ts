
import { sign } from 'jsonwebtoken';
import { jwtSecret, TOKEN_EXPIRED } from '../constrain';

export type TokenData = {
    _id: string;
    iat?: number;
    exp?: number;
    from?: number;
}

export function jwtEncode(userId: any, expiresIn = TOKEN_EXPIRED) {
    const payload: TokenData = { _id: userId };

    return sign(payload, jwtSecret, { expiresIn });
}
  