import dynamic from "next/dynamic";

import useAuth from "@/auth/context/AuthContext";
import Spinner from "@/common/components/atoms/Spiner";
import CreatorHubPage from "@/creators/components/page/CreatorHubPage";
import StaticCreatorHub from "@/creators/components/page/StaticCreatorHub";
import { CreatorFollowerProvider } from "@/creators/context/CreatorFollowerContext";

export default function CreatorHubFaq(): JSX.Element {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!user || !profile || !profile.is_creator) {
    return <StaticCreatorHub />;
  }

  const CreatorFollowersTab = dynamic(
    () => import("@/creators/components/objects/CreatorFollowersTab")
  );

  return (
    <CreatorHubPage selectedTab="club_members">
      <CreatorFollowerProvider userId={user.pk}>
        <CreatorFollowersTab />
      </CreatorFollowerProvider>
    </CreatorHubPage>
  );
}
