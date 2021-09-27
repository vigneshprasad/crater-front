export const HOST_URL = process.env.HOST_URL as string;

export const API_URL_CONSTANTS = {
  auth: {
    getUser: "/user/auth/user/",
    getOtp: "/crater/auth/otp/",
    phoneLogin: "/crater/auth/verify/",
    getProfile: "/user/auth/profile/",
    postProfileCoverFile: "/user/auth/profile/cover_file/",
  },
  user: {
    user: "/user/auth/user/",
    profile: "/user/auth/profile/",
    network: "/user/auth/network/",
  },
  integrations: {
    dyte: {
      getParticpant: (groupId: string): string =>
        `/integrations/dyte/participant/${groupId}/`,
      connect: (groupId: string): string =>
        `/integrations/dyte/participant/${groupId}/connect/`,
    },
  },
  conversations: {
    webinars: "/groups/conversations/webinars/",
    retrieveGroup: (id: string): string => `/groups/groups/${id}/`,
    retrieveWebinar: (id: string): string =>
      `/groups/conversations/webinars/${id}/`,
  },
  creator: {
    getCreatorList: "/crater/creator/",
    getMembersList: "/crater/community/members/",
    retrieveCreator: (id: number): string => `/crater/creator/${id}/`,
  },
  groups: {
    retrieveGroupRequest: (id: string): string => `/groups/requests/${id}/`,
    postGroupRequest: "/groups/requests/",
    getGroups: "/groups/groups/",
    getAllLiveWebinars: "/groups/public/conversations/webinars/featured/",
    getUpcominWebinars: "/groups/public/conversations/webinars/upcoming/",
    getWebinars: "/groups/conversations/webinars/",
  },
  community: {
    getCommunityList: "/crater/community/",
    getCommunityMembers: "/crater/community/members/",
    getAllRooms: "/crater/community/rooms/",
  },
  agora: {
    getToken: "/integrations/agora/token/",
  },
  network: {
    getUserProfile: "/user/auth/network/",
  },
  meta: {
    userTags: "/tags/user/",
    education: "/user/meta/profile/education/",
    experience: "/user/meta/profile/experience/",
    sector: "/user/meta/profile/sector/",
  },
};
