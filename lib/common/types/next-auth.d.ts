import "next-auth";

import { Sector } from "@/auth/types/auth";

declare module "next-auth" {
  export interface User {
    pk: string;
    apiToken: string;
    photo?: string;
    email: string;
    email_verified: boolean;
    name: string;
    city?: string;
    reason?: string;
    phone_number?: string;
    phone_number_verified: boolean;
    role: string;
    full_registered: boolean;
    has_profile: boolean;
    has_bank_details: boolean;
    has_services: boolean;
    has_active_subscription: boolean;
    intent: string;
    linkedin_url?: string;
    active_subscription_membership: string;
    pan_card?: string;
    pan_card_size?: string;
    unread_notifications: number;
    is_approved: boolean;
    objectives: number[];
    objectives_items: ObjectivesItems;
    social_account: SocialAccount;
    tag_list?: string;
  }

  export interface Session {
    user?: User;
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
    company_type?: number;
    company_type_detail?: CompanyType;
    primary_url?: string;
    is_creator: boolean;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    user?: User;
  }
}
