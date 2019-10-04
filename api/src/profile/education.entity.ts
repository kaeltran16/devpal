import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity('education')
export class EducationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    school: string;

    @Column()
    degree: string;

    @Column()
    fieldOfStudy: string;

    @Column({type: 'timestamp'})
    from: Date;

    @Column({ type: 'timestamp'})
    to: Date;

    @Column({default: false})
    current: boolean;

    @Column({default: ''})
    description: string;

    @ManyToOne(type => ProfileEntity, profile => profile.educations)
    profile: ProfileEntity;
}
