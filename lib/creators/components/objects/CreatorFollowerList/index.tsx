import { useRef, useCallback } from "react";
import { useTheme } from "styled-components";
import { useSWRInfinite } from "swr";

import { Box, Text, Grid, Avatar, Flex } from "@/common/components/atoms";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
import fetcher from "@/common/utils/fetcher";
import { Follower } from "@/community/types/community";
import { Creator } from "@/creators/types/creator";

interface IProps {
  creator: Creator;
}

export default function CreatorFollowerList({ creator }: IProps): JSX.Element {
  const observer = useRef<IntersectionObserver>();
  const { data, setSize } = useSWRInfinite<Follower[]>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.length) return null;
      return `${API_URL_CONSTANTS.follower.getFollowersList}?creator=${creator.id}&page=${page}`;
    },
    async (key: string) => {
      return (await fetcher<PageResponse<Follower>>(key)).results;
    }
  );

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (!data) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setSize((page) => page + 1);
        }
      });

      if (node != null) observer.current.observe(node);
    },
    [observer, data, setSize]
  );

  const { space, colors } = useTheme();

  return (
    <>
      <Text
        mt={space.xxs}
        textStyle="title"
      >{`${creator.profile_detail.name}'s Club:`}</Text>

      <Grid
        mt={space.xxs}
        gridGap={space.xxs}
        gridTemplateColumns="repeat(auto-fill, minmax(96px, 1fr))"
        overflowY="auto"
      >
        {(() => {
          if (!data) {
            return <Box>Loading</Box>;
          }

          const followers = data.flat();

          return followers.map((follower, index) => (
            <Flex
              ref={index + 1 === followers.length ? ref : undefined}
              gridGap={space.xxs}
              key={follower.id}
              flexDirection="column"
              justifyContent="start"
              alignItems="center"
            >
              <Avatar size={48} image={follower.profile_detail.photo} />
              <Flex flexDirection="column">
                <Text textAlign="center">{follower.profile_detail.name}</Text>
                <Text
                  textAlign="center"
                  textStyle="caption"
                  color={colors.slate}
                >
                  {follower.profile_detail.tag_list[0]?.name}
                </Text>
              </Flex>
            </Flex>
          ));
        })()}
      </Grid>
    </>
  );
}
