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
import { Button, IconButton } from "@/common/components/atoms/v2";
import {
  BaseTabBar,
  BaseTabItem,
} from "@/common/components/objects/BaseTabBar";
import ExpandingText from "@/common/components/objects/ExpandingText";
import HeadingDivider from "@/common/components/objects/HeadingDivider";
import HorizontalScroll from "@/common/components/objects/HorizontalScroll";
import { PageRoutes } from "@/common/constants/route.constants";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
import {
  Follower,
  PastStreamListItem,
  Webinar,
} from "@/community/types/community";

import AboutCreatorBottomSheet from "../AboutCreatorBottomSheet";
import RsvpPastStreamCard from "../RsvpPastStreamCard";

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
}: IProps): JSX.Element | null {
  const { space, colors, radii, breakpoints } = useTheme();
  const [activeTab, setActiveTab] = useState(initial);
  const router = useRouter();
  const { user } = useAuth();
  const [showAboutSheet, setShowAboutSheet] = useState(false);

  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  const { id, topic_detail, host_detail } = stream;

  const isFollower = followers?.length && followers[0].notify === true;

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
          <BaseTabItem label="About this stream" justifyItems="center" />
        </Link>
      ),
      more: (
        <Link href={PageRoutes.session(id, "more")} shallow>
          <BaseTabItem
            label={`More from ${host_detail.name.split(" ")[0]}`}
            justifyItems="center"
          />
        </Link>
      ),
    };
  }, [id, host_detail]);

  if (isMobile === undefined) return null;

  return (
    <Grid
      gridTemplateColumns={["1fr", "minmax(0, 1fr)"]}
      gridTemplateRows="min-content 1fr"
      bg={[colors.primaryBackground, colors.primaryLight]}
      borderRadius={radii.xxxxs}
    >
      <BaseTabBar
        py={14}
        bg={[colors.primaryBackground, colors.primaryDark]}
        tabs={TABS}
        activeTab={activeTab}
        selectedTabColor={colors.accentLight}
        gridAutoColumns={["1fr", "max-content"]}
      />

      <AboutCreatorBottomSheet
        stream={stream}
        visible={showAboutSheet}
        onClose={() => setShowAboutSheet(false)}
        followers={followers}
        followersLoading={followersLoading}
        onFollow={onFollow}
      />

      <Box p={space.xxs} bg={[colors.primaryBackground, colors.primaryLight]}>
        {activeTab === "about" && (
          <>
            {topic_detail.description && (
              <ExpandingText color={colors.textSecondary} maxLines={2}>
                {topic_detail.description}
              </ExpandingText>
            )}
            <HeadingDivider label="Speaker" />
            <Grid
              gridTemplateColumns={[
                "max-content max-content 1fr",
                "max-content 2fr 1fr",
              ]}
              gridGap={space.xxs}
              alignItems={["center", "start"]}
            >
              <Avatar image={host_detail.photo} size={40} />
              <Box>
                <Text textStyle="body" fontWeight="700">
                  {host_detail.name}
                </Text>
                <Box pt={space.xxxxxs} display={["none", "grid"]}>
                  <ExpandingText color={colors.textSecondary} maxLines={3}>
                    {host_detail.introduction}
                  </ExpandingText>
                </Box>
              </Box>
              <Flex justifySelf={["start", "end"]} gridGap={space.xxxxxs}>
                {user &&
                  user.pk !== host_detail.pk &&
                  (() => {
                    if (followersLoading || !followers) {
                      return (
                        <>
                          <Shimmer
                            justifySelf={["start", "end"]}
                            h={[30, 38]}
                            w={72}
                            borderRadius={4}
                          />
                        </>
                      );
                    }

                    return (
                      <>
                        <Button
                          variant={isMobile ? "text" : "flat"}
                          label={isFollower ? "Following" : "Follow"}
                          disabled={isFollower ? true : false}
                          onClick={() => onFollow()}
                        />
                      </>
                    );
                  })()}

                <IconButton
                  display={["flex", "none"]}
                  w={12}
                  h={30}
                  icon="ChevronDown"
                  iconProps={{
                    color: "accentLight",
                    size: 20,
                  }}
                  onClick={() => {
                    if (isMobile) {
                      setShowAboutSheet(true);
                    }
                  }}
                />
              </Flex>
            </Grid>
          </>
        )}

        {activeTab === "more" && (
          <>
            <Flex
              pb={space.xxxs}
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
                  boxProps={{ target: "_blank" }}
                >
                  <Flex flexDirection="row" alignItems="center" gridGap={2}>
                    <Text textStyle="body">View all</Text>
                    <Icon icon="ChevronRight" size={14} />
                  </Flex>
                </Link>
              )}
            </Flex>

            {isMobile ? (
              (() => {
                if (!pastStreams) {
                  return Array(4)
                    .fill("")
                    .map((_, index) => (
                      <Flex
                        key={index}
                        flexDirection="row"
                        gridGap={space.xxxs}
                        pb={space.xxxs}
                      >
                        <Shimmer w={112} h={62} />
                        <Shimmer h={24} w="50%" />
                      </Flex>
                    ));
                }

                return (
                  <Grid gridAutoFlow="row" gridGap={space.xxxs}>
                    {pastStreams.map((stream) => (
                      <>
                        <RsvpPastStreamCard stream={stream} key={stream.id} />
                      </>
                    ))}
                  </Grid>
                );
              })()
            ) : (
              <HorizontalScroll
                pb={0}
                maxWidth="100%"
                gridAutoFlow="column"
                gridAutoColumns="260px"
                gridGap={space.xs}
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
                          <RsvpPastStreamCard key={stream.id} stream={stream} />
                        </>
                      ))}
                    </>
                  );
                })()}
              </HorizontalScroll>
            )}
          </>
        )}
      </Box>
    </Grid>
  );
}
