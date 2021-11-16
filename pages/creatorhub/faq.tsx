import dynamic from "next/dynamic";

import useAuth from "@/auth/context/AuthContext";
import Spinner from "@/common/components/atoms/Spiner";
import CreatorHubPage from "@/creators/components/page/CreatorHubPage";
import StaticCreatorHub from "@/creators/components/page/StaticCreatorHub";

const CreatorHubFaqTab = dynamic(
  () => import("@/creators/components/objects/CreatorHubFaqTab")
);

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
