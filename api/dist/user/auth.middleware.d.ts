import { NestMiddleware } from '@nestjs/common';
import { UserService } from './user.service';
import { NextFunction } from 'express';
import { AppRequest, AppResponse } from '../app.interface';
export declare class AuthMiddleware implements NestMiddleware {
    private userService;
    constructor(userService: UserService);
    use(req: AppRequest, res: AppResponse, next: NextFunction): Promise<void>;
}
