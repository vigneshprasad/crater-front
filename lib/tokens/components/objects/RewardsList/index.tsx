import { Variants } from "framer-motion";
import { useMemo, useRef, useEffect, useState } from "react";
import { useTheme } from "styled-components";

import { AnimatedBox, Box } from "@/common/components/atoms";
import { useMeasure } from "@/common/hooks/ui/useMeasure";
import { Reward } from "@/tokens/types/token";

import { RewardCard } from "../RewardCard";
import Loader from "./Loader";

interface IProps {
  rewards?: Reward[];
  loading: boolean;
  split?: boolean;
}

const listVariatns: Variants = {
  hidden: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 1.2,
    },
  },
};

export default function RewardsList({
  rewards,
  loading,
  split = true,
}: IProps): JSX.Element {
  const { space } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { bounds, ref } = useMeasure();
  const [splitIndex, setSplitIndex] = useState(0);

  const splitList = useMemo(() => {
    if (loading || !rewards || !splitIndex) return undefined;

    return rewards.reduce(
      (acc, curr, index) => {
        if (index < splitIndex) {
          acc[0].push(curr);
        } else {
          acc[1].push(curr);
        }
        return acc;
      },
      [[] as Reward[], [] as Reward[]]
    );
  }, [rewards, loading, splitIndex]);

  useEffect(() => {
    if (containerRef.current) {
      const containerBox = containerRef.current.getBoundingClientRect();
      const { width } = containerBox;
      const columns = Math.floor(width / 236);
      const index = (columns - 2) * 2 + 1;
      setSplitIndex(index);
    }
  }, [containerRef, bounds]);

  return (
    <>
      <Box ref={ref}>
        <Box ref={containerRef} />
      </Box>
      {(() => {
        if (!split) {
          if (!rewards || loading) {
            return (
              <Loader
                gridTemplateColumns="repeat(auto-fill, minmax(220px, 1fr))"
                gridGap={space.xxs}
                gridAutoRows="360px"
              />
            );
          }

          return (
            <Box ref={ref}>
              <AnimatedBox
                ref={containerRef}
                initial="hidden"
                animate="enter"
                display="grid"
                exit="exit"
                variants={listVariatns}
                gridGap={space.xxs}
                gridTemplateColumns="repeat(auto-fill, minmax(220px, 1fr))"
              >
                {rewards.map((reward) => (
                  <RewardCard key={reward.id} reward={reward} type="large" />
                ))}
              </AnimatedBox>
            </Box>
          );
        }

        if (!rewards || loading || !splitList) {
          return (
            <Loader
              gridTemplateColumns="repeat(auto-fill, minmax(220px, 1fr))"
              gridGap={space.xxs}
              gridAutoRows="360px"
            />
          );
        }

        return (
          <AnimatedBox
            ref={containerRef}
            initial="hidden"
            animate="enter"
            display="grid"
            exit="exit"
            variants={listVariatns}
            gridGap={space.xxs}
            gridTemplateColumns={[
              "1fr",
              "repeat(auto-fill, minmax(220px, 1fr))",
            ]}
            gridAutoRows="minmax(240px, auto)"
          >
            {rewards.map((reward, index) => {
              if (index === 0) {
                return (
                  <RewardCard
                    gridColumn={["auto", "1 / span 2"]}
                    gridRow={["auto", "1 / span 2"]}
                    key={reward.id}
                    reward={reward}
                    type="small"
                  />
                );
              }

              if (index < splitIndex) {
                return (
                  <RewardCard key={reward.id} reward={reward} type="small" />
                );
              }

              return (
                <RewardCard key={reward.id} reward={reward} type="large" />
              );
            })}
          </AnimatedBox>
        );
      })()}
    </>
  );
}
