import "next-auth";

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
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    user?: User;
  }
}
