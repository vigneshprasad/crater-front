import { AnimatePresence, Variants } from "framer-motion";
import { useTheme } from "styled-components";

import { AnimatedBox } from "@/common/components/atoms";
import { Reward } from "@/tokens/types/tokens";

import Loader from "./Loader";

interface IProps {
  rewards?: Reward[];
  loading: boolean;
  renderChild: (reward: Reward) => JSX.Element;
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
  renderChild,
}: IProps): JSX.Element {
  const { space } = useTheme();
  return (
    <AnimatePresence>
      {!rewards || loading ? (
        <Loader
          gridTemplateColumns="repeat(auto-fill, minmax(240px, 1fr))"
          gridGap={space.xxs}
          gridAutoRows="360px"
        />
      ) : (
        <AnimatedBox
          initial="hidden"
          animate="enter"
          display="grid"
          exit="exit"
          variants={listVariatns}
          gridGap={space.xxs}
          gridTemplateColumns="repeat(auto-fill, minmax(240px, 1fr))"
        >
          {rewards.map((reward) => renderChild(reward))}
        </AnimatedBox>
      )}
    </AnimatePresence>
  );
}
