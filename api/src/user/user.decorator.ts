import { createParamDecorator } from '@nestjs/common';
import { AppRequest } from '../app.interface';
import * as jwt from 'jsonwebtoken';

export const User = createParamDecorator((data, req: AppRequest) => {
  if (!!req.user) {
    return !!data ? req.user[data] : req.user;
  }

  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')
    : null;

  if (token && token[1]) {
    const decoded = jwt.verify(token[1], 'test');
    return !!data ? decoded[data] : decoded;
  }
});
