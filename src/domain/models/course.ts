import { Skill } from './index';

export interface Course {
  id: string;
  name: string;
  url: string;
  skills: Skill[];
  isFavorite: boolean;
}
