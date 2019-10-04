import { Strategy } from 'passport-jwt';
import { Token } from './user.interface';
declare const JwtStrategy_base: new (...args: any[]) => typeof Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: Token): Promise<{
        id: string;
        username: string;
        email: string;
    }>;
}
export {};
