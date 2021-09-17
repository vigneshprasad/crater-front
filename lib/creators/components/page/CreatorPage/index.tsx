import { PropsWithChildren } from "react";
import { useTheme } from "styled-components";

import Image from "next/image";

import {
  Avatar,
  Box,
  Grid,
  Icon,
  Text,
  Flex,
  TabBar,
  Link,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { useCreator } from "@/creators/context/CreatorContext";

type IProps = PropsWithChildren<{
  selectedTab: string;
}>;

export default function CreatorPage({
  children,
  selectedTab,
}: IProps): JSX.Element {
  const { creator } = useCreator();
  const { space, colors } = useTheme();

  if (!creator) return <Box>Loading...</Box>;

  return (
    <>
      {/* Cover Image */}
      <Box h={240} position="relative">
        {creator.cover_file && (
          <Image
            objectPosition="center"
            src={creator.cover_file}
            objectFit="cover"
            layout="fill"
            alt={creator.name}
          />
        )}
      </Box>

      <Box position="sticky" top={0} zIndex={10}>
        <Grid
          bg={colors.black[4]}
          alignItems="center"
          p={space.s}
          gridTemplateColumns="min-content 1fr min-content"
          gridGap={space.xxs}
        >
          <Box borderRadius="50%" p={6} border={`2px solid ${colors.accent}`}>
            <Avatar image={creator.photo} alt={creator.name} />
          </Box>
          <Box>
            <Flex alignItems="center">
              <Text mr={space.xxs} textStyle="headline6">
                Vivan Puri
              </Text>
              {creator.certified && (
                <Icon color={colors.accent} size={18} icon="CheckCircle" />
              )}
            </Flex>

            <Text color={colors.slate}>{`${
              creator.follower_count
                ? creator.follower_count.toLocaleString()
                : 0
            } Followers`}</Text>
          </Box>
          <Button text="Follow" />
        </Grid>

        <TabBar
          selected={selectedTab}
          tabBarProps={{ bg: colors.black[4], py: space.xxs }}
          tabs={["about", "club", "rewards", "token"]}
          renderTab={(tab: string) => (
            <Link href={`/creator/${creator.id}/${tab.toLowerCase()}`} shallow>
              <Text textTransform="capitalize" textStyle="title">
                {tab}
              </Text>
            </Link>
          )}
        />
      </Box>

      {children}
    </>
  );
}
