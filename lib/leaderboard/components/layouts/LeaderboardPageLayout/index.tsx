import { Variants } from "framer-motion";
import { NextSeoProps } from "next-seo";
import { PropsWithChildren } from "react";
import { useTheme } from "styled-components";

import { INavKeys } from "@/common/constants/ui.constants";

import { AnimatedBox, Box } from "../../../../common/components/atoms";
import BaseLayout from "../../../../common/components/layouts/BaseLayout";
import AsideNav from "../../../../common/components/objects/AsideNav";
import Page from "../../../../common/components/objects/Page";
import TabHeading from "../../../../common/components/objects/TabHeading";

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
      <BaseLayout aside={<AsideNav />} overflowY="auto">
        <Box p={[space.xs, space.s]}>
          <TabHeading>Stream to win</TabHeading>
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
