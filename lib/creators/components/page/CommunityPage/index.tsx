import { Box, Text } from "@/common/components/atoms";
import { theme } from "@/common/theme";
import { useCreatorsList } from "@/creators/context/CreatorsListContext";

import CreatorsList from "../../objects/CreatorsList";

export type ICommunityPageProps = {
  clubs?: string;
};

export default function CommunityPage(): JSX.Element {
  const { space } = theme;
  const {
    creators,
    loading: creatorsLoading,
    setCreatorsPage,
  } = useCreatorsList();

  function onCreatorScrollEnd(): void {
    setCreatorsPage((page) => page + 1);
  }

  return (
    <>
      <Box px={[space.xs, space.s]} py={space.xxs}>
        <Text textStyle="headlineBold">Crater Featured</Text>
      </Box>
      <CreatorsList
        loading={creatorsLoading}
        creators={creators}
        onScrollEnd={onCreatorScrollEnd}
      />
    </>
  );
}
