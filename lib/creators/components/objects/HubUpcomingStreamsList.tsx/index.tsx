import { useState } from "react";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import {
  Box,
  Flex,
  Grid,
  Icon,
  Image,
  Shimmer,
  Text,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { PageRoutes } from "@/common/constants/route.constants";
import DateTime from "@/common/utils/datetime/DateTime";
import useUpcomingStreams from "@/stream/context/UpcomingStreamsContext";

export default function HubUpcomingStreamsList(): JSX.Element {
  const { space, colors, radii } = useTheme();
  const router = useRouter();
  const [initialClick, setInitialClick] = useState(true);
  const { upcoming, loading, nextPage, setUpcomingStreamsPage } =
    useUpcomingStreams();

  return (
    <>
      {(() => {
        if (!upcoming || loading) {
          return Array(4)
            .fill("")
            .map((_, index) => (
              <Shimmer
                w="100%"
                h={120}
                mb={space.xs}
                pb={space.xs}
                key={index}
              />
            ));
        }

        if (upcoming?.length === 0) {
          return (
            <Grid
              flexDirection="row"
              gridTemplateColumns="max-content 1fr"
              gridGap={space.s}
            >
              <Box position="relative" w={190} h={190}>
                <Image
                  src="/images/img_referral_alt.png"
                  alt="share stream"
                  layout="fill"
                />
              </Box>
              <Flex
                flexDirection="column"
                gridGap={space.xxxs}
                justifyContent="center"
              >
                <Box>
                  <Text textStyle="formLabel" fontWeight={500}>
                    You have no upcoming streams yet.
                  </Text>
                  <Text
                    pt={space.xxxs}
                    pb={space.xs}
                    textStyle="body"
                    color={colors.textTertiary}
                  >
                    Setting up a stream takes less than 2 minutes. We recommend
                    setting up a stream 24 hours before you plan to go live.
                  </Text>
                </Box>
                <Button
                  label="Create New Stream"
                  w={200}
                  minHeight={40}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  prefixElement={<Icon icon="CameraLive" size={18} />}
                  onClick={() =>
                    router.push(PageRoutes.hub("streams", "create"))
                  }
                />
              </Flex>
            </Grid>
          );
        }

        return upcoming.map((stream) => {
          const startTime = DateTime.parse(stream.start).toFormat(
            DateTime.DEFAULT_FORMAT
          );

          return (
            <Grid
              pb={space.xs}
              mb={space.xs}
              gridAutoFlow="column"
              gridTemplateColumns="max-content 1fr max-content"
              alignItems="center"
              gridGap={space.xxs}
              borderBottom={`1px solid ${colors.secondaryLight}`}
              key={stream.id}
            >
              <Box w={226} h={120} borderRadius={radii.xxxxs} overflow="hidden">
                {stream.topic_detail?.image && (
                  <Image
                    objectFit="cover"
                    layout="fill"
                    src={stream.topic_detail?.image}
                    alt={stream.topic_detail.name}
                  />
                )}
              </Box>
              <Box>
                <Text>{stream.topic_detail.name}</Text>
                <Flex
                  pt={space.xxxxs}
                  color={colors.textSecondary}
                  alignItems="center"
                  gridGap={space.xxxxs}
                >
                  <Text
                    textStyle="small"
                    fontWeight={600}
                    color={colors.textTertiary}
                  >
                    Scheduled for:
                  </Text>
                  <Icon size={16} color="inherit" icon="Calendar" />
                  <Text textStyle="small" fontWeight={500} color="inherit">
                    {startTime}
                  </Text>
                </Flex>
              </Box>
              <Button
                variant="text"
                label="GO LIVE"
                onClick={() => router.push(PageRoutes.stream(stream.id))}
              />
            </Grid>
          );
        });
      })()}

      {nextPage && (
        <Flex gridGap={space.xxs} alignItems="center">
          <Flex flex="1" h={1} bg={colors.secondaryLight} />
          <Button
            suffixElement={<Icon icon="ChevronDown" size={20} />}
            variant="condensed-dark"
            label="Show More"
            onClick={() => {
              if (initialClick) {
                setUpcomingStreamsPage((page) => page + 1);
                setInitialClick(false);
                return;
              }

              setUpcomingStreamsPage((page) => page + 2);
            }}
          />
          <Flex flex="1" h={1} bg={colors.secondaryLight} />
        </Flex>
      )}
    </>
  );
}
