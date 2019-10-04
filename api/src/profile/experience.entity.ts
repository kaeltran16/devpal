import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity('experience')
export class ExperienceEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    company: string;

    @Column({default: ''})
    location: string;

    @Column({type: 'timestamp'})
    from: Date;

    @Column({ type: 'timestamp'})
    to: Date;

    @Column({default: false})
    current: boolean;

    @Column({default: ''})
    description: '';

    @ManyToOne(type => ProfileEntity, profile => profile.educations)
    profile: ProfileEntity;
}
