import { useCallback, useEffect, useMemo, useState } from "react";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import { Box, Link, Shimmer } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import {
  BaseTabBar,
  BaseTabItem,
} from "@/common/components/objects/BaseTabBar";
import HorizontalScroll from "@/common/components/objects/HorizontalScroll";
import { PageRoutes } from "@/common/constants/route.constants";
import { Webinar } from "@/community/types/community";
import { StreamCategory } from "@/creators/types/stream";
import { PastStreamProvider } from "@/stream/context/PastStreamContext";
import useStreamCategories from "@/stream/context/StreamCategoryContext";
import { UpcomingStreamsProvider } from "@/stream/context/UpcomingStreamsContext";

import StreamsPanelPastStreamList from "../StreamsPanelPastStreamList";
import StreamsPanelUpcomingStreamList from "../StreamsPanelUpcomingStreamList";

type TabKeys = "pastStreams" | "upcomingStreams";

interface IProps {
  stream: Webinar;
  initial?: TabKeys;
}

export default function StreamsPanel({ stream, initial }: IProps): JSX.Element {
  const { space, colors, fonts } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(initial);
  const { streamCategories: categories } = useStreamCategories();

  const { id } = stream;
  const filteredCategory = router.query.category as string | undefined;

  useEffect(() => {
    if (router) {
      const { query } = router;

      const tab = query.tab;
      if (tab) {
        setActiveTab(tab as TabKeys);
      }
    }
  }, [router, setActiveTab]);

  const TABS = useMemo<Record<TabKeys, JSX.Element>>(() => {
    return {
      pastStreams: (
        <Link href={PageRoutes.streamVideo(id, "pastStreams")} shallow>
          <BaseTabItem
            label="Past Streams"
            justifyItems="center"
            textProps={{
              fontWeight: 500,
              lineHeight: "2.1rem",
              color: activeTab === "pastStreams" ? "#EDEDED" : "#959595",
            }}
          />
        </Link>
      ),
      upcomingStreams: (
        <Link href={PageRoutes.streamVideo(id, "upcomingStreams")} shallow>
          <BaseTabItem
            label="Upcoming Streams"
            justifyItems="center"
            textProps={{
              fontWeight: 500,
              lineHeight: "2.1rem",
              color: activeTab === "upcomingStreams" ? "#EDEDED" : "#959595",
            }}
          />
        </Link>
      ),
    };
  }, [id, activeTab]);

  const categoryClickHandler = useCallback(
    (selectedCategory: StreamCategory) => {
      console.log(router);
      if (
        filteredCategory &&
        selectedCategory.pk === parseInt(filteredCategory)
      ) {
        delete router.query.category;

        router.push(
          {
            pathname: `/video/${id}`,
            query: {
              ...router.query,
            },
          },
          undefined,
          { shallow: true }
        );
        return;
      }

      router.push(
        {
          pathname: `/video/${id}`,
          query: {
            ...router.query,
            category: selectedCategory.pk,
          },
        },
        undefined,
        { shallow: true }
      );
    },
    [id, filteredCategory, router]
  );

  return (
    <Box>
      <BaseTabBar
        px={space.xxxxs}
        py={space.xxxs}
        bg={colors.primaryDark}
        tabs={TABS}
        activeTab={activeTab}
        selectedTabColor={colors.accent}
        gridAutoColumns="max-content"
      />

      <Box pt={space.xxxxs}>
        <HorizontalScroll
          gridAutoFlow="column"
          gridAutoColumns="max-content"
          gridGap={space.xxxxs}
        >
          {(() => {
            if (!categories) {
              return Array(4)
                .fill("")
                .map((_, index) => (
                  <Shimmer w={82} h={32} borderRadius={24} key={index} />
                ));
            }

            return categories.map((category) => {
              return (
                <Button
                  fontFamily={fonts.body}
                  key={category.pk}
                  variant={
                    filteredCategory &&
                    parseInt(filteredCategory) === category.pk
                      ? "filter-selected-small"
                      : "filter-small"
                  }
                  label={category.name}
                  textProps={{
                    color:
                      filteredCategory &&
                      parseInt(filteredCategory) === category.pk
                        ? colors.primaryLight
                        : colors.textPrimary,
                  }}
                  onClick={() =>
                    categoryClickHandler && categoryClickHandler(category)
                  }
                />
              );
            });
          })()}
        </HorizontalScroll>
      </Box>

      <Box py={space.xxxs} maxHeight="100%" overflowY="auto">
        {activeTab === "pastStreams" && (
          <PastStreamProvider
            categoryFilter={
              filteredCategory ? parseInt(filteredCategory) : undefined
            }
          >
            <StreamsPanelPastStreamList />
          </PastStreamProvider>
        )}

        {activeTab === "upcomingStreams" && (
          <UpcomingStreamsProvider
            category={filteredCategory ? parseInt(filteredCategory) : undefined}
          >
            <StreamsPanelUpcomingStreamList />
          </UpcomingStreamsProvider>
        )}
      </Box>
    </Box>
  );
}
