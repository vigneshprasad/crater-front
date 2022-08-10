import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import dynamic from "next/dynamic";

import HubPageLayout, {
  getHubServerSideProps,
} from "@/common/components/layouts/HubPageLayout/v2";
import { PageRoutes } from "@/common/constants/route.constants";
import { AverageEngagementProvider } from "@/creators/context/AverageEngagement";
import { ClubMembersCountProvider } from "@/creators/context/ClubMembersCount";
import { ClubMembersGrowthProvider } from "@/creators/context/ClubMembersGrowth";
import { ComparativeEngagementProvider } from "@/creators/context/ComparativeEngagement";
import { ConversionFunnelProvider } from "@/creators/context/ConversionFunnel";
import { TopStreamsProvider } from "@/creators/context/CreatorTopStreams";
import { FollowerGrowthProvider } from "@/creators/context/FollowerGrowth";
import { TopCreatorsProvider } from "@/creators/context/TopCreators";
import { TrafficSourceTypesProvider } from "@/creators/context/TrafficSourceTypes";
import { UsersByCraterProvider } from "@/creators/context/UsersByCrater";
import { Creator } from "@/creators/types/creator";

const CreatorClubAnalyticsTab = dynamic(
  () => import("@/creators/components/objects/CreatorClubAnalyticsTab")
);

interface PageProps {
  creator: Creator | null;
  userId?: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  try {
    const data = await getHubServerSideProps(context);
    const { creator } = data;

    if (!creator?.show_analytics && !creator?.show_club_members) {
      return {
        redirect: {
          destination: PageRoutes.hub(),
        },
        props: {} as PageProps,
      };
    }

    return {
      props: {
        ...data,
      },
    };
  } catch {
    return {
      redirect: {
        destination: "/join",
      },
      props: {} as PageProps,
    };
  }
};

type IProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function HubAnalytics({ creator }: IProps): JSX.Element {
  return (
    <HubPageLayout activeTab="channel_statistics" creator={creator}>
      {/* <CreatorFollowerProvider userId={userId}> */}
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
                          {creator && (
                            <CreatorClubAnalyticsTab creator={creator} />
                          )}
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
      {/* </CreatorFollowerProvider> */}
    </HubPageLayout>
  );
}
