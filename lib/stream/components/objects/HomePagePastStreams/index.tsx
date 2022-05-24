import { useTheme } from "styled-components";

import { Box, Flex, Icon } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2/Button";
import {
  PastStreamContext,
  PastStreamProvider,
} from "@/stream/context/PastStreamContext";

import PastStreamListHome from "../PastStreamListHome";

interface IProps {
  category?: number;
}

export default function HomePagePastStreams({ category }: IProps): JSX.Element {
  const { space, colors } = useTheme();

  return (
    <PastStreamProvider categoryFilter={category}>
      <PastStreamContext.Consumer>
        {({ streams, loading, nextPage, setPastStreamsPage }) => {
          return (
            <>
              <PastStreamListHome streams={streams} loading={loading} />

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
                    onClick={() => setPastStreamsPage((page) => page + 1)}
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
      </PastStreamContext.Consumer>
    </PastStreamProvider>
  );
}
