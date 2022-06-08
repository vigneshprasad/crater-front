import { HubTabKeys } from "../components/layouts/HubPageLayout";

export const PageRoutes = {
  home: "/",
  community: "/network",
  account: "/account",
  auctions: "/auctions",
  tokens: (slug?: string): string => (slug ? `/tokens/${slug}` : "/tokens"),
  tickets: "/tickets",
  session: (id: string | number, tab?: string | number): string =>
    `/session/${id}?tab=${tab ?? "about"}`,
  stream: (
    id: string | number,
    tab?: "chat" | "auction" | "leaderboard"
  ): string => `/livestream/${id}?tab=${tab ?? "chat"}`,
  creatorProfile: (slug: string | number, tab?: string | number): string =>
    `/creator/${slug}/${tab ?? "streams"}`,
  streamVideo: (id: string | number): string => `/video/${id}`,
  rewardListing: (slug: string, id: string | number): string =>
    `/tickets/${slug}/${id}`,
  checkoutBid: (bid: number | string, intent: string | number): string =>
    `/checkout/bid/${bid}/${intent}`,
  bidPaymentSuccess: (bid: number | string): string =>
    `/checkout/bid/success/${bid}`,
  hub: (tab: HubTabKeys = "stream"): string => `/hub/${tab}`,
  join: "/join",
  pastStreams: (id: string | number): string => `/categories/${id}/streams/`,
  leaderboard: "/leaderboard",
};
