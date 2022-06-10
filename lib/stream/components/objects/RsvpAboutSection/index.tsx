import { useEffect, useMemo, useState } from "react";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
import {
  Avatar,
  Box,
  Flex,
  Grid,
  Icon,
  Link,
  Shimmer,
  Text,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import {
  BaseTabBar,
  BaseTabItem,
} from "@/common/components/objects/BaseTabBar";
import ExpandingText from "@/common/components/objects/ExpandingText";
import HeadingDivider from "@/common/components/objects/HeadingDivider";
import HorizontalScroll from "@/common/components/objects/HorizontalScroll";
import { PageRoutes } from "@/common/constants/route.constants";
import {
  Follower,
  PastStreamListItem,
  Webinar,
} from "@/community/types/community";

import PastStreamCard from "../PastStreamCard/v2";

type TabKeys = "about" | "more";

interface IProps {
  stream: Webinar;
  followers?: Follower[];
  pastStreams?: PastStreamListItem[];
  followersLoading: boolean;
  onFollow: () => void;
  initial?: TabKeys;
}

export default function RsvpAboutSection({
  stream,
  followers,
  pastStreams,
  followersLoading,
  initial,
  onFollow,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();
  const [activeTab, setActiveTab] = useState(initial);
  const router = useRouter();
  const { user } = useAuth();

  const { id, topic_detail, host_detail } = stream;

  useEffect(() => {
    if (router) {
      const { query } = router;

      const tab = query.tab;
      if (tab) {
        setActiveTab(tab as TabKeys);
      }
    }
  }, [router, setActiveTab]);

  const TABS = useMemo<Record<TabKeys, JSX.Element>>(() => {
    return {
      about: (
        <Link href={PageRoutes.session(id, "about")} shallow>
          <BaseTabItem label="About Stream" />
        </Link>
      ),
      more: (
        <Link href={PageRoutes.session(id, "more")} shallow>
          <BaseTabItem label={`More from ${host_detail.name.split(" ")[0]}`} />
        </Link>
      ),
    };
  }, [id, host_detail]);

  return (
    <Grid
      gridTemplateColumns="minmax(0, 1fr)"
      gridTemplateRows="min-content 1fr"
      bg={colors.primaryLight}
      borderRadius={radii.xxxxs}
    >
      <BaseTabBar
        py={14}
        bg={colors.primaryDark}
        tabs={TABS}
        activeTab={activeTab}
        selectedTabColor={colors.accentLight}
      />

      <Box p={space.xxs} bg={colors.primaryLight}>
        {activeTab === "about" && (
          <>
            {topic_detail.description && (
              <ExpandingText
                display={["none", "block"]}
                color={colors.textSecondary}
                maxLines={2}
              >
                {topic_detail.description}
              </ExpandingText>
            )}
            <HeadingDivider label="Speaker" />
            <Grid
              gridTemplateColumns="max-content 2fr 1fr"
              gridGap={space.xxs}
              alignItems="start"
            >
              <Avatar image={host_detail.photo} size={40} />
              <Box>
                <Text textStyle="body" fontWeight="700">
                  {host_detail.name}
                </Text>
                <ExpandingText
                  display={["none", "block"]}
                  color={colors.textSecondary}
                  maxLines={3}
                >
                  {host_detail.introduction}
                </ExpandingText>
              </Box>
              {user && user.pk !== host_detail.pk && (
                <Flex gridGap={space.xxxs} justifyContent="flex-end">
                  {(() => {
                    if (followersLoading || !followers) {
                      return (
                        <>
                          <Shimmer h={39} w={72} borderRadius={4} />
                        </>
                      );
                    }

                    return (
                      <>
                        <Button
                          disabled={followers.length ? true : false}
                          label={followers.length ? "Following" : "Follow"}
                          onClick={() => onFollow()}
                        />
                      </>
                    );
                  })()}
                </Flex>
              )}
            </Grid>
          </>
        )}

        {activeTab === "more" && (
          <>
            <Flex
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text textStyle="body" color="#C4C4C4">
                Past streams by {host_detail.name.split(" ")[0]}
              </Text>
              {host_detail.creator_detail?.slug && (
                <Link
                  href={PageRoutes.creatorProfile(
                    host_detail.creator_detail.slug
                  )}
                >
                  <Flex flexDirection="row" alignItems="center" gridGap={2}>
                    <Text textStyle="body">View all</Text>
                    <Icon icon="ChevronRight" size={14} />
                  </Flex>
                </Link>
              )}
            </Flex>

            <HorizontalScroll
              maxWidth="100%"
              gridAutoFlow="column"
              gridAutoColumns="max-content"
              gridGap={space.xxs}
              actionContainerProps={{
                w: 30,
                background: colors.primaryDark,
                opacity: 0.72,
                borderRadius: "0 4px 4px 0",
              }}
            >
              {(() => {
                if (!pastStreams) {
                  return Array(4)
                    .fill("")
                    .map((_, index) => (
                      <Flex
                        key={index}
                        flexDirection="column"
                        gridGap={space.xs}
                      >
                        <Shimmer h={172} />
                        <Shimmer h={18} w="60%" />
                      </Flex>
                    ));
                }

                return (
                  <>
                    {pastStreams.map((stream) => (
                      <>
                        <PastStreamCard key={stream.id} stream={stream} />
                        <PastStreamCard key={stream.id} stream={stream} />
                        <PastStreamCard key={stream.id} stream={stream} />
                        <PastStreamCard key={stream.id} stream={stream} />
                        <PastStreamCard key={stream.id} stream={stream} />
                        <PastStreamCard key={stream.id} stream={stream} />
                        <PastStreamCard key={stream.id} stream={stream} />
                        <PastStreamCard key={stream.id} stream={stream} />
                      </>
                    ))}
                  </>
                );
              })()}
            </HorizontalScroll>
          </>
        )}
      </Box>
    </Grid>
  );
}
