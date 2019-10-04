import { UserRO } from './user.interface';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
export declare class UserController {
    private readonly userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    findMe(email: string): Promise<UserRO>;
    update(id: string, userData: UpdateUserDto): Promise<UserRO>;
    create(userData: CreateUserDto): Promise<UserRO>;
    delete(params: any): Promise<import("typeorm").DeleteResult>;
    login(loginDto: LoginUserDto): Promise<UserRO>;
}
