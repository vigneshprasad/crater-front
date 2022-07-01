import { NextMiddleware, NextResponse } from "next/server";

export const middleware: NextMiddleware = async (req) => {
  const url = req.nextUrl;
  const tab = url.searchParams.get("tab");

  if (!tab) {
    url.searchParams.set("tab", "pastStreams");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};
