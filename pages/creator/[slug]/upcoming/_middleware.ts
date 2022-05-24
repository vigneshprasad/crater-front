import { NextMiddleware, NextResponse } from "next/server";

import { API_BASE_URL } from "@/common/constants/global.constants";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { Webinar } from "@/community/types/community";
import { Creator } from "@/creators/types/creator";

async function fetchCreator(slug: string): Promise<Creator | null> {
  const response = await fetch(
    `${API_BASE_URL}${API_URL_CONSTANTS.creator.retrieveCreatorSlug(slug)}`
  );

  if (response.status === 404) {
    return null;
  }

  const creator = await response.json();

  return creator;
}

async function fetchUpcomingStreamByCreator(host: string): Promise<Webinar> {
  const response = await fetch(
    `${API_BASE_URL}${API_URL_CONSTANTS.groups.getUpcominWebinars}?page=1&page_size=1&host=${host}`
  );

  const upcomingStreams = await response.json();

  return upcomingStreams.results[0];
}

export const middleware: NextMiddleware = async (req) => {
  const slug = req.page.params?.slug;
  const searchParams = req.nextUrl.search;

  if (!slug) {
    return NextResponse.next();
  }

  const creator = await fetchCreator(slug);
  if (!creator) {
    return NextResponse.rewrite("/404");
  }

  const upcomingStream = await fetchUpcomingStreamByCreator(creator.user);
  if (!upcomingStream) {
    return NextResponse.redirect(`/creator/${slug}${searchParams}`);
  }

  return NextResponse.redirect(`/session/${upcomingStream.id}${searchParams}`);
};
