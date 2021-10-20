import useAuth from "@/auth/context/AuthContext";
import Spinner from "@/common/components/atoms/Spiner";
import CreatorHubFaqTab from "@/creators/components/objects/CreatorHubFaqTab";
import CreatorHubPage from "@/creators/components/page/CreatorHubPage";
import StaticCreatorHub from "@/creators/components/page/StaticCreatorHub";

export default function CreatorHubFaq(): JSX.Element {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!user || !profile || !profile.is_creator) {
    return <StaticCreatorHub />;
  }

  return (
    <CreatorHubPage selectedTab="faq">
      <CreatorHubFaqTab />
    </CreatorHubPage>
  );
}
