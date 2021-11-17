import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import dynamic from "next/dynamic";

import CreatorPageLayout from "@/creators/components/layouts/CreatorPageLayout";
import CreatorPage, {
  CreatorPageParams,
  CreatorPageProps,
  getCreatorStaticPaths,
  getCreatorStaticProps,
} from "@/creators/components/page/CreatorPage";

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
  return (
    <CreatorPageLayout creator={creator} slug={slug}>
      <CreatorPage selectedTab="about">
        <AboutTab />
      </CreatorPage>
    </CreatorPageLayout>
  );
}
