import { signOut } from "next-auth/client";

import Image from "next/image";

import { Box, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { TabBar } from "@/common/components/objects/TabBar";
import { theme } from "@/common/theme";

import ClubTabLayout from "../../layouts/ClubTabLayout";
import CreatorsList from "../CreatorsList";
import { MembersList } from "../MembersList";

export type IClubTabProps = {
  clubs?: string;
};

export const ClubTab: React.FC<IClubTabProps> = () => {
  const items = ["All", "Owned"];
  const { space, colors } = theme;

  return (
    <ClubTabLayout heading="Clubs">
      <Box px={[space.s]} py={[space.xs]}>
        <TabBar
          items={items}
          renderItem={(item) => (
            <Box
              cursor="pointer"
              borderRadius={[18]}
              marginRight={[space.xxs]}
              bg={colors.accent}
              key={item}
              minWidth={[84]}
              py={[space.xxxs]}
              px={[space.xxs]}
            >
              <Text textStyle="menu" textAlign="center">
                {item}
              </Text>
            </Box>
          )}
        />
      </Box>
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
    </ClubTabLayout>
  );
};
