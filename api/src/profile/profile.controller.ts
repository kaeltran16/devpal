import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileRO } from './profile.interface';
import { User } from '../user/user.decorator';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthGuard())
  @Post()
  async create(
    @Body('profile') profileData: CreateProfileDto,
    @User('email') email: string,
  ): Promise<ProfileRO> {
    return await this.profileService.create(profileData, email);
  }

  @UseGuards(AuthGuard())
  @Get(':email')
  async findProfile(@User('email') handle: string) {
    return await this.profileService.findByUserEmail(handle);
  }

  @UseGuards(AuthGuard())
  @Delete(':email')
  async delete(@User('email') email: string) {
    return await this.profileService.findByUserEmail(email);
  }

  @UseGuards(AuthGuard())
  @Put()
  async update(
    @Body('profile') profileData: UpdateProfileDto,
    @User('email') email: string,
  ) {
    return await this.profileService.update(email, profileData);
  }
}
