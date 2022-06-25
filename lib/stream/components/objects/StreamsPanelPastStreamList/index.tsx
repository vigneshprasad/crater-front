import { forwardRef } from "react";
import { useTheme } from "styled-components";

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
import usePastStreams from "@/stream/context/PastStreamContext";

const StreamsPanelPastStreamList = forwardRef<HTMLDivElement>((_, ref) => {
  const { space, colors, radii } = useTheme();
  const { streams, loading, nextPage, setPastStreamsPage } = usePastStreams();

  return (
    <Box ref={ref}>
      {loading ? (
        Array(5)
          .fill("")
          .map((_, index) => (
            <Flex
              pb={space.xxxs}
              flexDirection="row"
              gridTemplateColumns="1fr 1fr"
              gridGap={space.xxxs}
              key={index}
            >
              <Shimmer w="100%" h={100} />

              <Box w="100%">
                <Shimmer h={36} />
                <Shimmer mt={space.xs} w={50} h={15} />
                <Shimmer mt={space.xxxxs} w="85%" h={18} />
              </Box>
            </Flex>
          ))
      ) : (
        <>
          {streams?.map((stream) => {
            const startTime = DateTime.parse_with_milliseconds(
              stream.start
            ).toFormat(DateTime.DEFAULT_FORMAT);

            return (
              <Grid
                pb={space.xs}
                gridTemplateColumns="max-content 1fr"
                gridGap={space.xxxs}
                key={stream.id}
              >
                <Link href={PageRoutes.streamVideo(stream.id)}>
                  <Box
                    h={100}
                    w={185}
                    position="relative"
                    overflow="hidden"
                    borderRadius={radii.xxxxs}
                  >
                    {stream.topic_detail?.image && (
                      <Image
                        layout="fill"
                        src={stream.topic_detail?.image}
                        alt={stream.topic_detail?.name}
                      />
                    )}
                  </Box>
                </Link>
                <Flex flexDirection="column" justifyContent="space-between">
                  <Text textStyle="label" color="#FCFCFC">
                    {stream.topic_detail.name}
                  </Text>

                  <Box>
                    <Text
                      pb={space.xxxxs}
                      textStyle="caption"
                      lineHeight="1.4rem"
                      color={colors.textTertiary}
                    >
                      {stream.host_detail.name}
                    </Text>
                    <Flex gridGap={4} alignItems="center">
                      <Icon
                        color={colors.textSecondary}
                        icon="Calendar"
                        size={14}
                      />
                      <Text
                        color={colors.textSecondary}
                        textStyle="caption"
                        lineHeight="1.8rem"
                      >
                        {startTime}
                      </Text>
                    </Flex>
                  </Box>
                </Flex>
              </Grid>
            );
          })}

          {nextPage && (
            <Button
              variant="dark-flat"
              h={40}
              w="100%"
              label="Load More"
              textProps={{ textStyle: "body", fontWeight: 500 }}
              display={["none", "flex"]}
              justifyContent="center"
              alignItems="center"
              gridGap={space.xxxs}
              suffixElement={<Icon icon="ChevronDown" size={20} />}
              onClick={() => setPastStreamsPage((page) => page + 1)}
            />
          )}
        </>
      )}
    </Box>
  );
});

StreamsPanelPastStreamList.displayName = "StreamsPanelPastStreamList";

export default StreamsPanelPastStreamList;
