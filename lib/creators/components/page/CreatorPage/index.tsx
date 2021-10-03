import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { PropsWithChildren } from "react";
import { useTheme } from "styled-components";

import {
  Avatar,
  Box,
  Grid,
  Icon,
  Text,
  Flex,
  TabBar,
} from "@/common/components/atoms";
import CreatorApiClient from "@/creators/api";
import { useCreator } from "@/creators/context/CreatorContext";
import { Creator } from "@/creators/types/creator";

export interface CreatorPageProps {
  id: string;
  creator: Creator;
}

export interface CreatorPageParams extends ParsedUrlQuery {
  id: string;
}

export const getCreatorStaticPaths: GetStaticPaths<CreatorPageParams> =
  async () => {
    const [pageData] = await CreatorApiClient().getCreatorsList(true, 1, 20);

    if (!pageData) return { paths: [], fallback: "blocking" };

    const paths = pageData.results.map(({ id }) => ({
      params: { id: id.toString() },
    }));

    return { paths, fallback: "blocking" };
  };

export const getCreatorStaticProps: GetStaticProps<
  CreatorPageProps,
  CreatorPageParams
> = async ({ params }) => {
  const { id } = params as CreatorPageParams;
  const [creator] = await CreatorApiClient().getCreator(id);

  if (!creator) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id,
      creator,
    },
    revalidate: 10,
  };
};

type IProps = PropsWithChildren<{
  selectedTab: string;
}>;

export default function CreatorPage({
  children,
  selectedTab,
}: IProps): JSX.Element {
  const { creator } = useCreator();
  const { space, colors, zIndices } = useTheme();

  if (!creator) return <Box>Loading...</Box>;

  return (
    <>
      {/* Cover Image */}
      <Box
        w="100%"
        pt={["40%", 0]}
        h={["auto", "100%"]}
        maxHeight={240}
        backgroundPosition="bottom fixed"
        backgroundSize="cover"
        backgroundImage={`url(${creator.profile_detail.cover_file})`}
      />

      <Grid
        bg={colors.black[4]}
        alignItems="center"
        px={[space.xxs, space.s]}
        py={space.xxs}
        gridTemplateColumns="min-content 1fr max-content"
        gridGap={space.xxs}
        zIndex={zIndices.navHeader}
      >
        <Box borderRadius="50%" p={6} border={`2px solid ${colors.accent}`}>
          <Avatar
            size={[48, 72]}
            image={creator.profile_detail?.photo}
            alt={creator.profile_detail?.name}
          />
        </Box>
        <Box>
          <Flex alignItems="center">
            <Text mr={space.xxs} textStyle="headline6">
              {creator.profile_detail?.name}
            </Text>
            {creator.certified && (
              <Icon color={colors.accent} size={18} icon="CheckCircle" />
            )}
          </Flex>

          <Text color={colors.slate}>{`${
            creator.number_of_subscribers
              ? creator.number_of_subscribers.toLocaleString()
              : 0
          } Followers`}</Text>
        </Box>
        {/* <Button text="Join Club" /> */}
      </Grid>

      <TabBar
        selected={selectedTab}
        tabBarProps={{
          bg: colors.black[4],
          py: space.xxs,
          position: "sticky",
          top: 0,
          zIndex: zIndices.navHeader,
        }}
        tabs={["about", "club", "rewards", "token"]}
        baseUrl={`/creator/${creator.id}`}
      />

      {children}
    </>
  );
}
