import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { PropsWithChildren, useState } from "react";
import { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import {
  Avatar,
  Box,
  Grid,
  Icon,
  Text,
  Flex,
  TabBar,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import Spinner from "@/common/components/atoms/Spiner";
import CreatorApiClient from "@/creators/api";
import { useCreator } from "@/creators/context/CreatorContext";
import { Creator } from "@/creators/types/creator";

export interface CreatorPageProps {
  slug: string;
  creator: Creator;
}

export interface CreatorPageParams extends ParsedUrlQuery {
  slug: string;
}

export const getCreatorStaticPaths: GetStaticPaths<CreatorPageParams> =
  async () => {
    const [pageData] = await CreatorApiClient().getCreatorsList(true, 1, 20);

    if (!pageData) return { paths: [], fallback: "blocking" };

    const paths = pageData.results.map(({ slug }) => ({
      params: { slug },
    }));

    return { paths, fallback: "blocking" };
  };

export const getCreatorStaticProps: GetStaticProps<
  CreatorPageProps,
  CreatorPageParams
> = async ({ params }) => {
  const { slug } = params as CreatorPageParams;
  const [creator] = await CreatorApiClient().getCreatorBySlug(slug);

  if (!creator) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      slug,
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
  const { user } = useAuth();
  const { creator, mutateCreator } = useCreator();
  const { space, colors, zIndices } = useTheme();
  const [postLoading, setPostLoading] = useState(false);

  const joinCommunity = async (): Promise<void> => {
    if (creator) {
      setPostLoading(true);
      const [res, err] = await CreatorApiClient().postFollowCreator(creator.id);

      setPostLoading(false);

      if (err) {
        return;
      }

      console.log(res);
      mutateCreator();
    }
  };

  if (!creator) return <Box>Loading...</Box>;

  return (
    <Box bg={colors.accent} minHeight="calc(100vh - 56px)">
      {/* Cover Image */}
      <Box
        h="45vh"
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundImage={`url(${creator.profile_detail.cover_file})`}
      />

      <Box
        mr={[0, space.m]}
        bg={colors.black[5]}
        mt={-space.l}
        minHeight="70vh"
      >
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
          {(() => {
            if (!user) return null;

            if (!creator.is_follower) {
              return (
                <Button
                  disabled={postLoading}
                  text="Join Club"
                  onClick={joinCommunity}
                  suffixElement={postLoading ? <Spinner /> : undefined}
                />
              );
            }

            return null;
          })()}
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
          tabs={["club", "streams", "about", "rewards", "token"]}
          baseUrl={`/creator/${creator.slug}`}
        />
        {children}
      </Box>
    </Box>
  );
}
