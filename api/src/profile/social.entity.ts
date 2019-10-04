import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity('social')
export class SocialEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({default: ''})
    facebook: string;

    @Column({default: ''})
    google: string;

    @Column({default: ''})
    linkedin: string;

    @OneToOne(type => ProfileEntity, profile => profile.social)
    profile: ProfileEntity;
}
