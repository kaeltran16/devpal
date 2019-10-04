import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from './user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { UserRO } from './user.interface';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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

    console.log(user);
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
    }

    const savedUser = await this.userRepository.save(newUser);
    return this.buildUserRO(savedUser);
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    let toUpdate = await this.userRepository.findOne(id);
    delete toUpdate.password;
    delete toUpdate.likes;

    let updated = Object.assign(toUpdate, dto);
    return await this.userRepository.save(updated);
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
    console.log(email);
    const user = await this.userRepository.findOne({ email });
    if (!user) throw new NotFoundException('user not found');

    return this.buildUserRO(user);
  }

  public generateJwt(user: UserEntity): string {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        exp: exp.getTime() / 1000,
      },
      'test',
    );
  }

  private buildUserRO(user: UserEntity): UserRO {
    const { username, email, bio, avatar } = user;

    const token = this.generateJwt(user);
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
