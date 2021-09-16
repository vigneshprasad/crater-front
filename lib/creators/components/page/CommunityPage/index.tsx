import { signOut } from "next-auth/client";

import Image from "next/image";

import { Box, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { theme } from "@/common/theme";

import CreatorsList from "../../objects/CreatorsList";
import { MembersList } from "../../objects/MembersList";

export type ICommunityPageProps = {
  clubs?: string;
};

export default function CommunityPage(): JSX.Element {
  const { space } = theme;

  return (
    <>
      <CreatorsList />
      <Box position="relative" h="172px">
        <Image
          objectFit="cover"
          layout="fill"
          src="/images/img_banner.png"
          alt="Banner image"
        />
      </Box>
      <Box px={[space.s]} pt={[space.xl]} pb={[space.m]}>
        <Text textStyle="headline5">Member Only</Text>
      </Box>
      <MembersList />
      <Button text="Signout" onClick={() => signOut()} />
    </>
  );
}
