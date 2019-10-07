import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EducationEntity } from './education.entity';
import { ExperienceEntity } from './experience.entity';
import { SocialEntity } from './social.entity';
import { UserEntity } from '../user/user.entity';

@Entity('profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  handle: string;

  @Column('simple-array')
  skills: string[];

  @Column()
  status: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  website: string;

  @Column({ default: '' })
  company: string;

  @Column({ default: '' })
  githubUsername: string;

  @Column({ default: '' })
  location: string;

  @OneToMany(type => EducationEntity, education => education.profile, {
    nullable: true,
  })
  @JoinColumn()
  educations: EducationEntity[];

  @OneToMany(type => ExperienceEntity, education => education.profile, {
    nullable: true,
  })
  @JoinColumn()
  experiences: ExperienceEntity[];

  @OneToOne(type => SocialEntity, social => social.profile, {
    nullable: true,
  })
  @JoinColumn()
  social: SocialEntity;

  @OneToOne(type => UserEntity, user => user.profile)
  @JoinColumn()
  user: UserEntity;
}
