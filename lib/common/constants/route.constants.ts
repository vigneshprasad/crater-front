export const PageRoutes = {
  home: "/",
  community: "/network",
  account: "/account",
  session: (id: string | number): string => `/session/${id}`,
  stream: (id: string | number): string => `/livestream/${id}`,
  creatorProfile: (id: string | number, tab?: string | number): string =>
    `/creator/${id}/${tab}`,
  streamVideo: (id: string | number): string => `/video/${id}`,
  creatorHub: "/creatorhub/stream",
};
