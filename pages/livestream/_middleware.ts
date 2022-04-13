import { NextMiddleware, NextResponse } from "next/server";

import { API_BASE_URL } from "@/common/constants/global.constants";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { Challenge, Leaderboard } from "@/leaderboard/types/leaderboard";

async function fetchChallenges(): Promise<Challenge[]> {
  const response = await fetch(
    `${API_BASE_URL}${API_URL_CONSTANTS.leaderboard.getChallengeList}`
  );
  const challenges = await response.json();
  return challenges;
}

async function fetchLeaderboards(challengeId: string): Promise<Leaderboard[]> {
  const response = await fetch(
    `${API_BASE_URL}${API_URL_CONSTANTS.leaderboard.getLeaderboardList}?challenge=${challengeId}`
  );
  const leaderboards = await response.json();
  return leaderboards;
}

export const middleware: NextMiddleware = async (req) => {
  const url = req.nextUrl;
  const tab = url.searchParams.get("tab");
  const challengeId = url.searchParams.get("challenge");
  const leaderboardId = url.searchParams.get("leaderboard");

  if (tab === "leaderboard") {
    const challenges = await fetchChallenges();
    if (!challengeId) {
      url.searchParams.set("challenge", challenges[0].id.toString());
      if (!leaderboardId) {
        const leaderboards = await fetchLeaderboards(
          challenges[0].id.toString()
        );
        url.searchParams.set("leaderboard", leaderboards[0].id.toString());
      }

      return NextResponse.redirect(url);
    }

    if (!leaderboardId) {
      const leaderboards = await fetchLeaderboards(challengeId);
      url.searchParams.set("leaderboard", leaderboards[0].id.toString());
      return NextResponse.redirect(url);
    }

    if (challengeId && leaderboardId) {
      const leaderboards = await fetchLeaderboards(challengeId);
      const leaderboardIds = leaderboards.map((leaderboard) => leaderboard.id);
      if (!leaderboardIds.includes(Number(leaderboardId))) {
        url.searchParams.set("leaderboard", leaderboards[0].id.toString());
        return NextResponse.redirect(url);
      }
    }
  }
  return NextResponse.next();
};
