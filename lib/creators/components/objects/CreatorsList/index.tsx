import { AnimatePresence } from "framer-motion";
import { useCallback, useRef } from "react";
import { useTheme } from "styled-components";

import { Grid, Shimmer } from "@/common/components/atoms";
import { Creator } from "@/creators/types/creator";

import CreatorCard from "../CreatorCard";

interface IProps {
  creators?: Creator[];
  loading: boolean;
  onScrollEnd?: () => void;
}

export default function CreatorsList({
  creators,
  loading,
  onScrollEnd,
}: IProps): JSX.Element {
  const { space } = useTheme();
  const _observer = useRef<IntersectionObserver>();

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (_observer.current) _observer.current.disconnect();
      _observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (onScrollEnd) onScrollEnd();
        }
      });

      if (node != null) _observer.current.observe(node);
    },
    [_observer, loading, onScrollEnd]
  );

  return (
    <Grid
      px={[space.xxs, space.s]}
      py={[space.xxs]}
      gridGap={[space.xxs]}
      gridTemplateColumns={[
        "repeat(auto-fill, minmax(106px, 1fr))",
        "repeat(auto-fill, minmax(160px, 1fr))",
      ]}
    >
      <AnimatePresence>
        {(() => {
          if (loading) {
            return Array(4)
              .fill("")
              .map((_, index) => <Shimmer h={[200, 220]} key={index} />);
          }

          return creators?.map((creator, index) => (
            <CreatorCard
              ref={index + 1 === creators.length ? ref : undefined}
              slug={creator.slug}
              name={creator.profile_detail?.name}
              key={creator.user}
              image={creator.profile_detail?.photo}
              followers={creator.number_of_subscribers}
            />
          ));
        })()}
      </AnimatePresence>
    </Grid>
  );
}
