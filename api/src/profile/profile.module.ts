import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationEntity } from './education.entity';
import { SocialEntity } from './social.entity';
import { ExperienceEntity } from './experience.entity';
import { ProfileEntity } from './profile.entity';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { PassportModule } from '@nestjs/passport';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([
      EducationEntity,
      SocialEntity,
      ExperienceEntity,
      ProfileEntity,
      UserEntity,
    ]),
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService],
})
export class ProfileModule {}
