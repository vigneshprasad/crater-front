import useAuth from "@/auth/context/AuthContext";
import Spinner from "@/common/components/atoms/Spiner";
import { UpcomingStreamsProvider } from "@/community/context/UpcomingStreamsContext";
import CreatorHubStreamTab from "@/creators/components/objects/CreatorHubStreamTab";
import CreatorHubPage from "@/creators/components/page/CreatorHubPage";
import StaticCreatorHub from "@/creators/components/page/StaticCreatorHub";
import { CreatorStreamProvider } from "@/creators/context/CreatorStreamsContext";
import { PastStreamProvider } from "@/stream/context/PastStreamContext";

export default function CreatorHubStream(): JSX.Element {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!user || !profile || !profile.is_creator) {
    return <StaticCreatorHub />;
  }

  return (
    <CreatorHubPage selectedTab="stream">
      <CreatorStreamProvider creatorId={user.pk}>
        <UpcomingStreamsProvider host={user.pk}>
          <PastStreamProvider host={user.pk}>
            <CreatorHubStreamTab />
          </PastStreamProvider>
        </UpcomingStreamsProvider>
      </CreatorStreamProvider>
    </CreatorHubPage>
  );
}
