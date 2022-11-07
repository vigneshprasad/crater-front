import { useRef, useState, useEffect, useCallback } from "react";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
import { Box, Grid, Shimmer, Flex } from "@/common/components/atoms";
import LazyLoadButton from "@/common/components/objects/LazyLoadButton";
import { PageRoutes } from "@/common/constants/route.constants";
import WebinarApiClient from "@/community/api";
import {
  ParticpantType,
  PostGroupRequest,
  RequestStatus,
  Webinar,
} from "@/community/types/community";
import StreamCard, {
  CardPosition,
} from "@/stream/components/objects/StreamCard";
import useUpcomingStreams from "@/stream/context/UpcomingStreamsContext";

const ITEM_WIDTH = 280;

export default function UpcomingStreamsList(): JSX.Element {
  const gridRef = useRef<HTMLDivElement>(null);

  const [numColumns, setNumColumn] = useState(0);
  const [initialClick, setInitialClick] = useState(true);
  const { space } = useTheme();
  const {
    upcoming,
    nextPage,
    categorySlug,
    setUpcomingStreamsPage,
    mutateUpcomingStreams,
  } = useUpcomingStreams();
  const { user } = useAuth();
  const router = useRouter();

  const postStreamRsvp = async (stream: Webinar): Promise<void> => {
    if (user) {
      const data: PostGroupRequest = {
        group: stream.id,
        status: RequestStatus.accepted,
        participant_type:
          stream.host === user.pk
            ? ParticpantType.speaker
            : ParticpantType.attendee,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, err] = await WebinarApiClient().postWebinarRequest(data);
      if (err) {
        console.log(err);
      }
      await mutateUpcomingStreams();
    }
  };

  useEffect(() => {
    if (gridRef.current) {
      const { width } = gridRef.current.getBoundingClientRect();
      setNumColumn(Math.floor(width / ITEM_WIDTH));
    }
  }, [gridRef]);

  const cardPosition = useCallback(
    (index: number) => {
      if (numColumns === 0) {
        return CardPosition.center;
      }

      const count = index + 1;

      if (count % numColumns === 1) {
        return CardPosition.left;
      }

      if (count % numColumns === 0) {
        return CardPosition.right;
      }

      return CardPosition.center;
    },
    [numColumns]
  );

  const onClick = useCallback((): void => {
    if (categorySlug) {
      router.push(PageRoutes.category(categorySlug));
    }

    if (initialClick) {
      setUpcomingStreamsPage((page) => page + 1);
      setInitialClick(false);
      return;
    }

    setUpcomingStreamsPage((page) => page + 2);
  }, [categorySlug, initialClick, router, setUpcomingStreamsPage]);

  return (
    <Box pt={space.xxxxs} pb={space.xs}>
      <Grid
        ref={gridRef}
        gridTemplateColumns={`repeat(auto-fill, minmax(${ITEM_WIDTH}px, 1fr))`}
        gridGap={space.xs}
        mb={space.xs}
      >
        {(() => {
          if (!upcoming) {
            return Array(4)
              .fill("")
              .map((_, index) => (
                <Flex key={index} flexDirection="column" gridGap={space.xs}>
                  <Shimmer h={172} />
                  <Shimmer h={18} w="60%" />
                </Flex>
              ));
          }

          return (
            <>
              {upcoming.map((stream, index) => {
                return (
                  <StreamCard
                    key={stream.id}
                    stream={stream}
                    onClickRsvp={postStreamRsvp}
                    cardPosition={cardPosition(index)}
                  />
                );
              })}
            </>
          );
        })()}
      </Grid>
      {nextPage && (
        <Flex py={space.xs} gridGap={space.xxxs} alignItems="center">
          <Flex
            flex="1"
            h={1}
            background="linear-gradient(-90deg, rgba(255, 255, 255, 0.24) 6.23%, rgba(255, 255, 255, 0) 74.19%)"
          />
          <LazyLoadButton
            label={categorySlug ? "View All" : "Show More"}
            iconTransform={categorySlug ? "rotate(-90deg)" : undefined}
            onClick={onClick}
          />
          <Flex
            flex="1"
            h={1}
            background="linear-gradient(90deg, rgba(255, 255, 255, 0.24) 6.23%, rgba(255, 255, 255, 0) 74.19%)"
          />
        </Flex>
      )}
    </Box>
  );
}
