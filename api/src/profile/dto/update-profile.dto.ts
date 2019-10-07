import { Education, Experience, Social } from '../profile.interface';

export class UpdateProfileDto {
  handle?: string;

  company?: string;

  website?: string;

  location?: string;

  status?: string;

  skills?: string[];

  bio?: string;

  githubUsername?: string;

  experiences?: Experience[];

  educations?: Education[];

  social?: Social;
}
