export const PageRoutes = {
  home: "/",
  community: "/network",
  account: "/account",
  session: (id: string): string => `/session/${id}`,
  stream: (id: string): string => `/livestream/${id}`,
  creatorProfile: (id: string, tab?: string): string => `/creator/${id}/${tab}`,
  streamVideo: (id: string | number): string => `/video/${id}`,
};
