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
    user_count: "/user/auth/users/count/",
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
    allWebinars: "/groups/conversations/webinars/all/",
    webinars: "/groups/conversations/webinars/",
    retrieveGroup: (id: string): string =>
      `/groups/conversations/webinars/${id}/`,
    retrieveWebinar: (id: string): string =>
      `/groups/conversations/webinars/all/${id}/`,
  },
  creator: {
    getCreatorList: "/crater/creator/",
    getMembersList: "/crater/community/members/",
    retrieveCreator: (id: number): string => `/crater/creator/${id}/`,
    retrieveCreatorSlug: (slug: string): string => `/crater/creator/s/${slug}/`,
    postFollowCreator: "/crater/followers/follow/",
    withRewards: "/crater/creator/with_rewards/",
    withCoins: "/crater/creator/with_coins/",
  },
  groups: {
    retrieveGroupRequest: (id: string): string => `/groups/requests/${id}/`,
    postGroupRequest: "/groups/requests/",
    getGroups: "/groups/groups/",
    getAllLiveWebinars: "/groups/public/conversations/webinars/featured/",
    getUpcominWebinars: "/groups/public/conversations/webinars/upcoming/",
    getWebinars: "/groups/conversations/webinars/",
    getPastWebinars: "/groups/public/conversations/webinars/past/",
    retrieveStreamRecording: (id: string | number): string =>
      `/groups/recordings/${id}/`,
  },
  community: {
    getCommunityList: "/crater/community/",
    getCommunityMembers: "/crater/community/members/",
    getAllRooms: "/crater/community/rooms/",
    postJoinCommunity: "/crater/community/members/join/",
  },
  follower: {
    getFollowersList: "/crater/followers/",
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
  stream: {
    createStream: "/groups/conversations/webinars/",
    getCategories: "/groups/conversations/categories/",
  },
  rewards: {
    rewardsList: "/crater/reward/",
  },
  coins: {
    getBids: "/crater/bid/",
    getAuctions: "/crater/auction/",
    getCointForCreator: (id: string | number): string =>
      `/crater/coins/${id}/creator/`,
  },
  chat: {
    getChatReactions: "/groups/conversations/chatreactions/",
  },
};
