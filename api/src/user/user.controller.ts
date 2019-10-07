import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from './user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Token, UserRO } from './user.interface';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Get()
  @UseGuards(AuthGuard())
  async findMe(@User('email') email: string): Promise<UserRO> {
    return await this.userService.findByEmail(email);
  }

  @Put()
  @UseGuards(AuthGuard())
  async update(
    @User('id') id: string,
    @Body('user') userData: UpdateUserDto,
  ): Promise<UserRO> {
    return await this.userService.update(id, userData);
  }

  @Post()
  async create(@Body('user') userData: CreateUserDto): Promise<UserRO> {
    return await this.userService.create(userData);
  }

  @Delete('/:email')
  @UseGuards(AuthGuard())
  async delete(@Param() params) {
    return await this.userService.delete(params.email);
  }

  @Post('login')
  async login(@Body('user') loginDto: LoginUserDto): Promise<UserRO> {
    const user = await this.userService.findOne(loginDto);

    if (!user) throw new NotFoundException('email or password is incorrect');

    const { id, email, username, bio, avatar } = user;

    const payload: Omit<Token, 'exp'> = {
      email,
      id,
      username,
    };
    const token = await this.jwtService.sign(payload);
    return { user: { email, token, username, bio, avatar } };
  }
}
