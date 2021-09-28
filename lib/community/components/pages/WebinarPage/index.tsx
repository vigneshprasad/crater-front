import { useEffect } from "react";
import { useTheme } from "styled-components";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
import {
  Avatar,
  Box,
  Grid,
  Icon,
  Link,
  Shimmer,
  Text,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import BaseLayout from "@/common/components/layouts/BaseLayout";
import AsideNav from "@/common/components/objects/AsideNav";
import ExpandingText from "@/common/components/objects/ExpandingText";
import { PageRoutes } from "@/common/constants/route.constants";
import useNetworkList from "@/community/context/NetworkListContext";
import { useUpcomingStreams } from "@/community/context/UpcomingStreamsContext";
import { useWebinar } from "@/community/context/WebinarContext";
import useWebinarSocket from "@/community/hooks/useWebinarSocket";
import useDyteWebinar from "@/dyte/context/DyteWebinarContext";

import { Props as DyteMeetingProps } from "../../objects/DyteMeeting";
import NetworkList from "../../objects/NetworkList";
import UpcomingStreamsList from "../../objects/UpcomingStreamsList";

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
          borderRadius={8}
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
  const { space, colors, radii } = useTheme();
  const { webinar, loading } = useWebinar();
  const { upcoming, loading: upcomingLoading } = useUpcomingStreams();
  const { dyteParticipant, error } = useDyteWebinar();
  const { user } = useAuth();
  const { followerCount } = useWebinarSocket(id);
  const router = useRouter();
  const { members, loading: membersLoading } = useNetworkList();

  // Handle Dyte participant request error
  useEffect(() => {
    if (error) {
      router.replace(`/session/${id}`);
    }
  }, [error, router, id]);

  if (loading || !webinar) return <Box>Loading...</Box>;

  return (
    <BaseLayout overflowY="auto" aside={<AsideNav />}>
      <Box px={[0, space.s]} py={[0, space.xxs]} />

      <Grid
        gridTemplateColumns={["1fr", "2fr 1fr"]}
        gridTemplateRows={["min-content", "auto"]}
      >
        {/* Left Column */}
        <Box px={[space.xxs, space.s]}>
          <Box
            position="relative"
            w="100%"
            h={["80vh", "auto"]}
            pt={[0, "56.25%"]}
          >
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
                borderRadius={[0, radii.s]}
                overflow="hidden"
              />
            )}
          </Box>
          <Grid py={[space.xxs, space.s]} gridGap={space.xs}>
            <Grid
              gridTemplateColumns={["1fr", "1fr 280px"]}
              gridTemplateRows="min-content"
              gridGap={space.xs}
              alignItems="center"
            >
              <Grid gridTemplateColumns="max-content 1fr" gridGap={space.xs}>
                <Avatar
                  size={56}
                  image={webinar.host_detail?.photo}
                  alt="host photo"
                />
                <Box>
                  <Text mb={4} textStyle="title">
                    {webinar.host_detail?.name}
                  </Text>
                  <ExpandingText
                    textStyle="caption"
                    maxLines={1}
                    color={colors.white[1]}
                  >
                    {webinar.host_detail?.introduction}
                  </ExpandingText>
                </Box>
              </Grid>

              <Grid
                justifyContent={["start", "end"]}
                gridAutoFlow="column"
                gridAutoColumns="min-content"
              >
                <Link
                  href={`https://worknetwork.typeform.com/to/TmRSVFoi#session=${webinar.id}&phonenumber=${user?.phone_number}`}
                  boxProps={{ target: "_blank" }}
                >
                  <Button mr={space.xxs} variant="nav-button" text="AMA" />
                </Link>

                <Button
                  border={`2px solid ${colors.slate}`}
                  bg="transparent"
                  prefixElement={<Icon size={16} icon="Linktree" />}
                  variant="nav-button"
                  text="LinkTree"
                />
              </Grid>
            </Grid>

            <Grid
              gridTemplateColumns={["1fr", "1fr 280px"]}
              gridGap={space.xs}
              placeItems="start"
              gridTemplateRows="min-content"
            >
              <Grid gridRow={[0, 1]}>
                <Text mb={space.xs} textStyle="headline5">
                  {webinar.topic_detail?.name}
                </Text>
                {webinar.topic_detail?.description && (
                  <Text>{webinar.topic_detail.description}</Text>
                )}
              </Grid>

              <Grid gridRow={[1, 0]}>
                <Grid
                  visibility={followerCount ? "visible" : "hidden"}
                  gridTemplateColumns="max-content 1fr"
                  borderRadius={radii.xxs}
                  alignItems="center"
                  py={space.xxxs}
                >
                  <Icon
                    color={colors.accent}
                    size={20}
                    mr={space.xxxs}
                    icon="Eye"
                  />
                  {followerCount && (
                    <Text textStyle="title">{`${followerCount} Viewers`}</Text>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Box px={[space.xxs, space.s]}>
          <UpcomingStreamsList upcoming={upcoming} loading={upcomingLoading} />
          <NetworkList
            webinar={webinar}
            members={members}
            loading={membersLoading}
          />
          <Link href={PageRoutes.community} boxProps={{ target: "_blank" }}>
            <Button variant="full-width" text="Network with Members" />
          </Link>
        </Box>
      </Grid>
      <Box h={[space.s, space.xxl]} />
    </BaseLayout>
  );
}
