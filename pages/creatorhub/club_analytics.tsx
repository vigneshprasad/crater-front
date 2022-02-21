import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import dynamic from "next/dynamic";

import useAuth from "@/auth/context/AuthContext";
import Spinner from "@/common/components/atoms/Spiner";
import CreatorApiClient from "@/creators/api";
import CreatorHubPage from "@/creators/components/page/CreatorHubPage";
import StaticCreatorHub from "@/creators/components/page/StaticCreatorHub";
import { AverageEngagementProvider } from "@/creators/context/AverageEngagement";
import { ClubMembersCountProvider } from "@/creators/context/ClubMembersCount";
import { ClubMembersGrowthProvider } from "@/creators/context/ClubMembersGrowth";
import { ComparativeEngagementProvider } from "@/creators/context/ComparativeEngagement";
import { ConversionFunnelProvider } from "@/creators/context/ConversionFunnel";
import { CreatorFollowerProvider } from "@/creators/context/CreatorFollowerContext";
import { TopStreamsProvider } from "@/creators/context/CreatorTopStreams";
import { FollowerGrowthProvider } from "@/creators/context/FollowerGrowth";
import { TopCreatorsProvider } from "@/creators/context/TopCreators";
import { TrafficSourceTypesProvider } from "@/creators/context/TrafficSourceTypes";
import { UsersByCraterProvider } from "@/creators/context/UsersByCrater";

const CreatorClubAnalyticsTab = dynamic(
  () => import("@/creators/components/objects/CreatorClubAnalyticsTab")
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [creator] = await CreatorApiClient(context).getMyCreator();

  if (!creator || !creator?.show_club_members) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      creator: creator || null,
    },
  };
};

type IProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function CreatorHubFaq({ creator }: IProps): JSX.Element {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!user || !profile) {
    return <StaticCreatorHub />;
  }

  return (
    <CreatorHubPage selectedTab="club_analytics" creator={creator}>
      <CreatorFollowerProvider userId={user.pk}>
        <ClubMembersCountProvider>
          <FollowerGrowthProvider>
            <AverageEngagementProvider>
              <ComparativeEngagementProvider>
                <TopStreamsProvider>
                  <TopCreatorsProvider>
                    <ClubMembersGrowthProvider>
                      <TrafficSourceTypesProvider>
                        <ConversionFunnelProvider>
                          <UsersByCraterProvider>
                            <CreatorClubAnalyticsTab />
                          </UsersByCraterProvider>
                        </ConversionFunnelProvider>
                      </TrafficSourceTypesProvider>
                    </ClubMembersGrowthProvider>
                  </TopCreatorsProvider>
                </TopStreamsProvider>
              </ComparativeEngagementProvider>
            </AverageEngagementProvider>
          </FollowerGrowthProvider>
        </ClubMembersCountProvider>
      </CreatorFollowerProvider>
    </CreatorHubPage>
  );
}
