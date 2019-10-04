import { UserEntity } from './user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { UserRO } from './user.interface';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private readonly userRepository;
    private jwtService;
    constructor(userRepository: Repository<UserEntity>, jwtService: JwtService);
    findAll(): Promise<UserEntity[]>;
    findOne(loginUserDto: LoginUserDto): Promise<UserEntity>;
    create(dto: CreateUserDto): Promise<UserRO>;
    update(id: string, dto: UpdateUserDto): Promise<UserRO>;
    delete(email: string): Promise<DeleteResult>;
    findById(id: string): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserRO>;
    private buildUserRO;
}
