import Image from "next/image";

import { Box, Text } from "@/common/components/atoms";
import { theme } from "@/common/theme";
import { useCreatorsList } from "@/creators/context/CreatorsListContext";
import { useMembersList } from "@/creators/context/MembersListContext";

import CreatorsList from "../../objects/CreatorsList";
import { MembersList } from "../../objects/MembersList";

export type ICommunityPageProps = {
  clubs?: string;
};

export default function CommunityPage(): JSX.Element {
  const { space } = theme;
  const { creators } = useCreatorsList();
  const { members } = useMembersList();

  if (!creators || !members) return <Box>Loading...</Box>;

  return (
    <>
      <CreatorsList creators={creators} />
      <Box position="relative" h="172px">
        <Image
          objectFit="cover"
          layout="fill"
          src="/images/img_banner.png"
          alt="Banner image"
        />
      </Box>
      <Box px={[space.s]} pt={[space.m]} pb={[space.s]}>
        <Text textStyle="headline5">Member Only</Text>
      </Box>
      <MembersList members={creators} />
    </>
  );
}
