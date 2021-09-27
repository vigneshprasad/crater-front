import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import CreatorPageLayout from "@/creators/components/layouts/CreatorPageLayout";
import AboutTab from "@/creators/components/objects/AboutTab";
import CreatorPage, {
  CreatorPageParams,
  CreatorPageProps,
  getCreatorStaticPaths,
  getCreatorStaticProps,
} from "@/creators/components/page/CreatorPage";

export const getStaticPaths: GetStaticPaths<CreatorPageParams> =
  getCreatorStaticPaths;

export const getStaticProps: GetStaticProps<
  CreatorPageProps,
  CreatorPageParams
> = getCreatorStaticProps;

type IProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function CreatorAbout({ id, creator }: IProps): JSX.Element {
  return (
    <CreatorPageLayout creator={creator} id={id}>
      <CreatorPage selectedTab="about">
        <AboutTab />
      </CreatorPage>
    </CreatorPageLayout>
  );
}
