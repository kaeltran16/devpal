import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { AppRequest, AppResponse } from '../app.interface';
import { Token } from './user.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: AppRequest, res: AppResponse, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    const token = authHeaders.split(' ')[1];
    if (authHeaders && token) {
      const decoded = jwt.verify(token, 'test') as Token;
      const user = await this.userService.findById(decoded.id);

      if (!user) {
        throw new UnauthorizedException('incorrect user name or password');
      }

      req.user = user;
      next();
    } else {
      throw new UnauthorizedException('incorrect user name or password');
    }
  }
}
