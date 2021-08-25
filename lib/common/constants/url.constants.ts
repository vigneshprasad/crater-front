// eslint-disable-next-line import/prefer-default-export
export const API_URL_CONSTANTS = {
  auth: {
    getUser: "/user/auth/user/",
    getOtp: "/crater/auth/otp/",
    phoneLogin: "/crater/auth/verify/",
  },
  creator: {
    getCreatorList: "/crater/creator/",
    getMembersList: "/crater/community/members/",
    retrieveCreator: (id: number): string => `/crater/creator/${id}/`,
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
};
