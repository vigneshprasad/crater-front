import { useEffect, useMemo } from "react";
import { useTheme } from "styled-components";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import {
  Avatar,
  Box,
  Grid,
  Icon,
  Link,
  Shimmer,
  Text,
  Flex,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import BaseLayout from "@/common/components/layouts/BaseLayout";
import AsideNav from "@/common/components/objects/AsideNav";
import { PageRoutes } from "@/common/constants/route.constants";
import { useWebinar } from "@/community/context/WebinarContext";
import useDyteWebinar from "@/dyte/context/DyteWebinarContext";
import StreamChat from "@/stream/components/objects/StreamChat";

import { Props as DyteMeetingProps } from "../../objects/DyteMeeting";

const DyteMeeting = dynamic<DyteMeetingProps>(
  () => import("../../objects/DyteMeeting"),
  {
    ssr: false,
    loading: () => {
      return (
        <Shimmer
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          overflow="hidden"
        />
      );
    },
  }
);

interface IProps {
  id: string;
  orgId: string;
}

export default function WebinarPage({ orgId, id }: IProps): JSX.Element {
  const { space, colors, borders } = useTheme();
  const { webinar, loading } = useWebinar();
  // const { upcoming, loading: upcomingLoading } = useUpcomingStreams();
  const { dyteParticipant, error } = useDyteWebinar();
  const router = useRouter();

  // Handle Dyte participant request error
  useEffect(() => {
    if (error) {
      router.replace(`/session/${id}`);
    }
  }, [error, router, id]);

  const gridLayout = useMemo(() => {
    if (!webinar) return ["1fr", "3fr 1fr"];

    if (webinar.closed) return ["1fr", "1fr"];
    return ["1fr", "3fr 1fr"];
  }, [webinar]);

  if (loading || !webinar) return <Box>Loading...</Box>;

  return (
    <BaseLayout aside={<AsideNav />} overflowY={["auto", "clip"]}>
      <Grid gridTemplateColumns={gridLayout} h="100%">
        <Grid
          pb={space.s}
          gridAutoFlow="row"
          gridAutoRows="min-content"
          gridGap={space.xxs}
          overflowY={["clip", "auto"]}
        >
          {/* Dyte Webinar View */}
          <Box position="relative" w="100%" pb="56.25%">
            {dyteParticipant && (
              <DyteMeeting
                groupId={webinar.id}
                orgId={orgId}
                token={dyteParticipant.auth_token}
                roomName={dyteParticipant.dyte_meeting_detail.room_name}
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                overflow="hidden"
                borderBottom={`2px solid ${borders.main}`}
              />
            )}
          </Box>

          <Box px={[space.xxs, space.xs]} mb={[space.xxs, 0]}>
            <Flex
              justifyContent="space-between"
              flexDirection={["column", "row"]}
            >
              <Text textStyle="headline5">{webinar.topic_detail?.name}</Text>
              <Flex>
                {/* <Link
                  href={`https://worknetwork.typeform.com/to/TmRSVFoi#session=${webinar.id}&phonenumber=${user?.phone_number}`}
                  boxProps={{ target: "_blank" }}
                >
                  <Button mr={space.xxs} variant="nav-button" text="AMA" />
                </Link> */}

                {webinar.host_profile_details?.primary_url && (
                  <Link
                    href={webinar.host_profile_details?.primary_url}
                    boxProps={{ target: "_blank" }}
                  >
                    <Button
                      border={`2px solid ${colors.slate}`}
                      bg="transparent"
                      prefixElement={<Icon size={16} icon="Linktree" />}
                      variant="nav-button"
                      text="LinkTree"
                    />
                  </Link>
                )}
              </Flex>
            </Flex>

            {webinar.topic_detail?.description && (
              <Text display={["none", "block"]} mt={space.xxs}>
                {webinar.topic_detail.description}
              </Text>
            )}
          </Box>

          <Box px={space.xs} display={["none", "block"]}>
            <Text textStyle="title">Speakers:</Text>
            <Flex py={space.xxs} gridGap={space.xs}>
              {webinar.speakers_detail_list.map((speaker) => {
                const content = (
                  <Grid
                    gridTemplateColumns="max-content 1fr"
                    alignItems="center"
                    gridGap={space.xxxs}
                  >
                    <Avatar size={44} image={speaker?.photo} alt="host photo" />
                    <Box>
                      <Text fontWeight="700">{speaker.name}</Text>
                      <Text textStyle="caption" color={colors.slate}>
                        {
                          speaker.creator_detail?.profile_detail.tag_list?.[0]
                            ?.name
                        }
                      </Text>
                    </Box>
                  </Grid>
                );
                if (speaker.creator_detail) {
                  return (
                    <Link
                      boxProps={{ target: "_blank" }}
                      key={speaker.pk}
                      href={PageRoutes.creatorProfile(
                        speaker.creator_detail?.slug
                      )}
                    >
                      {content}
                    </Link>
                  );
                }
                return content;
              })}
            </Flex>
          </Box>
        </Grid>

        {/* Chat Panel */}
        {!webinar.closed && <StreamChat stream={webinar} />}
      </Grid>
    </BaseLayout>
  );
}
