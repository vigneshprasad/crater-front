import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import dynamic from "next/dynamic";

import HubPageLayout, {
  getHubServerSideProps,
} from "@/common/components/layouts/HubPageLayout/v2";
import { PageRoutes } from "@/common/constants/route.constants";
import { ClubMembersGrowthProvider } from "@/creators/context/ClubMembersGrowth";
import { ConversionFunnelProvider } from "@/creators/context/ConversionFunnel";
import { TopStreamsProvider } from "@/creators/context/CreatorTopStreams";
import { TrafficSourceTypesProvider } from "@/creators/context/TrafficSourceTypes";
import { Creator } from "@/creators/types/creator";

const HubChannelStatisticsTab = dynamic(
  () => import("@/creators/components/objects/HubChannelStatisticsTab")
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
      <TopStreamsProvider>
        <ConversionFunnelProvider>
          <TrafficSourceTypesProvider>
            <ClubMembersGrowthProvider>
              <HubChannelStatisticsTab creator={creator} />
            </ClubMembersGrowthProvider>
          </TrafficSourceTypesProvider>
        </ConversionFunnelProvider>
      </TopStreamsProvider>
    </HubPageLayout>
  );
}
