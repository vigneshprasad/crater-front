import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import {
  Box,
  Flex,
  Grid,
  Icon,
  Image,
  Link,
  Shimmer,
  Text,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { PageRoutes } from "@/common/constants/route.constants";
import DateTime from "@/common/utils/datetime/DateTime";
import { TopStreams } from "@/creators/types/stream";

type IProps = {
  topStreams?: TopStreams[];
};

export default function TopPerformingStreamsBox({
  topStreams,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();
  const router = useRouter();

  return (
    <Box bg={colors.primaryDark} borderRadius={radii.xxxxs}>
      <Text
        p={`${space.xs}px 24px ${space.xs}px ${space.xxs}px`}
        textStyle="label"
        color={colors.accentLight}
        bg={colors.primaryLight}
        textTransform="uppercase"
        borderRadius={`${radii.xxxxs}px ${radii.xxxxs}px 0px 0px`}
      >
        Top Performing Streams
      </Text>

      {(() => {
        if (!topStreams) {
          return <Shimmer w="100%" h={300} />;
        }

        if (topStreams.length === 0) {
          return (
            <Grid
              pt={space.xs}
              pb={space.m}
              flexDirection="row"
              gridGap={space.xxxs}
              justifyItems="center"
            >
              <Box position="relative" w={136} h={136}>
                <Image
                  src="/images/img_referral_alt.png"
                  alt="share stream"
                  layout="fill"
                />
              </Box>
              <Text textStyle="body" fontWeight={500}>
                You have no streams yet.
              </Text>
              <Button
                variant="text"
                label="Go to upcoming streams page"
                display="flex"
                suffixElement={
                  <Icon
                    icon="ChevronRight"
                    color={colors.accentLight}
                    size={18}
                  />
                }
                textProps={{
                  fontSize: "1.4rem",
                  fontWeight: 500,
                }}
                onClick={() =>
                  router.push(PageRoutes.hub("streams", "upcoming"))
                }
              />
            </Grid>
          );
        }

        return topStreams.map((stream, index) => {
          const startTime = DateTime.parse(stream.start).toFormat(
            DateTime.DEFAULT_FORMAT
          );

          return (
            <Box p={`24px 24px 0px ${space.xxs}px`} key={stream.id}>
              <Grid
                pb={24}
                gridAutoFlow="column"
                gridTemplateColumns="max-content 88px 1fr"
                gridGap={space.xxxs}
                alignItems="center"
                bg={colors.primaryDark}
                borderBottom={
                  index === topStreams.length - 1
                    ? undefined
                    : `1px solid ${colors.secondaryLight}`
                }
              >
                <Text textStyle="label">{index + 1}</Text>
                <Link
                  href={PageRoutes.streamVideo(stream.id)}
                  boxProps={{ target: "_blank" }}
                >
                  <Box>
                    {stream.topic_image && (
                      <Image
                        objectFit="cover"
                        layout="fill"
                        src={stream.topic_image}
                        alt={stream.topic_title}
                      />
                    )}
                  </Box>
                </Link>
                <Box>
                  <Text>{stream.topic_title}</Text>
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
                      Streamed:
                    </Text>
                    <Icon size={16} color="inherit" icon="Calendar" />
                    <Text textStyle="small" fontWeight={500} color="inherit">
                      {startTime}
                    </Text>
                  </Flex>
                </Box>
              </Grid>
            </Box>
          );
        });
      })()}
    </Box>
  );
}
