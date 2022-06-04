import { useTheme } from "styled-components";

import { Flex, Grid, Icon, Shimmer } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import StreamCard from "@/community/components/objects/StreamCard";
import {
  UpcomingStreamsContext,
  UpcomingStreamsProvider,
} from "@/stream/context/UpcomingStreamsContext";

interface IProps {
  category?: number;
}

export default function HomePageUpcomingStreams({
  category,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();

  return (
    <UpcomingStreamsProvider category={category}>
      <UpcomingStreamsContext.Consumer>
        {({ upcoming, loading, nextPage, setUpcomingStreamsPage }) => {
          return (
            <>
              <Grid
                mx={space.xxs}
                gridTemplateColumns={[
                  "1fr",
                  "repeat(auto-fill, minmax(280px, 1fr))",
                ]}
                gridGap={space.s}
              >
                {!upcoming || loading
                  ? Array(4)
                      .fill("")
                      .map((_, index) => (
                        <Flex
                          key={index}
                          flexDirection="column"
                          gridGap={space.xs}
                        >
                          <Shimmer
                            w="100%"
                            h={172}
                            borderRadius={radii.xxs}
                            key={index}
                          />
                          <Shimmer h={18} w="60%" />
                        </Flex>
                      ))
                  : upcoming.map((stream) => (
                      <StreamCard
                        stream={stream}
                        hostSlug={stream.host_detail?.slug}
                        key={stream.id}
                      />
                    ))}
              </Grid>

              {nextPage && (
                <Flex
                  pt={space.s}
                  mx={space.xxs}
                  gridGap={space.xxs}
                  alignItems="center"
                >
                  <Flex flex="1" h={2} bg={colors.primaryLight} />
                  <Button
                    mx={space.xxxxxs}
                    flexGrow={0}
                    variant="pagination"
                    label="Show more"
                    onClick={() => setUpcomingStreamsPage((page) => page + 1)}
                    display="flex"
                    alignItems="center"
                    gridGap={space.xxxxxs}
                  >
                    <Icon
                      color={colors.accentLight}
                      icon="ChevronDown"
                      pt={2}
                    />
                  </Button>
                  <Flex flex="1" h={2} bg={colors.primaryLight} />
                </Flex>
              )}
            </>
          );
        }}
      </UpcomingStreamsContext.Consumer>
    </UpcomingStreamsProvider>
  );
}
