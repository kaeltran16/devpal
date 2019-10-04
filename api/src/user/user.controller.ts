import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './user.decorator';
import { UserRO } from './user.interface';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findMe(@User('email') email: string): Promise<UserRO> {
    return await this.userService.findByEmail(email);
  }

  @Put()
  async update(@User('id') id: string, @Body('user') userData: UpdateUserDto) {
    return await this.userService.update(id, userData);
  }

  @Post()
  async create(@Body('user') userData: CreateUserDto): Promise<UserRO> {
    return await this.userService.create(userData);
  }

  @Delete('/:email')
  async delete(@Param() params) {
    return await this.userService.delete(params.email);
  }

  @Post('login')
  async login(@Body('user') loginDto: LoginUserDto): Promise<UserRO> {
    const user = await this.userService.findOne(loginDto);

    if (!user) throw new NotFoundException('email or password is incorrect');

    const token = await this.userService.generateJwt(user);
    const { email, username, bio, avatar } = user;
    return { user: { email, token, username, bio, avatar } };
  }
}
