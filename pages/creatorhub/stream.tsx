import useAuth from "@/auth/context/AuthContext";
import Spinner from "@/common/components/atoms/Spiner";
import { UpcomingStreamsProvider } from "@/community/context/UpcomingStreamsContext";
import CreatorHubStreamTab from "@/creators/components/objects/CreatorHubStreamTab";
import CreatorHubPage from "@/creators/components/page/CreatorHubPage";
import { CreatorStreamProvider } from "@/creators/context/CreatorStreamsContext";

export default function CreatorHubStream(): JSX.Element {
  const { user, loading } = useAuth();

  if (loading || !user) {
    return <Spinner />;
  }

  return (
    <CreatorHubPage selectedTab="stream">
      <CreatorStreamProvider creatorId={user.pk}>
        <UpcomingStreamsProvider>
          <CreatorHubStreamTab />
        </UpcomingStreamsProvider>
      </CreatorStreamProvider>
    </CreatorHubPage>
  );
}
