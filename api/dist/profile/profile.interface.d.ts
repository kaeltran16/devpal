export interface Profile {
    id: string;
    userId: string;
    handle: string;
    company?: string;
    website?: string;
    location?: string;
    status: string;
    skills: string[];
    bio?: string;
    githubUsername?: string;
    experiences: Experience[];
    educations: Education[];
    social: Social;
}
export interface Experience {
    id: string;
    title: string;
    company: string;
    location?: string;
    from: Date;
    to?: Date;
    current: boolean;
    description?: string;
}
export interface Education {
    id: string;
    school: string;
    degree: string;
    fieldOfStudy: string;
    from: Date;
    to?: Date;
    current: boolean;
    description?: string;
}
export interface Social {
    id: string;
    facebook?: string;
    linkedin?: string;
    google?: string;
}
