export const PageRoutes = {
  home: "/",
  community: "/network",
  account: "/account",
  session: (id: string | number): string => `/session/${id}`,
  stream: (id: string | number): string => `/livestream/${id}`,
  creatorProfile: (slug: string | number, tab?: string | number): string =>
    `/creator/${slug}/${tab ?? "streams"}`,
  streamVideo: (id: string | number): string => `/video/${id}`,
  creatorHub: "/creatorhub/stream",
};
