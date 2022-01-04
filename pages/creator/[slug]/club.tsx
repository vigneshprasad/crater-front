import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import dynamic from "next/dynamic";

import useAuth from "@/auth/context/AuthContext";
import CreatorPageLayout from "@/creators/components/layouts/CreatorPageLayout";
import CreatorPage, {
  CreatorPageParams,
  CreatorPageProps,
  getCreatorStaticPaths,
  getCreatorStaticProps,
} from "@/creators/components/page/CreatorPage";
import { CreatorCommunityProvider } from "@/creators/context/CreatorCommunityContext";
import { CreatorStreamProvider } from "@/creators/context/CreatorStreamsContext";
import { FollowerProvider } from "@/creators/context/FollowerContext";

const CreatorClubTab = dynamic(
  () => import("@/creators/components/objects/CreatorClubTab")
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
        <CreatorPage selectedTab="club">
          <CreatorStreamProvider creatorId={creator.user}>
            <CreatorCommunityProvider
              communityId={creator.default_community.id}
            >
              <CreatorClubTab />
            </CreatorCommunityProvider>
          </CreatorStreamProvider>
        </CreatorPage>
      </FollowerProvider>
    </CreatorPageLayout>
  );
}
