import { EducationEntity } from './education.entity';
import { ExperienceEntity } from './experience.entity';
import { SocialEntity } from './social.entity';
export declare class ProfileEntity {
    id: string;
    handle: string;
    skills: string[];
    status: boolean;
    bio: string;
    website: string;
    company: string;
    githubUsername: string;
    location: string;
    educations: EducationEntity[];
    experiences: ExperienceEntity[];
    social: SocialEntity;
}
