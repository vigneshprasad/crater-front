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
import { FollowerProvider } from "@/creators/context/FollowerContext";

const AboutTab = dynamic(
  () => import("@/creators/components/objects/AboutTab")
);

export const getStaticPaths: GetStaticPaths<CreatorPageParams> =
  getCreatorStaticPaths;

export const getStaticProps: GetStaticProps<
  CreatorPageProps,
  CreatorPageParams
> = getCreatorStaticProps;

type IProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function CreatorAbout({ slug, creator }: IProps): JSX.Element {
  const { user } = useAuth();

  return (
    <CreatorPageLayout creator={creator} slug={slug}>
      <FollowerProvider creator={creator.id} user={user?.pk}>
        <CreatorPage selectedTab="about">
          <AboutTab />
        </CreatorPage>
      </FollowerProvider>
    </CreatorPageLayout>
  );
}
