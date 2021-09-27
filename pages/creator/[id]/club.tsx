import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import { NetworkListProvider } from "@/community/context/NetworkListContext";
import CreatorPageLayout from "@/creators/components/layouts/CreatorPageLayout";
import CreatorStreamsTab from "@/creators/components/objects/CreatorStreamsTab";
import CreatorPage, {
  CreatorPageParams,
  CreatorPageProps,
  getCreatorStaticPaths,
  getCreatorStaticProps,
} from "@/creators/components/page/CreatorPage";
import { CreatorStreamProvider } from "@/creators/context/CreatorStreamsContext";

export const getStaticPaths: GetStaticPaths<CreatorPageParams> =
  getCreatorStaticPaths;

export const getStaticProps: GetStaticProps<
  CreatorPageProps,
  CreatorPageParams
> = getCreatorStaticProps;

type IProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function CreatorStreams({ creator, id }: IProps): JSX.Element {
  return (
    <CreatorPageLayout creator={creator} id={id}>
      <CreatorPage selectedTab="club">
        <CreatorStreamProvider creatorId={creator.user}>
          <NetworkListProvider>
            <CreatorStreamsTab />
          </NetworkListProvider>
        </CreatorStreamProvider>
      </CreatorPage>
    </CreatorPageLayout>
  );
}
