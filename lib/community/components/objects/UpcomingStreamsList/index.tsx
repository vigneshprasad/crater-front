import { useTheme } from "styled-components";

import Image from "next/image";

import { Box, Grid, Text, Link, Spinner } from "@/common/components/atoms";
import DateTime from "@/common/utils/datetime/DateTime";
import { Webinar } from "@/community/types/community";

export interface IProps {
  upcoming?: Webinar[];
  loading: boolean;
}

export default function UpcomingStreamsList({
  upcoming,
  loading,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();
  return (
    <>
      <Text mb={space.xxs} px={[0, space.xxs]} textStyle="headlineBold">
        Similar Streams
      </Text>

      <Grid
        borderRadius={radii.xxs}
        p={space.xs}
        mb={space.xxs}
        bg={colors.black[2]}
        maxHeight="40vh"
        h="100%"
        gridAutoFlow="row"
        gridAutoRows="min-content"
        overflowY="auto"
      >
        {((): JSX.Element[] | JSX.Element => {
          if (loading || !upcoming)
            return (
              <Box m="auto auto">
                <Spinner />
              </Box>
            );

          return upcoming.map((stream) => {
            const timeDisplay = DateTime.parse(stream.start).toLocaleString(
              DateTime.DATE_FULL
            );
            return (
              <Link
                key={stream.id}
                href={`/session/${stream.id}`}
                boxProps={{ target: "_blank" }}
              >
                <Grid
                  pb={space.xxs}
                  alignItems="start"
                  gridGap={space.xs}
                  gridTemplateColumns="min-content 1fr"
                >
                  <Box
                    position="relative"
                    h={72}
                    w={96}
                    borderRadius={radii.xxs}
                    overflow="hidden"
                  >
                    {stream.topic_detail?.image && (
                      <Image
                        objectFit="cover"
                        src={stream.topic_detail?.image}
                        alt={stream.topic_detail?.name}
                        layout="fill"
                      />
                    )}
                  </Box>
                  <Box py={space.xxxs}>
                    <Text textStyle="title" py={4}>
                      {stream.topic_detail?.name}
                    </Text>
                    <Text textStyle="caption" color={colors.slate}>
                      {timeDisplay}
                    </Text>
                  </Box>
                </Grid>
              </Link>
            );
          });
        })()}
      </Grid>
    </>
  );
}
