import { Education, Experience, Social } from '../profile.interface';
import { IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  handle: string;

  company?: string;

  website?: string;

  location?: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  skills: string[];

  bio?: string;

  githubUsername?: string;

  experiences?: Experience[];

  educations?: Education[];

  social?: Social;
}
