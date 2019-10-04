import { Request, Response } from 'express';
import { User } from './user/user.interface';
export interface AppResponse extends Response {
    user: User;
}
export interface AppRequest extends Request {
    user: User;
}
