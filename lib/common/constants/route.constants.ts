export const PageRoutes = {
  home: "/",
  community: "/community",
  account: "/account",
  session: (id: string): string => `/session/${id}`,
  stream: (id: string): string => `/webinar/${id}`,
  creatorProfile: (id: string, tab?: string): string => `/creator/${id}/${tab}`,
};
