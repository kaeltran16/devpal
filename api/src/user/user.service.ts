import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { UserEntity } from './user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { Token, UserRO } from './user.interface';
import { validate } from 'class-validator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const findUserOption = {
      email: loginUserDto.email,
      password: crypto
        .createHmac('sha256', loginUserDto.password)
        .digest('hex'),
    };

    return await this.userRepository.findOne(findUserOption);
  }

  async create(dto: CreateUserDto): Promise<UserRO> {
    const { username, email, password } = dto;

    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email });

    const user = await queryBuilder.getOne();

    if (user) {
      throw new BadRequestException('email and username must be unique');
    }

    let newUser = new UserEntity();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;
    newUser.posts = [];

    const errors = await validate(newUser);
    if (errors.length > 0) {
      throw new BadRequestException('user input is not valid');
    } else {
      const savedUser = await this.userRepository.save(newUser);
      return this.buildUserRO(savedUser);
    }
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserRO> {
    let toUpdate = await this.userRepository.findOne(id);
    delete toUpdate.password;
    delete toUpdate.likes;

    let updated = Object.assign(toUpdate, dto);
    await this.userRepository.save(updated);
    return this.buildUserRO(updated);
  }

  async delete(email: string): Promise<DeleteResult> {
    return await this.userRepository.delete({ email });
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async findByEmail(email: string): Promise<UserRO> {
    const user = await this.userRepository.findOne({ email });
    if (!user) throw new NotFoundException('user not found');

    return this.buildUserRO(user);
  }

  private buildUserRO(user: UserEntity): UserRO {
    const { id, username, email, bio, avatar } = user;

    const payload: Omit<Token, 'exp'> = {
      id,
      username,
      email,
    };
    const token = this.jwtService.sign(payload);
    return {
      user: {
        username,
        email,
        bio,
        avatar,
        token,
      },
    };
  }
}
