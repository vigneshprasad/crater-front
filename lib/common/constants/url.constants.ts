export const HOST_URL = process.env.HOST_URL as string;

export const API_URL_CONSTANTS = {
  auth: {
    getUser: "/user/auth/user/",
    getOtp: "/crater/auth/otp/",
    phoneLogin: "/crater/auth/verify/",
    getProfile: "/user/auth/profile/",
    postProfileCoverFile: "/user/auth/profile/cover_file/",
    getUserPermission: "user/auth/users/permission/",
  },
  user: {
    user: "/user/auth/user/",
    profile: "/user/auth/profile/",
    network: "/user/auth/network/",
    user_count: "/user/auth/users/count/",
    getAllReferrals: "/user/auth/referrals/",
    getReferralSummary: "/user/auth/referrals/summary/",
    followStreamCategory: "/user/auth/category/follow/",
    unfollowStreamCategory: "/user/auth/category/unfollow/",
    getProfileStatus: "/user/auth/profile/status/",
    isCategoryFollower: (slug: string): string =>
      `/user/auth/category/follower/?category=${slug}`,
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
    getWebinarCreatorList: "/groups/conversations/webinars/creators/",
  },
  creator: {
    getCreatorList: "/crater/creator/",
    getMembersList: "/crater/community/members/",
    getCreatorRankList: "/crater/creator/ranking/",
    retrieveCreator: (id: number): string => `/crater/creator/${id}/`,
    retrieveCreatorSlug: (slug: string): string => `/crater/creator/s/${slug}/`,
    postFollowCreator: "/crater/followers/follow/",
    withRewards: "/crater/creator/with_rewards/",
    withCoins: "/crater/creator/with_coins/",
    getMyCreator: "/crater/creator/me/",
    getCreatorFollowers: "/crater/followers/",
    downloadCreatorFollowersCsv: "/crater/followers/download_csv/",
    subscribeCreator: "/crater/followers/notify/",
    unsubscribeCreator: (id: number): string => `/crater/followers/${id}/`,
    getStats: "/crater/creator/stats/",
    retrieveCreatorUpiInfo: (id: string | number): string =>
      `/crater/creator/upi/${id}/`,
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
    getGroupQuestions: "/groups/conversations/stream/questions/",
    postGroupQuestion: "/groups/conversations/stream/questions/",
    postGroupQuestionUpvote: "/groups/conversations/stream/questions/upvote/",
    getAllVideos: "/groups/public/conversations/webinars/videos/",
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
    retrieveCategory: (slug: string): string =>
      `/groups/conversations/categories/s/${slug}/`,
    streamsToRsvp: "/groups/conversations/webinars/suggested/",
    generateCoverPhoto:
      "https://84wp6p3fi7.execute-api.ap-south-1.amazonaws.com/test",
  },
  rewards: {
    rewardsList: "/crater/reward/",
    rewardTypesList: "/crater/reward/type/",
  },
  auctions: {
    getBids: "/crater/bid/",
    postBid: "/crater/bid/",
    retrievAuction: (id: number | string): string => `/crater/auction/${id}/`,
    retrieveBid: (id: number | string): string => `/crater/bid/${id}/`,
    getActiveAuction: (reward: string | number): string =>
      `/crater/auction/${reward}/active_auction/`,
    getCoinPriceLogs: "/crater/coin_log/",
    acceptBid: (bid: number | string): string => `/crater/bid/${bid}/accept/`,
    bidSummaryForCoin: (coin: number | string): string =>
      `/crater/bid/${coin}/summary/`,
    auctionSummaryForCoin: (coin: number | string): string =>
      `/crater/auction/${coin}/summary/`,
    getAllAuctions: "/crater/auction/all/",
  },
  sales: {
    getSalesList: "/crater/sale/",
    getFeaturedSalesList: "/crater/sale/featured/",
    getRewardSaleTopSellers: "/crater/sale/sellers/featured/",
    postRewardSale: "/crater/sale/",
    postSaleLog: "/crater/sale/log/",
    postSaleLogAccept: (id: number): string => `/crater/sale/log/${id}/accept/`,
    postSaleLogDecline: (id: number): string =>
      `/crater/sale/log/${id}/decline/`,
    retrieveRewardSale: (id: number | string): string => `/crater/sale/${id}/`,
    retrieveRewardSaleForStream: (id: number | string): string =>
      `/crater/sale/${id}/stream`,
  },
  coins: {
    getAuctions: "/crater/auction/",
    getCointForCreator: (id: string | number): string =>
      `/crater/coins/${id}/creator/`,
  },
  chat: {
    getChatReactions: "/groups/conversations/chatreactions/",
  },
  payments: {
    postPayment: "/crater/payment/",
    createStripeIntent: "/crater/gateways/stripe/",
    retrieveStripeIntent: (client_secret: string): string =>
      `/crater/gateways/stripe/${client_secret}/`,
  },
  exchange: {
    coinHoldingsList: "/crater/exchange/coin_holding/",
    userRewardList: "/crater/exchange/user_reward/",
  },
  series: {
    getAllSeries: "/groups/public/conversations/series/",
    postSeriesRequest: "/groups/conversations/series/requests/",
  },
  analytics: {
    getMyClubMembersCount: "/crater/analytics/my_club/",
    getFollowerGrowth: "/crater/analytics/follower_growth/",
    getAverageEngagement: "/crater/analytics/average_engagement/",
    getComparativeEngagement: "/crater/analytics/comparative_engagement/",
    getMyTopStreams: "/crater/analytics/top_streams/",
    getTopCreators: "/crater/analytics/comparative_ranking/",
    getClubMembersGrowth: "/crater/analytics/club_members_growth/",
    getTrafficSourceTypes: "/crater/analytics/traffic_source_types/",
    getConversionFunnel: "/crater/analytics/conversion_funnel/",
    getUsersByCrater: "/crater/analytics/users_by_crater/",
    getChannelStats: "/crater/analytics/channel_stats/",
    getPlatformStats: "/crater/analytics/platform_stats/",
    getStreamCategoryDistribution:
      "/crater/analytics/stream_category_distribution/",
    getStreamTime: "/crater/analytics/stream_time",
    getStreamCompletionRate: "/crater/analytics/stream_completion",
  },
  firebase: {
    getFirebaseToken: "/integrations/firebase/token/",
    postChatMessage:
      "https://us-central1-crater-b6a7b.cloudfunctions.net/sendMessage",
  },
  leaderboard: {
    getChallengeList: "/leaderboard/challenges/",
    retrieveChallenge: (id: number | string): string =>
      `/leaderboard/challenges/${id}/`,
    getLeaderboardList: "/leaderboard/leaderboards/",
    getUserLeaderboardList: "/leaderboard/user/leaderboards/",
  },
  tokens: {
    getLearnUserMeta: "/tokens/learn/meta/",
  },
};

