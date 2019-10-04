import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationEntity } from './education.entity';
import { SocialEntity } from './social.entity';
import { ExperienceEntity } from './experience.entity';
import { ProfileEntity } from './profile.entity';

@Module({
    imports: [TypeOrmModule.forFeature([EducationEntity, SocialEntity, ExperienceEntity, ProfileEntity])]
})
export class ProfileModule {
}
