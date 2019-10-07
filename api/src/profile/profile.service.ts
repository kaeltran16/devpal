import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from './profile.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ProfileRO } from './profile.interface';
import { CreateProfileDto } from './dto/create-profile.dto';
import { validate } from 'class-validator';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<ProfileEntity[]> {
    return await this.profileRepository.find();
  }

  async create(dto: CreateProfileDto, email: string): Promise<ProfileRO> {
    const profile = await this.findByUserEmail(email);

    if (profile) {
      throw new BadRequestException('profile already existed');
    }

    const user = await this.userRepository.findOne({ email });

    const profileEntity = new ProfileEntity();

    const newProfile = Object.assign(profileEntity, dto);
    newProfile.user = user;
    newProfile.experiences = null;
    newProfile.educations = null;
    newProfile.social = null;
    const errors = await validate(newProfile);
    if (errors.length > 0) {
      throw new BadRequestException('user input is not valid');
    } else {
      const savedProfile = await this.profileRepository.save(newProfile);
      return this.buildProfileRO(savedProfile);
    }
  }

  async update(email: string, dto: UpdateProfileDto): Promise<ProfileRO> {
    let toUpdate = await this.findByUserEmail(email);

    if (!toUpdate) throw new NotFoundException('profile not found.');

    delete toUpdate.handle;

    let updated = Object.assign(toUpdate, dto);
    await this.profileRepository.save(updated);
    return this.buildProfileRO(updated);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.profileRepository.delete({ id });
  }

  async findById(id: string): Promise<ProfileEntity> {
    const profile = await this.profileRepository.findOne(id);

    if (!profile) throw new NotFoundException('profile not found');

    return profile;
  }

  async findByHandle(handle: string) {
    const profile = await this.profileRepository.findOne({ handle });
    if (!profile) throw new NotFoundException('profile not found');

    return profile;
  }

  async findByUserId(id: string) {
    const profile = await this.profileRepository.findOne({
      relations: ['user'],
      where: {
        user: {
          id,
        },
      },
    });

    if (!profile) throw new NotFoundException('profile not found');
    return profile;
  }

  async findByUserEmail(email: string) {
    return await this.profileRepository.findOne({
      where: {
        user: {
          email,
        },
      },
    });
  }

  private buildProfileRO(profile: ProfileEntity): ProfileRO {
    return {
      profile: profile,
    };
  }
}
