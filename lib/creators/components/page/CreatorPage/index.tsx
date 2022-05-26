import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { PropsWithChildren, useState } from "react";
import { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import useAuthModal from "@/auth/context/AuthModalContext";
import {
  Avatar,
  Box,
  Grid,
  Icon,
  Text,
  Flex,
  TabBar,
  Spinner,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import CreatorApiClient from "@/creators/api";
import { useCreator } from "@/creators/context/CreatorContext";
import { useFollower } from "@/creators/context/FollowerContext";
import { Creator } from "@/creators/types/creator";

export interface CreatorPageProps {
  slug: string;
  creator: Creator;
}

export interface CreatorPageParams extends ParsedUrlQuery {
  slug: string;
}

export const getCreatorStaticPaths: GetStaticPaths<
  CreatorPageParams
> = async () => {
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
      revalidate: 10,
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
  const { subscribeCreator } = useFollower();
  const [loading, setLoading] = useState(false);
  const { openModal } = useAuthModal();

  const followCreator = async (): Promise<void> => {
    if (creator) {
      await subscribeCreator(creator.id);
      await mutateCreator();
      setLoading(false);
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
          </Box>
          <Grid gridAutoFlow="column" gridGap={space.xxs}>
            {(() => {
              // If the logged in user is the host, do not show `Follow` button
              if (creator.user === user?.pk) return null;

              if (creator.is_subscriber) {
                return (
                  <Button
                    text="Following"
                    bg={colors.black[5]}
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    disabled={true}
                  />
                );
              }

              return (
                <Button
                  text="Follow"
                  onClick={() => {
                    if (user) {
                      setLoading(true);
                      followCreator();
                    } else {
                      openModal();
                    }
                  }}
                  suffixElement={
                    loading ? (
                      <Spinner
                        size={24}
                        strokeWidth={2}
                        strokeColor={colors.white[0]}
                      />
                    ) : undefined
                  }
                  disabled={loading}
                />
              );
            })()}
          </Grid>
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
          tabs={["streams", "about"]}
          baseUrl={`/creator/${creator.slug}`}
        />
        {children}
      </Box>
    </Box>
  );
}