export const LEARN_MORE_URL =
  "https://crater-about.notion.site/Welcome-to-Crater-Club-03d3849b9ae940619a111a737652f41d";

export const DISCORD_URL = "https://discord.gg/WBBgYSD8YQ";

export const ABOUT_URL = "http://www.joincrater.club/";

export const AUCTION_LEARN_MORE_URL =
  "https://calendly.com/vivan-1/learn-more-about-auctions";

export const INSTAGRAM_URL = "https://www.instagram.com/crater.club/";

export const LINKEDIN_URL = "https://www.linkedin.com/company/craterclub/";

export const HIRING_URL =
  "https://crater-about.notion.site/Lets-build-together-b1babcce8a4d4ef2b5787af058d391d1";

export const BECOME_CREATOR_CALENDLY = "https://bit.ly/3rDsnaL";

export const LEADERBOARD_URL =
  "https://worknetwork.typeform.com/to/wMqdEEn3?utm_source=website";

export const START_CREATOR_JOURNET_CALENDLY =
  "https://calendly.com/craterclub/apply-to-create-on-crater";

export const HELP_CENTER = "https://crater.zendesk.com/hc/en-us";

export const WEB3_CRATER_LANDING = "https://web3.crater.club/";

export const BLOG_URL = "https://blog.crater.club/";
