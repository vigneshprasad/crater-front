import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import dynamic from "next/dynamic";

import useAuth from "@/auth/context/AuthContext";
import { UpcomingStreamsProvider } from "@/community/context/UpcomingStreamsContext";
import CreatorPageLayout from "@/creators/components/layouts/CreatorPageLayout";
import CreatorPage, {
  CreatorPageParams,
  CreatorPageProps,
  getCreatorStaticPaths,
  getCreatorStaticProps,
} from "@/creators/components/page/CreatorPage";
import { FollowerProvider } from "@/creators/context/FollowerContext";
import { PastStreamProvider } from "@/stream/context/PastStreamContext";

const CreatorStreamsTab = dynamic(
  () => import("@/creators/components/objects/CreatorStreamsTab")
);

export const getStaticPaths: GetStaticPaths<CreatorPageParams> =
  getCreatorStaticPaths;

export const getStaticProps: GetStaticProps<
  CreatorPageProps,
  CreatorPageParams
> = getCreatorStaticProps;

type IProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function CreatorStreams({ creator, slug }: IProps): JSX.Element {
  const { user } = useAuth();

  return (
    <CreatorPageLayout creator={creator} slug={slug}>
      <FollowerProvider creator={creator.id} user={user?.pk}>
        <CreatorPage selectedTab="streams">
          <UpcomingStreamsProvider host={creator.user}>
            <PastStreamProvider host={creator.user}>
              <CreatorStreamsTab />
            </PastStreamProvider>
          </UpcomingStreamsProvider>
        </CreatorPage>
      </FollowerProvider>
    </CreatorPageLayout>
  );
}
