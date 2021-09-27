export interface UserTag {
  pk: number;
  name: string;
}

export interface CoverFile {
  pk: number;
  file: string;
}

export interface EducationLevel {
  key: number;
  value: string;
}

export interface YearsOfExperience {
  key: number;
  value: string;
}

export interface Sector {
  key: number;
  value: string;
}

export interface CompanyType {
  key: number;
  value: string;
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
  education_level_detail?: EducationLevel;
  sector?: number;
  sector_detail?: Sector;
  years_of_experience?: number;
  years_of_experience_detail?: YearsOfExperience;
  years_of_experience?: number;
  years_of_experience_detail?: YearsOfExperience;
  company_type?: number;
  company_type_detail?: CompanyType;
}
