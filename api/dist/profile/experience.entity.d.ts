import { ProfileEntity } from './profile.entity';
export declare class ExperienceEntity {
    id: string;
    title: string;
    company: string;
    location: string;
    from: Date;
    to: Date;
    current: boolean;
    description: '';
    profile: ProfileEntity;
}
