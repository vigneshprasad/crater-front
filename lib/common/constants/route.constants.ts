// import { HubTabKeys } from "../components/layouts/HubPageLayout";
import { HubNavKeys } from "../components/objects/AsideNav/v2";

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
  streamVideo: (id: string | number, tab?: string | number): string =>
    `/video/${id}?tab=${tab ?? "pastStreams"}`,
  rewardListing: (slug: string, id: string | number): string =>
    `/tickets/${slug}/${id}`,
  checkoutBid: (bid: number | string, intent: string | number): string =>
    `/checkout/bid/${bid}/${intent}`,
  bidPaymentSuccess: (bid: number | string): string =>
    `/checkout/bid/success/${bid}`,
  hub: (tab: HubNavKeys = "stream"): string => `/hub/${tab}`,
  join: "/join",
  pastStreams: (id: string | number): string => `/categories/${id}/streams/`,
  leaderboard: "/leaderboard",
  category: (slug: string): string => `/category/${slug}/`,
};
