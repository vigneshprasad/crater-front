import { NextSeoProps } from "next-seo";
import { memo, useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import { Box, Grid, Flex, Text } from "@/common/components/atoms";
import Page from "@/common/components/objects/Page";
import { theme } from "@/common/theme";
import { useCreator } from "@/creators/hooks/useCreator";

import CreatorPageLayout from "../../layouts/CreatorPageLayout";
import AboutTab from "../../objects/AboutTab";
import CommunityTab from "../../objects/CommunityTab";
import CreatorTabBar from "../../objects/CreatorTabBar";

const { space, colors } = theme;

function CreatorPage(): JSX.Element | null {
  const router = useRouter();
  const [creatorId, setCreatorId] = useState<number>();
  const [activeTab, setActiveTab] = useState<string>("about");

  useEffect(() => {
    const id = router.query?.args?.[0];
    const tab = router.query?.args?.[1];
    if (id) {
      setCreatorId(parseInt(id, 10));
    }

    if (tab) {
      setActiveTab(tab);
    }
  }, [router]);

  const { creator } = useCreator({ id: creatorId });

  if (!creator) return null;
  const { photo, name, follower_count: followerCount } = creator;
  const seo: NextSeoProps = {
    title: creator.name,
    description: creator.about,
  };

  return (
    <Page seo={seo}>
      <CreatorPageLayout>
        <Box position="relative" h={[140]}>
          <Image
            src="/images/img_cover_example.jpg"
            layout="fill"
            objectFit="cover"
            alt="cover_image"
          />
        </Box>
        <Grid
          bg={colors.black[2]}
          gridGap={[space.xs]}
          gridTemplateColumns="128px 1fr "
          px={space.l}
          py={space.s}
        >
          <Box
            position="relative"
            h={[128]}
            w={[128]}
            overflow="hidden"
            borderRadius="50%"
          >
            {photo && <Image src={photo} layout="fill" alt={name} />}
          </Box>
          <Flex flexDirection="column" justifyContent="center">
            <Text textStyle="headline3">{name}</Text>
            <Text
              color={colors.lightGrey}
              textStyle="headline6"
            >{`${followerCount} Followers`}</Text>
          </Flex>
        </Grid>
        <CreatorTabBar
          tabs={["about", "club", "rewards", "tokens"]}
          selected={activeTab}
        />
        {activeTab === "about" && <AboutTab creator={creator} />}
        {activeTab === "club" && <CommunityTab creator={creator} />}
      </CreatorPageLayout>
    </Page>
  );
}

export default memo(CreatorPage);
