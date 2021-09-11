import moment from "moment";
import { useCallback } from "react";
import { useTheme } from "styled-components";

import Image from "next/image";

import { Avatar, Box, Flex, Grid, Icon, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import IconButton from "@/common/components/atoms/IconButton";
import BaseLayout from "@/common/components/layouts/BaseLayout";
import Page from "@/common/components/objects/Page";
import { useSessionPage } from "@/community/context/SessionPageContext";

import AttendeesPreview from "../../objects/AttendeesPreview";

interface IProps {
  url: string;
}

export default function SessionPage({ url }: IProps): JSX.Element {
  const { webinar } = useSessionPage();
  const { space, radii, colors, borders } = useTheme();

  const performCopyClipboard = useCallback(async () => {
    const res = await navigator.clipboard.writeText(url);
    console.log(res);
  }, [url]);

  if (!webinar) return <Box>Loading..</Box>;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { start, host_detail } = webinar;

  const startTime = moment.parseZone(start).local().format("LLL");
  const image = webinar.topic_detail?.image;

  return (
    <Page
      seo={{
        title: webinar.topic_detail?.name,
        description: "Lorem ipsum",
      }}
    >
      <BaseLayout px={space.m} overflowY="auto">
        <Box py={space.s}>
          <Text mb={space.xs} textStyle="headline3">
            {webinar.topic_detail?.name}
          </Text>
          <Flex alignItems="center">
            <Icon size={28} icon="CalendarDays" />
            <Text textStyle="buttonLarge" ml={12}>
              {startTime}
            </Text>
          </Flex>
        </Box>
        <Grid gridTemplateColumns="1.5fr 1fr" gridGap={space.xxl}>
          <Grid gridGap={space.xs} gridAutoFlow="row">
            {image && (
              <Box
                h={320}
                position="relative"
                borderRadius={radii.xs}
                overflow="hidden"
              >
                <Image
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  src={image}
                  alt={webinar.topic_detail?.name}
                />
              </Box>
            )}
            <Text textStyle="title">About Session</Text>
            <Text>{webinar.description}</Text>
          </Grid>
          <Grid
            gridGap={space.xs}
            gridAutoFlow="row"
            gridAutoRows="min-content"
          >
            <Button variant="full-width" text="RSVP for this session" />
            <Text textStyle="title">Spread the word</Text>
            <Flex
              alignItems="center"
              px={space.xs}
              py={space.xxs}
              bg={colors.black[2]}
              borderRadius={radii.xxs}
              border={`2px solid ${borders.main}`}
            >
              <Text flex="1">{url}</Text>
              <IconButton icon="ContentCopy" onClick={performCopyClipboard} />
            </Flex>

            {webinar.speakers_detail_list && (
              <AttendeesPreview attendees={webinar.speakers_detail_list} />
            )}

            <Text textStyle="title">Hosted by</Text>
            <Grid
              gridTemplateColumns="min-content 1fr"
              alignItems="center"
              gridGap={space.xxs}
            >
              <Avatar
                size={56}
                image={host_detail?.photo}
                alt={host_detail?.name ?? "host"}
              />
              <Box>
                <Text textStyle="bodyLarge">{host_detail?.name}</Text>
                <Text
                  color={colors.slate}
                  fontWeight="400"
                  textStyle="captionLarge"
                >
                  Founder at The UX Guys
                </Text>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </BaseLayout>
    </Page>
  );
}
