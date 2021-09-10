export interface UserTag {
  pk: number;
  name: string;
}

export interface CoverFile {
  pk: number;
  file: string;
}

export interface EducationLevel {
  value: number;
  name: string;
}

export interface YearsOfExperience {
  value: number;
  name: string;
}

export interface Sector {
  value: number;
  name: string;
}

export interface Profile {
  pk: number;
  name: string;
  role: string;
  photo?: string;
  uuid: string;
  cover?: number;
  cover_file?: string;
  cover_thumbnail?: string;
  introduction?: string;
  other_tag: number;
  tag_list: UserTag[];
  tags?: number[];
  education_level?: number;
  sector?: number;
  years_of_experience?: number;
}
