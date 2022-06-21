import { Variants } from "framer-motion";
import { NextSeoProps } from "next-seo";
import { PropsWithChildren } from "react";
import { useTheme } from "styled-components";

import { AnimatedBox, Box, Text } from "../../../../common/components/atoms";
import BaseLayout from "../../../../common/components/layouts/BaseLayout/v2";
import {
  AsideNav,
  INavKeys,
} from "../../../../common/components/objects/AsideNav/v2";
import Page from "../../../../common/components/objects/Page";

type IProps = PropsWithChildren<{
  seo: NextSeoProps;
  activeTab?: INavKeys;
}>;

const variants: Variants = {
  hidden: { opacity: 0, x: 0, y: 10 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 10 },
};

export default function LeaderboardPageLayout({
  seo,
  children,
}: IProps): JSX.Element {
  const { space } = useTheme();
  return (
    <Page seo={seo}>
      <BaseLayout aside={<AsideNav activeTab="leaderboard" />} overflowY="auto">
        <Box p={[space.xs, space.s]}>
          <Text textStyle="mainHeading" maxLines={2} textAlign="center">
            Stream to win
          </Text>
        </Box>
        <AnimatedBox
          initial="hidden"
          variants={variants}
          animate="enter"
          exit="exit"
          transition={{ type: "linear" }}
        >
          {children}
        </AnimatedBox>
      </BaseLayout>
    </Page>
  );
}
