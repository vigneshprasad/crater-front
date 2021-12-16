import { AnimatePresence, Variants } from "framer-motion";
import { useMemo } from "react";
import { useTheme } from "styled-components";

import { AnimatedBox } from "@/common/components/atoms";
import { Reward } from "@/tokens/types/tokens";

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

  const splitList = useMemo(() => {
    if (loading || !rewards) return undefined;

    return rewards.reduce(
      (acc, curr, index) => {
        if (index < 7) {
          acc[0].push(curr);
        } else {
          acc[1].push(curr);
        }
        return acc;
      },
      [[] as Reward[], [] as Reward[]]
    );
  }, [rewards, loading]);

  return (
    <AnimatePresence>
      {(() => {
        if (!rewards || loading || !splitList) {
          return (
            <Loader
              gridTemplateColumns="repeat(auto-fill, minmax(240px, 1fr))"
              gridGap={space.xxs}
              gridAutoRows="360px"
            />
          );
        }

        if (split) {
          return (
            <>
              <AnimatedBox
                mb={space.xxs}
                initial="hidden"
                animate="enter"
                display="grid"
                exit="exit"
                variants={listVariatns}
                gridGap={space.xxs}
                gridTemplateColumns="repeat(auto-fill, minmax(240px, 1fr))"
                gridAutoRows="240px"
              >
                {splitList[0].map((reward, index) => {
                  if (index === 0) {
                    return (
                      <RewardCard
                        gridColumn="1 / span 2"
                        gridRow="1 / span 2"
                        key={reward.id}
                        reward={reward}
                        type="small"
                      />
                    );
                  }
                  return (
                    <RewardCard key={reward.id} reward={reward} type="small" />
                  );
                })}
              </AnimatedBox>

              <AnimatedBox
                initial="hidden"
                animate="enter"
                display="grid"
                exit="exit"
                variants={listVariatns}
                gridGap={space.xxs}
                gridTemplateColumns="repeat(auto-fill, minmax(240px, 1fr))"
              >
                {splitList[1].map((reward) => (
                  <RewardCard key={reward.id} reward={reward} type="large" />
                ))}
              </AnimatedBox>
            </>
          );
        }

        return (
          <AnimatedBox
            initial="hidden"
            animate="enter"
            display="grid"
            exit="exit"
            variants={listVariatns}
            gridGap={space.xxs}
            gridTemplateColumns="repeat(auto-fill, minmax(240px, 1fr))"
          >
            {rewards.map((reward) => (
              <RewardCard key={reward.id} reward={reward} type="large" />
            ))}
          </AnimatedBox>
        );
      })()}
    </AnimatePresence>
  );
}
