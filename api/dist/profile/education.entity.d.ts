import { ProfileEntity } from './profile.entity';
export declare class EducationEntity {
    id: string;
    school: string;
    degree: string;
    fieldOfStudy: string;
    from: Date;
    to: Date;
    current: boolean;
    description: string;
    profile: ProfileEntity;
}
